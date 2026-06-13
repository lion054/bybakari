import { Link } from "@tanstack/react-router";
import { BrandName } from "@/components/brand-name";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { CartSheet } from "./cart-sheet";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function SiteNav() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  const linkCls = "font-mono text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity";

  const navLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/print", label: "Mosi" },
    { to: "/photoshoot", label: "Campaign" },
    { to: "/lookbook", label: "Lookbook" },
    { to: "/story", label: "Story" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-end mix-blend-difference text-background pointer-events-none">
        {/* Brand */}
        <div className="flex flex-col pointer-events-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">
            Premium African Fashion
          </span>
          <Link to="/" className="font-display text-3xl tracking-tighter leading-none">
            <BrandName />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center pointer-events-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkCls}
              activeProps={{ className: `${linkCls} opacity-100 font-semibold` }}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:opacity-70 transition-opacity"
            aria-label="Open shopping cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-bold bg-current text-background w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4 pointer-events-auto">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:opacity-70 transition-opacity"
            aria-label="Open shopping cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-bold bg-current text-background w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      {/* Mobile Navigation Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-full sm:max-w-xs">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-widest hover:opacity-60 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}