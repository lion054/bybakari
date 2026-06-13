import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story | #byBakari | Supporting African Artisans" },
      { name: "description", content: "Learn #byBakari's story: celebrating African artistry and cultural heritage while supporting artisans, designers, and cultural institutions across the continent." },
      { property: "og:title", content: "Our Story — Celebrating African Heritage" },
      { property: "og:description", content: "Discover how #byBakari celebrates African artistry, cultural heritage, and supports talented artisans and designers." },
      { name: "twitter:title", content: "#byBakari Story | Supporting African Artisans" },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <div className="min-h-screen bg-white text-foreground font-body">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0">
          <img
            src="/bybakari/banner.webp"
            alt="#byBakari heritage background"
            className="w-full h-full object-cover opacity-50 mosi-pattern-filter"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="space-y-6 max-w-3xl">
            <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
              Our Heritage
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
              Celebrating African Artistry
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              A founder's vision to amplify cultural heritage and traditional craftsmanship across the continent.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="relative">
              <img
                src="/bybakari/bakari.webp"
                alt="Bakari Sibanda, Founder and Creative Director of #byBakari"
                loading="lazy"
                width={1200}
                height={1400}
                className="w-full aspect-[3/4] object-cover shadow-xl"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-32 bg-black/5 -z-10 hidden lg:block" />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-mono uppercase tracking-widest text-black/60">
                  Our Founder & Creative Director
                </span>
                <h2 className="font-display text-5xl lg:text-6xl text-black leading-tight">
                  Bakari Sibanda
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-black/80">
                <p>
                  Bakari Sibanda founded #byBakari with a vision to celebrate and amplify African artistry, cultural heritage, and traditional craftsmanship on a global stage. Based in Harare, Zimbabwe, Bakari brings a deep understanding of Zimbabwean design traditions and a commitment to supporting talented artisans, designers, and cultural institutions across the continent.
                </p>
                <p>
                  The signature MOSI print—inspired by Victoria Falls and the spirit of Mosi-oa-Tunya (The Smoke That Thunders)—represents Bakari's mission to transform Zimbabwe's cultural heritage into contemporary fashion. Every piece tells a story of creativity, tradition, and cultural pride.
                </p>
                <p>
                  We're committed to supporting sustainable practices and ensuring fair compensation for every artist and artisan who contributes to our collection. Through #byBakari, Bakari is building a platform where African creativity thrives and the world discovers the richness of our continent's artistic heritage.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-medium text-black">Harare, Zimbabwe</span>
                <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-medium text-black">Creative Director</span>
                <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-medium text-black">Cultural Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h3 className="font-display text-5xl lg:text-6xl text-white leading-tight tracking-tight">
              Our Journey
            </h3>
            <div className="w-12 h-1 bg-white mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                year: "2024",
                title: "#byBakari Founded",
                description: "Bakari Sibanda launches #byBakari with a mission to celebrate African artistry and cultural heritage on a global stage."
              },
              {
                year: "2025",
                title: "First Collections Launched",
                description: "Inaugural collections featuring the MOSI signature print and artisanal pieces from talented African designers."
              },
              {
                year: "2026",
                title: "Global Expansion",
                description: "Scaling impact with partnerships across the continent, bringing authentic African pieces to communities worldwide."
              },
            ].map((item) => (
              <div key={item.year} className="space-y-6 pb-8 border-b border-white/20 md:border-b-0 md:pb-0">
                <div className="space-y-2">
                  <span className="text-sm font-mono uppercase tracking-widest text-white/60">
                    {item.year}
                  </span>
                  <h4 className="font-display text-2xl text-white leading-tight">
                    {item.title}
                  </h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="font-display text-4xl lg:text-5xl text-black leading-tight">
            Join the Movement
          </h3>
          <p className="text-lg text-black/70 leading-relaxed max-w-2xl mx-auto">
            Be part of celebrating African artistry and supporting talented artisans across the continent. Discover our collections and share in our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              to="/shop"
              className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-black text-black font-semibold rounded-lg hover:bg-black/5 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}