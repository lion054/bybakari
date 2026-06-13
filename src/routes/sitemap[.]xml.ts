import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PRODUCTS } from "@/lib/products";

const BASE_URL = "https://bybakari.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: new Date().toISOString().split('T')[0] },
          { path: "/shop", changefreq: "twice-weekly", priority: "0.95", lastmod: new Date().toISOString().split('T')[0] },
          { path: "/print", changefreq: "monthly", priority: "0.9" },
          { path: "/photoshoot", changefreq: "monthly", priority: "0.8" },
          ...PRODUCTS.map((p) => ({ path: `/shop/${p.id}`, changefreq: "weekly", priority: "0.8" })),
          { path: "/lookbook", changefreq: "weekly", priority: "0.9" },
          { path: "/story", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});