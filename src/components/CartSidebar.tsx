import { useState, useRef } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Send, Mail, File as FileIcon } from "lucide-react";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { WHATSAPP_NUMBER } from "@/data/categories";

const orderSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  phone: z.string().trim().min(8, "Informe um telefone válido").max(20),
  notes: z.string().trim().max(1000).optional(),
});

const CartSidebar = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<"retirar" | "entrega">("retirar");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasImpressao = cart.some((item) => item.categorySlug === "impressao");
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const parsed = orderSchema.safeParse({ name, phone, notes });
    if (!parsed.success) {
      toast({ title: "Verifique os campos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }

    if (deliveryOption === "entrega" && address.trim().length < 5) {
      toast({ title: "Endereço inválido", description: "Por favor, informe seu endereço completo para entrega.", variant: "destructive" });
      return;
    }

    const d = parsed.data;
    setIsSubmitting(true);

    try {
      let orderItemsText = "";
      cart.forEach((item) => {
        orderItemsText += `• ${item.quantity}x ${item.productName} (${item.categoryTitle})\n`;
      });

      const formData = new FormData();
      formData.append("Nome", d.name);
      formData.append("Telefone", d.phone);
      formData.append("Entrega", deliveryOption === "retirar" ? "Retirar na loja" : `Entrega no endereço: ${address}`);
      formData.append("Pedido", orderItemsText);
      if (d.notes) {
        formData.append("Observações", d.notes);
      }
      if (hasImpressao && file) {
        formData.append("Anexo", file);
      }

      formData.append("_subject", `Novo Pedido de ${d.name}`);
      formData.append("_captcha", "false");
      formData.append("_template", "table");
      
      await fetch("https://formsubmit.co/ajax/megaprintitauna@gmail.com", {
        method: "POST",
        body: formData,
      });

      toast({ title: "Pedido Enviado!", description: "Recebemos seu pedido e anexos por email. Entraremos em contato em breve!" });
      
      clearCart();
      setNotes("");
      setFile(null);
      setIsCartOpen(false);
    } catch (err) {
      toast({ title: "Erro ao enviar", description: "Houve um problema ao enviar o anexo. Tente novamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-card overflow-hidden p-0 sm:p-0">
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" /> Seu Carrinho
          </SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? "item" : "itens"} no pedido.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Seu carrinho está vazio.</p>
              <p className="text-xs mt-1">Adicione produtos para continuar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-start border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">{item.categoryTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-1 shrink-0">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-background rounded-md transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-background rounded-md transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="(37) 9 9999-9999" />
              </div>

              <div className="space-y-3 pt-2">
                <Label>Opção de Recebimento</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="retirar" 
                      checked={deliveryOption === "retirar"} 
                      onChange={() => setDeliveryOption("retirar")}
                      className="accent-primary"
                    />
                    Retirar na loja
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="entrega" 
                      checked={deliveryOption === "entrega"} 
                      onChange={() => setDeliveryOption("entrega")}
                      className="accent-primary"
                    />
                    Receber em casa
                  </label>
                </div>
              </div>

              {deliveryOption === "entrega" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="address">Endereço de Entrega *</Label>
                  <Input 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                    placeholder="Rua, Número, Bairro, Referência..." 
                  />
                </div>
              )}
              
              {hasImpressao && (
                <div className="space-y-2 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <Label className="flex items-center gap-2 text-primary">
                    <FileIcon className="w-4 h-4" /> Anexar arquivo
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">Envie a imagem ou documento.</p>
                  <Input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="text-xs file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Detalhes adicionais..." rows={2} />
              </div>
            </form>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-card shrink-0">
            <Button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full gap-2 py-6 rounded-xl gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/25"
            >
              {isSubmitting ? "Enviando..." : <><Mail className="w-4 h-4" /> Enviar Pedido por E-mail</>}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
