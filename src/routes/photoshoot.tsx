import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Route = createFileRoute("/photoshoot")({
  head: () => ({
    meta: [
      { title: "MOSI Photoshoot | #byBakari Campaign | Behind the Scenes" },
      { name: "description", content: "Explore the MOSI fabric photoshoot campaign. See how our signature print comes to life through professional styling, diverse models, and stunning locations across Zimbabwe." },
      { property: "og:title", content: "MOSI Photoshoot | #byBakari Campaign" },
      { property: "og:description", content: "Behind-the-scenes photoshoot showcasing the MOSI signature print in action." },
      { property: "og:image", content: "https://bybakari.com/bybakari/photoshoot/IMG_4681.jpg" },
      { name: "twitter:title", content: "MOSI Photoshoot Campaign" },
    ],
  }),
  component: PhotoshootPage,
});

const photos = [
  { id: "IMG_4681", alt: "Model in ochre/black MOSI jacket with white pants, geometric print, red-tinted sunglasses, brick wall backdrop." },
  { id: "IMG_4684", alt: "Model in ochre/black MOSI cropped jacket, black headwrap, sunglasses, white brick wall setting." },
  { id: "IMG_4687", alt: "Model crouching in MOSI jacket with mixed geometric patterns, white pants, weathered window backdrop." },
  { id: "IMG_4689", alt: "Adult and child in matching MOSI jackets, ochre/black geometric print, brick wall setting." },
  { id: "IMG_4702", alt: "Model in MOSI jacket facing away, hand to head, ochre/black diamond patterns, brick wall." },
  { id: "IMG_4708", alt: "Two models in MOSI jackets posing by weathered structure, mixed geometric patterns, white pants." },
  { id: "IMG_4717", alt: "Two models in MOSI jackets by white van, outdoor setting with trees, geometric prints." },
  { id: "IMG_4727", alt: "Two models in MOSI jackets leaning on white vehicle door, blue sky background." },
  { id: "IMG_4735", alt: "Model in MOSI jacket and matching headwrap, shirtless pose on tires, ochre diamond geometric print." },
  { id: "IMG_4736", alt: "Two models in MOSI jackets by white vehicle, one standing, one seated, outdoor setting." },
  { id: "IMG_4755", alt: "Model in MOSI jacket leaning on white car, red sunglasses, dry grass setting." },
  { id: "IMG_4765", alt: "Model in MOSI jacket exiting white vehicle, red sunglasses, palm trees visible." },
  { id: "IMG_4779", alt: "Model in tan/ochre MOSI wrap with conical hat in dry grassland, golden hour lighting." },
  { id: "IMG_4788", alt: "Two models in MOSI wraps and conical hats, one in ochre/black, one in white geometric print." },
  { id: "IMG_4801", alt: "Two models in MOSI geometric wraps and hats in golden grassland at sunset, ochre and white." },
  { id: "IMG_4807", alt: "Model in white MOSI geometric print wrap and conical hat, golden grassland sunset backdrop." },
  { id: "IMG_4808", alt: "Model in tan MOSI wrap and conical hat facing white-clad model, dry landscape at dusk." },
  { id: "IMG_4829", alt: "Model's hand holding ochre-and-white MOSI print fabric in dry grasses at golden hour." },
  { id: "IMG_4857", alt: "Model in ochre-and-white MOSI print shirt and hat, profile pose amid tall grasses at sunset." },
  { id: "IMG_4864", alt: "Two models in mixed MOSI print, ochre geometric and white geometric, at dusk landscape." },
  { id: "IMG_4867", alt: "Two models in MOSI print coordinates, one adjusting the other's white headwrap outdoors." },
  { id: "IMG_4879", alt: "Two models in MOSI print outfits pose against weathered wooden backdrop at golden hour." },
  { id: "IMG_4880", alt: "Two models in ochre and white MOSI geometric prints embrace against rustic backdrop." },
  { id: "IMG_4884", alt: "Two models in MOSI print, one white-based, one ochre, at sunset with trees silhouetted." },
  { id: "IMG_4886", alt: "Two models in coordinating MOSI prints, one headwrapped, against natural landscape at dusk." },
  { id: "IMG_4889", alt: "Two models in white and ochre MOSI prints converse outdoors at golden-hour sunset." },
  { id: "IMG_4899", alt: "Single model in all-over ochre MOSI print jacket and pants, arms folded, sunset backdrop." },
  { id: "IMG_4904", alt: "Model in flowing white-based MOSI print dress, reclining pose at golden hour." },
  { id: "IMG_4907", alt: "Two models in MOSI prints, white and ochre coordinates, intimate pose at dusk landscape." },
  { id: "IMG_4912", alt: "Shirtless male model in ochre MOSI print pants with geometric collar detail, standing confidently." },
  { id: "IMG_4915", alt: "Woman in white MOSI print cape over ochre dress, statement earrings, sunset field." },
  { id: "IMG_4924", alt: "Model in ochre MOSI print bucket hat and white geometric scarf, confident pose at dusk." },
  { id: "IMG_4935", alt: "Model in white MOSI print jacket over ochre MOSI dress, wide-brimmed straw hat, golden light." },
  { id: "IMG_4947", alt: "Model in white MOSI print jacket, ochre MOSI pants, straw hat, dramatic sunset backdrop." },
];

