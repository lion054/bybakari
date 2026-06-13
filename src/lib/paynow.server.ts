import { Paynow } from "paynow";

// Prefer environment variables; the fallbacks keep local dev working.
// Move these out of source before making the repository public.
const INTEGRATION_ID = process.env.PAYNOW_INTEGRATION_ID || "11426";
const INTEGRATION_KEY =
  process.env.PAYNOW_INTEGRATION_KEY || "b61f7f7c-c6fe-4315-8638-df1b8477b2c9";

/** Paid-equivalent statuses per the Paynow status reference. */
export const PAID_STATUSES = ["paid", "awaiting delivery", "delivered"];

export function createPaynowClient(origin: string): Paynow {
  const paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
  // Server-to-server status callback and the page the customer returns to.
  paynow.resultUrl = `${origin}/api/paynow-result`;
  paynow.returnUrl = `${origin}/payment/return`;
  return paynow;
}

/** Only ever poll URLs that actually belong to Paynow (avoids SSRF). */
export function isPaynowUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "www.paynow.co.zw" || host === "paynow.co.zw";
  } catch {
    return false;
  }
}
