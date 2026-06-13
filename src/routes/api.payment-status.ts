import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { createPaynowClient, isPaynowUrl, PAID_STATUSES } from "@/lib/paynow.server";

export const Route = createFileRoute("/api/payment-status")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let pollUrl: string;
        try {
          const body = (await request.json()) as { pollUrl?: string };
          pollUrl = body.pollUrl ?? "";
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        if (!isPaynowUrl(pollUrl)) {
          return Response.json({ error: "Invalid poll URL" }, { status: 400 });
        }

        try {
          const paynow = createPaynowClient(new URL(request.url).origin);
          const status = await paynow.pollTransaction(pollUrl);
          const normalized = (status.status ?? "unknown").toLowerCase();
          return Response.json({
            status: normalized,
            paid: PAID_STATUSES.includes(normalized),
            reference: status.reference,
            paynowReference: status.paynowReference,
            amount: status.amount,
          });
        } catch (error) {
          console.error("Paynow poll error:", error);
          return Response.json({ error: "Could not check status" }, { status: 502 });
        }
      },
    },
  },
});