function PhotoshootPage() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledPhotos, setShuffledPhotos] = useState<typeof photos>([]);

  useEffect(() => {
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    setShuffledPhotos(shuffled.slice(0, 32));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!viewerOpen) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setViewerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewerOpen, currentIndex]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledPhotos.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shuffledPhotos.length) % shuffledPhotos.length);
  };

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-foreground font-body">
      <SiteNav />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-black text-white pt-20">
        <div className="absolute inset-0">
          <img
            src="/bybakari/photoshoot/IMG_4681.webp"
            alt="MOSI Photoshoot Campaign"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="space-y-6 max-w-3xl">
            <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
              Campaign & Behind the Scenes
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
              MOSI Photoshoot
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Explore 32 stunning images showcasing the MOSI signature print through professional styling, diverse models, and breathtaking locations across Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-2">
            <h2 className="font-display text-4xl md:text-5xl text-black tracking-tight">
              Gallery
            </h2>
            <div className="w-12 h-1 bg-black" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {shuffledPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden bg-black/5 aspect-[3/4] cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 reveal-up"
                onClick={() => openViewer(index)}
              >
                <img
                  src={`/bybakari/photoshoot/${photo.id}.webp`}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="flex max-w-none w-screen h-dvh max-h-dvh p-0 border-0 rounded-none sm:rounded-none bg-black/95 backdrop-blur">
          <div className="relative w-full h-full flex flex-col">
            {/* Image */}
            <div className="flex-1 min-h-0 flex items-center justify-center relative overflow-hidden px-16 py-20">
              {shuffledPhotos.length > 0 && (
                <img
                  src={`/bybakari/photoshoot/${shuffledPhotos[currentIndex].id}.webp`}
                  alt={shuffledPhotos[currentIndex].alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              )}
            </div>

            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
              {/* Previous Button */}
              <button
                type="button"
                onClick={goPrev}
                className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={goNext}
                className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 transform hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Top Bar Info */}
            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-center">
              <div className="text-white font-mono text-sm">
                {currentIndex + 1} / {shuffledPhotos.length}
              </div>
              <button
                type="button"
                onClick={() => setViewerOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 transform hover:scale-110"
                aria-label="Close viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white/80 font-mono text-sm">{shuffledPhotos[currentIndex]?.alt}</p>
              <p className="text-white/50 text-xs mt-2 font-mono">Use arrow keys to navigate • Press ESC to close</p>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / shuffledPhotos.length) * 100}%` }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* About Campaign Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
              Celebrating MOSI in Action
            </h2>
            <div className="w-12 h-1 bg-white mt-6" />
          </div>

          <p className="text-lg leading-relaxed text-white/80">
            This photoshoot campaign captures the essence of #byBakari's signature MOSI print. Every image tells a story of cultural pride, contemporary African fashion, and the incredible versatility of our fabric. From casual streetwear to bold fashion statements, these photos showcase how the MOSI print brings African heritage to life in the modern world.
          </p>

          <p className="text-lg leading-relaxed text-white/80">
            Featuring diverse models, stunning locations, and professional styling, these 32 images demonstrate the richness and contemporary appeal of authentic African design. Each piece celebrates Zimbabwean artistry and the power of cultural expression through fashion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <a
              href="/shop"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 inline-block text-center"
            >
              Shop MOSI Collection
            </a>
            <a
              href="/print"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 inline-block text-center"
            >
              Learn the Story
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
