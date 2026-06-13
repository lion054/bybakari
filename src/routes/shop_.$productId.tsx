import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getProductById, getRelatedProducts, COLOR_SWATCHES } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop_/$productId")({
  component: ProductDetailPage,
  head: ({ params }) => {
    const product = getProductById(params.productId);
    return {
      meta: [
        { title: product ? `${product.name} — #byBakari` : "Product Not Found — #byBakari" },
        { name: "description", content: product?.description || "" },
      ],
    };
  },
});

function ProductDetailPage() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const product = getProductById(params.productId);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground font-body">
        <SiteNav />
        <section className="pt-40 pb-20 px-6 lg:px-24 max-w-7xl mx-auto">
          <h1 className="font-display text-4xl">Product Not Found</h1>
          <Link to="/shop">
            <Button className="mt-6">Back to Shop</Button>
          </Link>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const related = getRelatedProducts(product.id, product.category);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        name: `${product.name} (${selectedSize}, ${selectedColor})`,
        price: product.price,
        image: product.images[0],
      });
    }
    toast.success(`${product.name} added to cart!`);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white text-foreground font-body">
      <SiteNav />

      <section className="py-12 lg:py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <button
            type="button"
            onClick={() => navigate({ to: "/shop" })}
            className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-black/60 hover:text-black mb-12 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </button>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Left: Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black/5 rounded-lg shadow-lg">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-24 h-32 overflow-hidden border-2 rounded-lg transition ${
                        mainImage === img ? "border-black shadow-md" : "border-black/20 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-sm font-mono uppercase tracking-widest text-black/60">
                  {product.category} Collection
                </span>
                <h1 className="font-display text-4xl lg:text-5xl text-black leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="text-4xl font-bold text-black">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-lg leading-relaxed text-black/70 border-b border-black/10 pb-8">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-black">
                  Select Size <span className="text-black/50 font-normal">({selectedSize})</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 font-semibold rounded-lg transition-all duration-200 ${
                        selectedSize === size
                          ? "border-black bg-black text-white shadow-lg"
                          : "border-black/20 text-black hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-black">
                  Select Color <span className="text-black/50 font-normal">({selectedColor})</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      aria-label={`Select color ${color}`}
                      className={`w-11 h-11 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? "border-black ring-2 ring-black ring-offset-2 shadow-lg"
                          : "border-black/20 hover:border-black"
                      }`}
                      style={{ backgroundColor: COLOR_SWATCHES[color] }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-black">Quantity</label>
                <div className="flex items-center border-2 border-black/20 rounded-lg w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-black/5 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-black/5 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-black text-white hover:bg-black/90 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg"
              >
                Add to Cart
              </Button>

              {/* Additional Info */}
              <div className="space-y-4 border-t border-black/10 pt-8">
                <div className="flex justify-between py-3 border-b border-black/5">
                  <span className="text-black/60 font-medium">Material</span>
                  <span className="text-black font-semibold">Premium Cotton & Linen Blend</span>
                </div>
                <div className="flex justify-between py-3 border-b border-black/5">
                  <span className="text-black/60 font-medium">Care Instructions</span>
                  <span className="text-black font-semibold">Hand wash or gentle cycle</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-black/60 font-medium">Made in</span>
                  <span className="text-black font-semibold">Zimbabwe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="border-t border-black/10 pt-20">
              <div className="mb-16 space-y-2">
                <h2 className="font-display text-4xl text-black tracking-tight">
                  You Might Also Like
                </h2>
                <div className="w-12 h-1 bg-black" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to="/shop/$productId"
                    params={{ productId: p.id }}
                    className="group flex flex-col"
                  >
                    <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-black/5 rounded-lg">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-display text-lg lg:text-xl text-black tracking-tight mb-2">
                      {p.name}
                    </h3>
                    <p className="text-lg font-semibold text-black">${p.price.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
