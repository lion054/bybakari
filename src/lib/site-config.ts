export const SITE = {
  name: "#byBakari",
  url: "https://bybakari.com",
  whatsappNumber: "263777959459",
  whatsappUrl: "https://wa.me/263777959459",
  email: "hello@bybakari.com",
  phoneDisplay: "+263 77 795 9459",
  instagram: "https://www.instagram.com/by_bakari/",
  address: "76 Robert Mugabe Rd, Harare, Zimbabwe",
} as const;

export function whatsappLink(message?: string): string {
  return message
    ? `${SITE.whatsappUrl}?text=${encodeURIComponent(message)}`
    : SITE.whatsappUrl;
}
