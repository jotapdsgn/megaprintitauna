import { useState, useRef } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Send, File as FileIcon } from "lucide-react";
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

    const d = parsed.data;
    setIsSubmitting(true);

    try {
      if (hasImpressao && file) {
        const formData = new FormData();
        formData.append("nome", d.name);
        formData.append("telefone", d.phone);
        formData.append("anexo", file);
        formData.append("_subject", `Novo arquivo de impressão de ${d.name}`);
        formData.append("_captcha", "false");
        
        await fetch("https://formsubmit.co/ajax/megaprintitauna@gmail.com", {
          method: "POST",
          body: formData,
        });
        toast({ title: "Arquivo enviado", description: "Sua imagem foi enviada com sucesso para o nosso email." });
      }

      let orderItemsText = "";
      cart.forEach((item) => {
        orderItemsText += `• ${item.quantity}x ${item.productName} (${item.categoryTitle})%0A`;
      });

      const message =
        `*Novo Pedido - Megaprint*%0A%0A` +
        `*Nome:* ${encodeURIComponent(d.name)}%0A` +
        `*Telefone:* ${encodeURIComponent(d.phone)}%0A%0A` +
        `*Itens do Pedido:*%0A${orderItemsText}%0A` +
        (d.notes ? `*Observações:* ${encodeURIComponent(d.notes)}%0A` : "") +
        (hasImpressao && file ? `%0A_(A imagem foi enviada para o email da loja)_` : "");

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      
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
              {isSubmitting ? "Enviando..." : <><Send className="w-4 h-4" /> Finalizar no WhatsApp</>}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
