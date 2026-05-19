import React, { useMemo, useState } from "react";
import {
  ShoppingCart, Trash2, Plus, Minus, X,
  MessageSquare, Info, Printer, Package
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "@/data/categories";

const CartSidebar = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const hasImpressaoItems = useMemo(
    () => cart.some((item) => item.categorySlug === "impressao"),
    [cart]
  );

  const hasProductItems = useMemo(
    () => cart.some((item) => item.categorySlug !== "impressao"),
    [cart]
  );

  const getFormattedCartText = () => {
    return cart
      .map(item => `• ${item.quantity}x ${item.productName} (${item.categoryTitle})`)
      .join("\n");
  };

  const buildWhatsAppMessage = () => {
    const itemsText = getFormattedCartText();
    const observations = notes.trim() || "Nenhuma";

    return [
      "🛒 *NOVO PEDIDO - MEGAPRINT ITAÚNA*",
      "",
      "👤 *Cliente:*",
      name.trim(),
      "",
      "📱 *WhatsApp:*",
      phone.trim(),
      "",
      "📦 *Itens do pedido:*",
      itemsText,
      "",
      "📝 *Observações:*",
      observations,
    ].join("\n");
  };

  const resetFormAndCart = () => {
    setName("");
    setPhone("");
    setNotes("");
    clearCart();
    setIsCartOpen(false);
  };

  const handleSubmitWhatsApp = () => {
    if (!name.trim() || !phone.trim()) {
      toast.error("Por favor, preencha os campos obrigatórios (Nome e WhatsApp).");
      return;
    }

    if (cart.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

    window.open(whatsappUrl, "_blank");

    const toastDescription = hasImpressaoItems && hasProductItems
      ? "Envie a mensagem e, se for impressão/xerox, anexe os arquivos no chat."
      : hasImpressaoItems
        ? "Envie a mensagem e anexe os arquivos da impressão ou xerox no chat."
        : "Confira a mensagem e envie para finalizar seu pedido.";

    toast.success("Abrindo o WhatsApp...", {
      description: toastDescription,
      duration: 6000,
      icon: <MessageSquare className="w-5 h-5 text-green-500" />,
    });

    resetFormAndCart();
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col h-full bg-background border-l border-border shadow-card">

        <SheetHeader className="p-6 pb-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
                Seu Carrinho
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground mt-0.5">
                {totalItems === 0
                  ? "Seu carrinho está vazio no momento."
                  : `${totalItems} ${totalItems === 1 ? "item selecionado" : "itens selecionados"} no total.`
                }
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-muted-foreground/60" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Seu carrinho está vazio</h3>
              <p className="text-muted-foreground text-sm max-w-xs mb-8">
                Navegue pelas nossas categorias e adicione produtos para fazer o seu pedido.
              </p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="gradient-primary text-primary-foreground font-semibold px-6 py-5 rounded-full hover:opacity-95 transition-all"
              >
                Voltar a navegar
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-8 flex-1">

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Itens do Pedido</h3>
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-destructive hover:underline flex items-center gap-1 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Limpar Carrinho
                  </button>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 border border-border/60 bg-muted/20 p-3 rounded-2xl">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card border border-border/80 hover:border-border p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm hover:shadow-card transition-all animate-fade-in"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-foreground truncate">{item.productName}</h4>
                        <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                          {item.categoryTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 bg-muted rounded-full p-1 border border-border/50 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-card hover:bg-muted text-foreground flex items-center justify-center transition-all active:scale-95 shadow-sm"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-card hover:bg-muted text-foreground flex items-center justify-center transition-all active:scale-95 shadow-sm"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all shrink-0"
                        aria-label="Remover item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5 border-t border-border pt-6">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Dados para Finalizar</h3>
                  <p className="text-[11px] text-muted-foreground">
                    Preencha seus dados e envie o pedido pelo WhatsApp.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="client-name" className="text-xs font-bold text-foreground flex gap-0.5">
                      Nome Completo <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="client-name"
                      placeholder="Ex: João da Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl border-border focus-visible:ring-primary shadow-sm h-11"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="client-phone" className="text-xs font-bold text-foreground flex gap-0.5">
                      WhatsApp / Telefone <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="client-phone"
                      type="tel"
                      placeholder="Ex: (37) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl border-border focus-visible:ring-primary shadow-sm h-11"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="client-notes" className="text-xs font-bold text-foreground">
                      Observações / Detalhes de Impressão <span className="text-muted-foreground font-normal">(Opcional)</span>
                    </Label>
                    <Textarea
                      id="client-notes"
                      placeholder="Ex: frente e verso, colorido, tipo de papel, encadernação..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="rounded-xl border-border focus-visible:ring-primary shadow-sm min-h-[90px] resize-y"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {hasImpressaoItems && (
                      <div className="border border-blue-200 bg-blue-50/80 p-3.5 rounded-2xl flex items-start gap-2.5 text-left text-[11px] text-blue-900 shadow-sm leading-relaxed">
                        <Printer className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold block mb-0.5">Impressão e xerox</strong>
                          Após enviar o pedido pelo WhatsApp, envie os arquivos (PDF, Word, imagem etc.)
                          na mesma conversa para darmos continuidade ao serviço.
                        </div>
                      </div>
                    )}

                    {hasProductItems && (
                      <div className="border border-primary/25 bg-primary/5 p-3.5 rounded-2xl flex items-start gap-2.5 text-left text-[11px] text-foreground shadow-sm leading-relaxed">
                        <Package className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold block mb-0.5">Produtos do pedido</strong>
                          O valor e as opções dos produtos serão enviados por WhatsApp após você
                          confirmar o envio deste pedido.
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={handleSubmitWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Enviar pedido pelo WhatsApp
                  </Button>
                </div>
              </div>

            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-border bg-card/95 backdrop-blur-sm text-center flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <p className="text-[10px] text-muted-foreground font-medium">
              Megaprint Itaúna · Pedidos efetuados via site são orçados sem compromisso.
            </p>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
