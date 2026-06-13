import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { createPaynowClient } from "@/lib/paynow.server";
import { getProductById } from "@/lib/products";

interface CheckoutItem {
  /** Cart item id, shaped `${productId}-${size}-${color}` */
  id: string;
  quantity: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  email: string;
  method: "web" | "ecocash" | "onemoney";
  phone?: string;
}

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: CheckoutBody;
        try {
          body = (await request.json()) as CheckoutBody;
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        const email = typeof body.email === "string" ? body.email.trim() : "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return Response.json({ error: "A valid email is required" }, { status: 400 });
        }
        if (!Array.isArray(body.items) || body.items.length === 0) {
          return Response.json({ error: "Cart is empty" }, { status: 400 });
        }

        const origin = new URL(request.url).origin;
        const paynow = createPaynowClient(origin);
        const reference = `BB-${Date.now()}`;
        const payment = paynow.createPayment(reference, email);

        // Prices come from the server-side catalog, never from the client.
        for (const item of body.items) {
          const qty = Math.min(Math.max(Math.floor(item.quantity ?? 0), 1), 99);
          const [productId, ...variant] = String(item.id).split("-");
          const product = getProductById(productId);
          if (!product) {
            return Response.json(
              { error: `Unknown product in cart: ${item.id}` },
              { status: 400 },
            );
          }
          const label = variant.length
            ? `${product.name} (${variant.join(", ")}) x${qty}`
            : `${product.name} x${qty}`;
          payment.add(label, product.price * qty);
        }

        try {
          if (body.method === "ecocash" || body.method === "onemoney") {
            const phone = (body.phone ?? "").replace(/\s+/g, "");
            if (!/^0(7[1378])\d{7}$/.test(phone)) {
              return Response.json(
                { error: "Enter a valid Zimbabwean mobile number, e.g. 0771234567" },
                { status: 400 },
              );
            }
            const response = await paynow.sendMobile(payment, phone, body.method);
            if (!response.success) {
              return Response.json(
                { error: response.error || "Paynow rejected the payment" },
                { status: 502 },
              );
            }
            return Response.json({
              reference,
              pollUrl: response.pollUrl,
              instructions: response.instructions,
            });
          }

          const response = await paynow.send(payment);
          if (!response.success || !response.redirectUrl) {
            return Response.json(
              { error: response.error || "Paynow rejected the payment" },
              { status: 502 },
            );
          }
          return Response.json({
            reference,
            pollUrl: response.pollUrl,
            redirectUrl: response.redirectUrl,
          });
        } catch (error) {
          console.error("Paynow checkout error:", error);
          return Response.json(
            { error: "Could not reach Paynow — please try again" },
            { status: 502 },
          );
        }
      },
    },
  },
});
