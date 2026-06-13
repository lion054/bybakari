import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/print")({
  head: () => ({
    meta: [
      { title: "MOSI Print | The Smoke That Thunders | #byBakari" },
      { name: "description", content: "Discover the MOSI signature print inspired by Victoria Falls. Learn how this Zimbabwean design celebrates African heritage, cultural pride, and contemporary luxury craftsmanship." },
      { property: "og:title", content: "MOSI — The Smoke That Thunders" },
      { property: "og:description", content: "A signature print inspired by Victoria Falls, celebrating Zimbabwean heritage and African luxury." },
      { property: "og:image", content: "https://bybakari.com/bybakari/mosi-hero.png" },
      { name: "twitter:title", content: "MOSI Print | Victoria Falls Inspired Design" },
    ],
  }),
  component: PrintPage,
});

const motifs = [
  { id: "I", name: "Flowing Water", note: "The endless movement of water and mist from Victoria Falls." },
  { id: "II", name: "Geometric Rhythm", note: "Patterns reflecting the structure and ingenuity of Zimbabwean cultural expression." },
  { id: "III", name: "Power & Movement", note: "Echoing the symbol of power, movement, resilience found at Mosi-oa-Tunya." },
  { id: "IV", name: "Cultural Heritage", note: "Carrying the spirit of Zimbabwe into every garment." },
];

function PrintPage() {
  return (
    <div className="min-h-screen bg-white text-foreground font-body">
      <SiteNav />

      {/* Hero with MOSI Design - Full Screen */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src="/bybakari/mosi-hero.webp"
          alt="MOSI Print - The Smoke That Thunders"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-mono uppercase tracking-widest text-black/60">
                  Victoria Falls, Zimbabwe
                </span>
                <h2 className="font-display text-5xl lg:text-6xl text-black leading-tight">
                  Mosi-oa-Tunya
                </h2>
                <p className="text-lg text-black/60 font-mono tracking-widest">
                  The Smoke That Thunders
                </p>
              </div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-black/80">
              <p>
                The MOSI print draws its inspiration from Mosi-oa-Tunya — "The Smoke That Thunders" — the indigenous name of the majestic Victoria Falls. For generations, the Falls have stood as a symbol of power, movement, resilience, and wonder, connecting people, cultures, and stories across Southern Africa.
              </p>
              <p>
                The flowing lines within the print echo the endless movement of water and mist, while its geometric elements reflect the rhythm, structure, and ingenuity found within Zimbabwean cultural expression. Together, these forms create a visual language that speaks of both nature's force and humanity's creativity.
              </p>
              <p>
                MOSI is more than a pattern. It is a tribute to the energy that shapes us — the courage to move forward, the strength to endure, and the pride of knowing where we come from. Created by #byBakari, the MOSI print transforms a national icon into a contemporary expression of African luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Elements */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h3 className="font-display text-5xl lg:text-6xl text-white leading-tight">
              Design Elements
            </h3>
            <div className="w-12 h-1 bg-white mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {motifs.map((m) => (
              <div key={m.id} className="space-y-4 pb-8 lg:pb-0">
                <span className="text-sm font-mono uppercase tracking-widest text-white/60">
                  Element {m.id}
                </span>
                <h4 className="font-display text-2xl lg:text-3xl text-white">
                  {m.name}
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {m.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOSI Vision Gallery */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-2">
            <h2 className="font-display text-4xl lg:text-5xl text-black tracking-tight">
              The MOSI Vision
            </h2>
            <div className="w-12 h-1 bg-black" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src="/bybakari/mosi-flier-1.webp"
                alt="MOSI Print Design 1"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src="/bybakari/mosi-flier-2.webp"
                alt="MOSI Print Design 2"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-sm font-mono uppercase tracking-widest text-white/60">
              Crafted in Zimbabwe
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
              Made with Intention
            </h2>
          </div>

          <p className="text-lg leading-relaxed text-white/80 max-w-3xl">
            The MOSI print is carefully produced in Zimbabwe, honoring the craftsmanship and cultural heritage that inspired it. Every detail reflects a commitment to quality, authenticity, and the celebration of African artistry. This is not just fabric — it is a statement of cultural pride and contemporary African luxury, carrying the spirit of Mosi-oa-Tunya into every garment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              to="/shop"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all duration-300"
            >
              Shop MOSI Collection
            </Link>
            <Link
              to="/photoshoot"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              View Campaign
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}