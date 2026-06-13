import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Paynow POSTs transaction status updates here (the resultUrl). There is no
// database to persist into yet, so we log and acknowledge; the customer-facing
// confirmation works by polling /api/payment-status from the return page.
export const Route = createFileRoute("/api/paynow-result")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const text = await request.text();
          console.log("Paynow status update:", text);
        } catch {
          // ignore
        }
        return new Response("OK", { status: 200 });
      },
    },
  },
});
