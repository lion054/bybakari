import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import Anthropic from "@anthropic-ai/sdk";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site-config";

const CATALOG = PRODUCTS.map(
  (p) =>
    `- ${p.name} ($${p.price.toFixed(2)}) — ${p.category} collection. Sizes: ${p.sizes.join("/")}. Colors: ${p.colors.join(", ")}. ${p.description} Link: /shop/${p.id}`,
).join("\n");

const SYSTEM_PROMPT = `You are Bakari's AI stylist — the shopping assistant for #byBakari, a premium African fashion house in Harare, Zimbabwe, known for the MOSI signature wax print inspired by Victoria Falls.

You help customers browse the collection, pick sizes and colors, put together outfits, and answer questions about the brand, the MOSI print, and how to order.

Product catalog:
${CATALOG}

Brand facts:
- Founded by Bakari Sibanda. Studio: ${SITE.address}. Hours: Mon–Fri from 08:30, or by appointment.
- Orders are completed over WhatsApp (${SITE.phoneDisplay}). Customers add items to the cart on the site and tap "Checkout via WhatsApp", or message the studio directly.
- Email: ${SITE.email}. Instagram: @by_bakari.
- Pages: /shop (all products), /print (the MOSI story), /photoshoot (campaign), /lookbook, /story, /contact.

Style rules:
- Be warm and brief — two to four sentences per reply, like a knowledgeable boutique stylist, not a brochure.
- When you recommend a product, give its name, price, and its link path (e.g. /shop/3) so the customer can tap through.
- Recommend at most three products at a time.
- For payment, shipping, delivery timelines, returns, or custom orders, say the studio confirms those details on WhatsApp and point them there.
- Only discuss #byBakari, its products, African fashion, and styling. If asked about anything else, steer back politely.
- Never invent products, prices, or discounts that aren't in the catalog.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "unconfigured", whatsapp: SITE.whatsappUrl },
            { status: 503 },
          );
        }

        let history: ChatMessage[];
        try {
          const body = (await request.json()) as { messages?: ChatMessage[] };
          history = (body.messages ?? [])
            .filter(
              (m) =>
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string" &&
                m.content.length > 0,
            )
            .slice(-20)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
        } catch {
          return Response.json({ error: "bad_request" }, { status: 400 });
        }
        if (history.length === 0 || history[history.length - 1].role !== "user") {
          return Response.json({ error: "bad_request" }, { status: 400 });
        }

        const client = new Anthropic({ apiKey });
        try {
          const response = await client.messages.create({
            model: "claude-opus-4-8",
            max_tokens: 1024,
            output_config: { effort: "low" },
            system: [
              {
                type: "text",
                text: SYSTEM_PROMPT,
                cache_control: { type: "ephemeral" },
              },
            ],
            messages: history,
          });

          const reply = response.content
            .filter((b): b is Anthropic.TextBlock => b.type === "text")
            .map((b) => b.text)
            .join("");
          return Response.json({ reply });
        } catch (error) {
          if (error instanceof Anthropic.RateLimitError) {
            return Response.json({ error: "busy" }, { status: 429 });
          }
          console.error("AI chat error:", error);
          return Response.json({ error: "unavailable" }, { status: 502 });
        }
      },
    },
  },
});
