import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site-config";
import { BrandName } from "@/components/brand-name";

export function SiteFooter() {
  return (
    <footer className="py-24 px-6 border-t border-foreground/10 bg-background text-foreground">
      <div className="grid lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          <h4 className="font-display text-4xl tracking-tight mb-6">CELEBRATE AFRICAN ARTISTRY.</h4>
          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp</a>
          </div>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase">
          <span className="text-foreground/40">Address</span>
          <p className="leading-relaxed">76 Robert Mugabe Rd,<br />Harare, Zimbabwe</p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase">
          <span className="text-foreground/40">Contact</span>
          <p><a href={SITE.whatsappUrl} className="hover:underline">{SITE.phoneDisplay}</a></p>
          <p><a href={`mailto:${SITE.email}`} className="hover:underline">{SITE.email}</a></p>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-foreground/5 flex justify-between items-center max-w-7xl mx-auto">
        <span className="font-mono text-[9px] text-foreground/40 uppercase tracking-widest">
          © 2026 #byBakari. All Rights Reserved.
        </span>
        <span className="font-display text-xl opacity-20"><BrandName /></span>
      </div>
    </footer>
  );
}