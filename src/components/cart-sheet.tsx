import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { whatsappLink } from "@/lib/site-config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, Plus, Minus, CreditCard, Smartphone } from "lucide-react";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PayMethod = "web" | "ecocash" | "onemoney";

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<PayMethod>("web");
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);

  const handlePaynow = async () => {
    if (items.length === 0 || paying) return;
    setPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
          email,
          method,
          phone: method === "web" ? undefined : phone,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        redirectUrl?: string;
        pollUrl?: string;
        reference?: string;
        instructions?: string;
      };
      if (!res.ok || !data.pollUrl) {
        toast.error(data.error || "Payment could not be started — please try again.");
        return;
      }
      localStorage.setItem(
        "bybakari-payment",
        JSON.stringify({
          pollUrl: data.pollUrl,
          reference: data.reference,
          instructions: data.instructions,
        }),
      );
      if (data.redirectUrl) {
        // Card / hosted payment page — Paynow brings the customer back here.
        window.location.href = data.redirectUrl;
      } else {
        // Mobile money: prompt sent to the phone; watch status on the return page.
        onOpenChange(false);
        navigate({ to: "/payment/return" });
      }
    } catch {
      toast.error("Could not reach the payment service — check your connection.");
    } finally {
      setPaying(false);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const orderSummary = items
      .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const message = `
🛍️ *#byBakari Order*

*Items:*
${orderSummary}

*Subtotal:* $${subtotal.toFixed(2)}

Please help me complete this order!
`.trim();

    const opened = window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    if (opened) {
      toast.success("Order sent to WhatsApp — finish it there!");
      clearCart();
      onOpenChange(false);
    } else {
      // Popup blocked: navigate in place but keep the cart so nothing is lost.
      window.location.href = whatsappLink(message);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <p className="text-foreground/60">Your cart is empty</p>
              <Link to="/shop" onClick={() => onOpenChange(false)}>
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-sm text-foreground/60">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm w-6 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-foreground/40 hover:text-foreground transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Paynow */}
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { key: "web", label: "Card & More", icon: CreditCard },
                    { key: "ecocash", label: "EcoCash", icon: Smartphone },
                    { key: "onemoney", label: "OneMoney", icon: Smartphone },
                  ] as const
                ).map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMethod(key)}
                    className={`flex flex-col items-center gap-1 rounded-lg border-2 py-2 text-xs font-semibold transition ${
                      method === key
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/20 hover:border-foreground/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for your receipt"
                className="w-full bg-foreground/5 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/40"
              />
              {method !== "web" && (
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={method === "ecocash" ? "EcoCash number e.g. 0771234567" : "OneMoney number e.g. 0712345678"}
                  className="w-full bg-foreground/5 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/40"
                />
              )}
              <Button
                onClick={handlePaynow}
                disabled={paying || !email || (method !== "web" && !phone)}
                className="w-full bg-black text-white hover:bg-black/85"
              >
                {paying ? "Starting payment…" : `Pay $${subtotal.toFixed(2)} with Paynow`}
              </Button>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-foreground/40">
              <Separator className="flex-1" />
              or
              <Separator className="flex-1" />
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white hover:bg-green-600"
            >
              Order via WhatsApp
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
