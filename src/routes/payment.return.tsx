import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart-context";
import { SITE } from "@/lib/site-config";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const Route = createFileRoute("/payment/return")({
  head: () => ({
    meta: [
      { title: "Payment Status — #byBakari" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaymentReturnPage,
});

interface PendingPayment {
  pollUrl: string;
  reference: string;
  instructions?: string;
}

type PaymentState = "checking" | "paid" | "cancelled" | "pending" | "none";

const POLL_INTERVAL_MS = 4000;
const MAX_POLLS = 45; // ~3 minutes

function PaymentReturnPage() {
  const { clearCart } = useCart();
  const [state, setState] = useState<PaymentState>("checking");
  const [payment, setPayment] = useState<PendingPayment | null>(null);
  const [statusText, setStatusText] = useState("");
  const polls = useRef(0);
  const cleared = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("bybakari-payment");
    if (!stored) {
      setState("none");
      return;
    }
    let parsed: PendingPayment;
    try {
      parsed = JSON.parse(stored) as PendingPayment;
    } catch {
      setState("none");
      return;
    }
    setPayment(parsed);

    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;

    const poll = async () => {
      if (stopped) return;
      polls.current += 1;
      try {
        const res = await fetch("/api/payment-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pollUrl: parsed.pollUrl }),
        });
        const data = (await res.json()) as { paid?: boolean; status?: string };
        if (res.ok && data.status) {
          setStatusText(data.status);
          if (data.paid) {
            setState("paid");
            if (!cleared.current) {
              cleared.current = true;
              clearCart();
              localStorage.removeItem("bybakari-payment");
            }
            return;
          }
          if (data.status === "cancelled" || data.status === "failed") {
            setState("cancelled");
            return;
          }
        }
      } catch {
        // network blip — keep polling
      }
      if (polls.current >= MAX_POLLS) {
        setState("pending");
        return;
      }
      setState("checking");
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-white text-foreground font-body flex flex-col">
      <SiteNav />
      <section className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-md w-full text-center space-y-6">
          {state === "checking" && (
            <>
              <Clock className="w-14 h-14 mx-auto text-black/40 animate-pulse" />
              <h1 className="font-display text-4xl text-black">Confirming Payment…</h1>
              <p className="text-black/60">
                We're checking with Paynow. This usually takes a few seconds — keep this
                page open.
              </p>
              {payment?.instructions && (
                <p className="text-sm text-black/70 bg-black/5 rounded-lg p-4 text-left whitespace-pre-wrap">
                  {payment.instructions}
                </p>
              )}
            </>
          )}

          {state === "paid" && (
            <>
              <CheckCircle2 className="w-14 h-14 mx-auto text-green-600" />
              <h1 className="font-display text-4xl text-black">Payment Received!</h1>
              <p className="text-black/60">
                Tatenda! Your order {payment?.reference && <strong>{payment.reference}</strong>} is
                confirmed. The studio will be in touch about delivery — questions any time on{" "}
                <a href={SITE.whatsappUrl} className="underline">WhatsApp</a>.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-black/90 transition"
              >
                Continue Shopping
              </Link>
            </>
          )}

          {state === "cancelled" && (
            <>
              <XCircle className="w-14 h-14 mx-auto text-red-500" />
              <h1 className="font-display text-4xl text-black">Payment Not Completed</h1>
              <p className="text-black/60">
                The payment was {statusText || "cancelled"}. Your cart is untouched — you can
                try again, or order via{" "}
                <a href={SITE.whatsappUrl} className="underline">WhatsApp</a> instead.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-black/90 transition"
              >
                Back to Shop
              </Link>
            </>
          )}

          {state === "pending" && (
            <>
              <Clock className="w-14 h-14 mx-auto text-amber-500" />
              <h1 className="font-display text-4xl text-black">Still Processing</h1>
              <p className="text-black/60">
                We haven't received confirmation yet
                {payment?.reference && (
                  <>
                    {" "}for order <strong>{payment.reference}</strong>
                  </>
                )}
                . If you completed the payment, it may still settle — message the studio on{" "}
                <a href={SITE.whatsappUrl} className="underline">WhatsApp</a> with your
                reference and we'll confirm.
              </p>
            </>
          )}

          {state === "none" && (
            <>
              <Clock className="w-14 h-14 mx-auto text-black/30" />
              <h1 className="font-display text-4xl text-black">No Payment In Progress</h1>
              <p className="text-black/60">There's no pending payment on this device.</p>
              <Link
                to="/shop"
                className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-black/90 transition"
              >
                Browse the Shop
              </Link>
            </>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
