import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PRODUCTS, COLOR_SWATCHES } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | African Fashion Collections | #byBakari" },
      { name: "description", content: "Browse #byBakari's premium collections: MOSI signature print, everyday essentials, and limited edition pieces. Handcrafted in Zimbabwe with authentic African artistry." },
      { property: "og:title", content: "Shop #byBakari | Premium African Fashion" },
      { property: "og:description", content: "Discover curated African fashion collections featuring the MOSI signature print and artisanal pieces." },
      { property: "og:image", content: "https://bybakari.com/bybakari/banner.png" },
      { name: "twitter:title", content: "Shop #byBakari Collections" },
    ],
  }),
  component: ShopPage,
});

interface QuickViewProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  colors: string[];
  image: string;
}

function ShopPage() {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { addToCart } = useCart();

  const handleQuickView = (product: (typeof PRODUCTS)[0]) => {
    setQuickViewProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      sizes: product.sizes,
      colors: product.colors,
      image: product.images[0],
    });
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuickViewOpen(true);
  };

  const handleQuickAddToCart = () => {
    if (!quickViewProduct) return;
    addToCart({
      id: `${quickViewProduct.id}-${selectedSize}-${selectedColor}`,
      name: `${quickViewProduct.name} (${selectedSize}, ${selectedColor})`,
      price: quickViewProduct.price,
      image: quickViewProduct.image,
    });
    toast.success(`${quickViewProduct.name} added to cart!`);
    setQuickViewOpen(false);
  };

  const categories = ["MOSI", "Everyday", "Limited"] as const;

  return (
    <div className="min-h-screen bg-white text-foreground font-body">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0">
          <img
            src="/bybakari/banner.webp"
            alt="MOSI pattern background"
            className="w-full h-full object-cover opacity-60 mosi-pattern-filter"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="space-y-6 max-w-3xl">
            <div className="space-y-3">
              <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
                Discover Collections
              </p>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
                Shop Premium
              </h1>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white/90 leading-tight tracking-tight">
                African Collections
              </h2>
            </div>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Curated pieces featuring the MOSI signature print, artisanal craftsmanship, and limited edition designs.
            </p>
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {categories.map((category) => {
        const categoryProducts = PRODUCTS.filter((p) => p.category === category);
        return (
          <section key={category} className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="mb-16 space-y-2">
                <h2 className="font-display text-4xl md:text-5xl text-black tracking-tight">
                  {category} Collection
                </h2>
                <div className="w-12 h-1 bg-black" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {categoryProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col h-full reveal-up">
                    {/* Product Image with Overlay */}
                    <div className="relative overflow-hidden mb-6 aspect-[3/4] cursor-pointer bg-black/5">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleQuickView(product)}
                          className="bg-white text-black px-8 py-3 font-semibold hover:bg-black hover:text-white transition-all duration-300 rounded-lg text-sm"
                        >
                          Quick View
                        </button>
                        <Link
                          to="/shop/$productId"
                          params={{ productId: product.id }}
                          className="bg-white text-black px-8 py-3 font-semibold hover:bg-black hover:text-white transition-all duration-300 rounded-lg text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Product Info */}
                    <h3 className="font-display text-xl lg:text-2xl text-black tracking-tight mb-3">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-black mb-3">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-black/60 leading-relaxed flex-grow">
                      {product.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-md max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{quickViewProduct?.name}</DialogTitle>
          </DialogHeader>
          {quickViewProduct && (
            <div className="space-y-4">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full aspect-[3/4] object-cover"
              />
              <p className="text-lg font-semibold">${quickViewProduct.price.toFixed(2)}</p>
              <p className="text-sm text-foreground/70">{quickViewProduct.description}</p>

              {/* Size Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold">Size</label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 font-semibold transition ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-black/20 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold">
                  Color <span className="text-foreground/50 font-normal">({selectedColor})</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {quickViewProduct.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      aria-label={`Select color ${color}`}
                      className={`w-9 h-9 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "border-black ring-2 ring-black ring-offset-2"
                          : "border-black/20 hover:border-black"
                      }`}
                      style={{ backgroundColor: COLOR_SWATCHES[color] }}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleQuickAddToCart}
                  className="flex-1 bg-black text-white hover:bg-black/90"
                >
                  Add to Cart
                </Button>
                <Link
                  to="/shop/$productId"
                  params={{ productId: quickViewProduct.id }}
                  onClick={() => setQuickViewOpen(false)}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}
