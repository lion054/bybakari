import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BrandName } from "@/components/brand-name";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "#byBakari | Premium African Fashion & Heritage Collections" },
      { name: "description", content: "Shop authentic African fashion collections. #byBakari features the MOSI signature print, luxury artisanal pieces, and cultural heritage designs handcrafted in Zimbabwe." },
      { property: "og:title", content: "#byBakari — Premium African Fashion & Heritage" },
      { property: "og:description", content: "Discover luxury African fashion featuring the MOSI signature print and artisanal collections celebrating cultural heritage." },
      { property: "og:image", content: "https://bybakari.com/bybakari/banner.png" },
      { name: "twitter:title", content: "#byBakari | Premium African Fashion" },
      { name: "twitter:description", content: "Shop authentic African fashion collections with the MOSI signature print." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-accent/30">
      <SiteNav />

      {/* Hero */}
      <section className="relative h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-70 animate-[fade-in_1.2s_ease-out]">
          <img
            src="/bybakari/banner.webp"
            alt="#byBakari MOSI signature print celebrating African heritage and craftsmanship"
            width={1920}
            height={1280}
            className="w-full h-full object-cover mosi-pattern-filter"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        <div className="relative z-10 text-center px-6">
          <h1 className="animate-[fade-in_0.9s_ease-out]">
            <img
              src="/bybakari/logo-full.webp"
              alt="#byBakari — Made in Zimbabwe"
              width={474}
              height={235}
              className="w-[70vw] max-w-3xl mx-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
            />
          </h1>
          <p className="font-mono text-[12px] tracking-[0.4em] uppercase text-background/85 mt-8 animate-[fade-in_1.2s_ease-out]">
            Premium African Fashion
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-20 bg-background/30" />
        </div>
      </section>

      {/* Story split */}
      <section className="py-32 px-6 lg:px-24 bg-background">
        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <span className="font-mono text-xs text-foreground/60 uppercase tracking-widest">
              01 — Origin
            </span>
            <h2 className="text-5xl lg:text-6xl font-display leading-[0.9] tracking-tight text-balance">
              A CELEBRATION OF <br />
              <span className="text-foreground">AFRICAN ARTISTRY</span>
            </h2>
            <p className="text-lg leading-relaxed text-pretty opacity-80 max-w-[45ch]">
              Inspired by Zimbabwe's cultural heritage and the bold geometry of contemporary African design. #byBakari is a celebration of heritage — a textile movement that honors where we come from.
            </p>
            <Link
              to="/print"
              className="inline-block w-fit font-mono text-[10px] uppercase tracking-[0.3em] border-b border-foreground/30 pb-2 hover:border-foreground hover:text-foreground transition-all"
            >
              Explore the MOSI Print →
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="relative">
              <img
                src="/bybakari/Highlights/_TBJ0647.webp"
                alt="#byBakari MOSI collection showcase"
                loading="lazy"
                width={1200}
                height={1500}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-12 -left-12 w-64 h-80 hidden lg:block border-[12px] border-background">
                <img
                  src="/bybakari/Highlights/_TBJ0714.webp"
                  alt="Editorial fitting in MOSI print"
                  loading="lazy"
                  width={800}
                  height={1100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook preview */}
      <section className="bg-foreground text-background py-32 px-6 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6 max-w-7xl mx-auto">
          <h3 className="font-display text-7xl lg:text-8xl tracking-tighter leading-none">
            <BrandName /> <br />
            <span className="text-accent">COLLECTIONS</span>
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest opacity-50">
            Curated Highlights / Featured Pieces
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 max-w-7xl mx-auto">
          {[
            { img: "/bybakari/photoshoot/IMG_4681.webp", name: "Urban Collection", status: "Available", color: "text-accent" },
            { img: "/bybakari/photoshoot/IMG_4867.webp", name: "Heritage Pieces", status: "Limited", color: "opacity-60" },
            { img: "/bybakari/photoshoot/IMG_4947.webp", name: "Contemporary", status: "Featured", color: "text-accent" },
          ].map((item, i) => (
            <Link
              to="/photoshoot"
              key={item.name}
              className={`group relative flex flex-col gap-4 reveal-up ${i === 1 ? "lg:mt-24" : ""}`}
            >
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  width={800}
                  height={1200}
                  className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                <span>{item.name}</span>
                <span className={item.color}>{item.status}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center max-w-7xl mx-auto">
          <Link
            to="/lookbook"
            className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] border-b border-background/40 pb-2 hover:border-background hover:text-background transition-all"
          >
            View the full collection →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
