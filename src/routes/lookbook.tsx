import { createFileRoute } from "@tanstack/react-router";
import { BrandName } from "@/components/brand-name";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook | #byBakari Collections | African Fashion" },
      { name: "description", content: "Explore #byBakari's curated lookbook featuring heritage pieces, modern fusion, and cultural artistry from African artisans and designers." },
      { property: "og:title", content: "#byBakari Lookbook | Heritage & Modern Collections" },
      { property: "og:description", content: "Discover our curated lookbook celebrating African fashion, cultural heritage, and artisanal craftsmanship." },
      { property: "og:image", content: "https://bybakari.com/bybakari/Highlights/_TBJ0604.jpg" },
      { name: "twitter:title", content: "#byBakari Lookbook | Collections" },
    ],
  }),
  component: LookbookPage,
});

const pieces = [
  { img: "/bybakari/Highlights/_TBJ0604.webp", name: "Heritage Pieces", price: "Featured", status: "Available", color: "text-white", offset: false },
  { img: "/bybakari/Highlights/_TBJ0587(2).webp", name: "Modern Fusion", price: "Featured", status: "In Stock", color: "opacity-60", offset: true },
  { img: "/bybakari/Highlights/_TBJ0714.webp", name: "Cultural Artistry", price: "Featured", status: "Limited", color: "text-white", offset: false },
  { img: "/bybakari/Highlights/_TBJ0708.webp", name: "Contemporary Style", price: "Featured", status: "Available", color: "text-white", offset: true },
  { img: "/bybakari/Highlights/_TBJ0647.webp", name: "Signature Collection", price: "Featured", status: "Available", color: "text-white", offset: false },
];

function LookbookPage() {
  return (
    <div className="min-h-screen bg-white text-foreground font-body">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0">
          <img
            src="/bybakari/banner.webp"
            alt="#byBakari Lookbook"
            className="w-full h-full object-cover opacity-50 mosi-pattern-filter"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="space-y-6 max-w-3xl">
            <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
              Curated Collections
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
              <BrandName /> Lookbook
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Discover our carefully curated collection celebrating African heritage, artisanal craftsmanship, and contemporary style.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-2">
            <h2 className="font-display text-4xl md:text-5xl text-black tracking-tight">
              Featured Pieces
            </h2>
            <div className="w-12 h-1 bg-black" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {pieces.map((p, i) => (
              <article
                key={p.name}
                className={`group flex flex-col reveal-up ${p.offset ? "lg:mt-20" : ""}`}
              >
                <div className="relative overflow-hidden mb-8 aspect-[3/4] bg-black/5">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading={i < 2 ? "eager" : "lazy"}
                    width={800}
                    height={1200}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl text-black tracking-tight mb-2">
                      {p.name}
                    </h3>
                    <p className="text-sm font-mono uppercase tracking-widest text-black/50">
                      {p.price}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/10">
                    <span className="text-sm font-mono uppercase tracking-widest text-black/60">
                      {p.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
              Supporting African Artisans
            </h2>
            <div className="w-12 h-1 bg-white mt-6" />
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-white/80">
            <p>
              #byBakari partners with talented African artisans and designers to bring authentic cultural pieces to a global audience. Every piece in our collection represents a commitment to heritage, craftsmanship, and contemporary creativity.
            </p>
            <p>
              We celebrate the richness of African design traditions while embracing modern innovation. By choosing #byBakari, you're supporting artisans, preserving cultural heritage, and investing in authentic African fashion.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-6">
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white">Artisanal Crafted</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white">Heritage Collections</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white">Fair Trade</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}