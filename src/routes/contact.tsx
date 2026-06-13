import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SITE, whatsappLink } from "@/lib/site-config";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact #byBakari | Harare, Zimbabwe | Get in Touch" },
      { name: "description", content: "Contact #byBakari in Harare, Zimbabwe. Reach out for collaborations, press inquiries, wholesale orders, and more. Open Monday–Friday, 08:30 am onwards." },
      { property: "og:title", content: "Contact #byBakari | Get in Touch" },
      { property: "og:description", content: "Reach #byBakari in Harare, Zimbabwe for inquiries, collaborations, and partnerships." },
      { name: "twitter:title", content: "Contact #byBakari" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("collaboration");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello #byBakari! New ${inquiryType} inquiry.\n\nName: ${name}\nEmail: ${email}\n\n${message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white text-foreground font-body flex flex-col">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0">
          <img
            src="/bybakari/banner.webp"
            alt="Contact #byBakari"
            className="w-full h-full object-cover opacity-50 mosi-pattern-filter"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="space-y-6 max-w-3xl">
            <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
              Get in Touch
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Contact us for collaborations, press inquiries, wholesale opportunities, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-4xl lg:text-5xl text-black mb-12 leading-tight">
                  Contact Information
                </h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-sm font-mono uppercase tracking-widest text-black/60">
                    Address
                  </span>
                  <p className="font-display text-2xl text-black leading-tight">
                    76 Robert Mugabe Road
                    <br />
                    Harare, Zimbabwe
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-sm font-mono uppercase tracking-widest text-black/60">
                    Hours
                  </span>
                  <p className="text-lg text-black/70 leading-relaxed">
                    Monday — Friday
                    <br />
                    08:30 AM onwards
                    <br />
                    <span className="text-sm text-black/60">Or by appointment</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <span className="text-sm font-mono uppercase tracking-widest text-black/60">
                    Contact Methods
                  </span>
                  <div className="space-y-3 text-lg">
                    <a href={`mailto:${SITE.email}`} className="text-black hover:text-black/60 transition-colors flex items-center gap-3">
                      <span>{SITE.email}</span>
                    </a>
                    <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-black/60 transition-colors flex items-center gap-3">
                      <span>{SITE.phoneDisplay}</span>
                      <span className="text-sm text-black/50">(WhatsApp)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <h3 className="font-display text-3xl text-black">Send a Message</h3>

                <div className="space-y-6">
                  <label className="block">
                    <span className="text-sm font-mono uppercase tracking-widest text-black/60 mb-3 block">
                      Your Name
                    </span>
                    <input
                      type="text"
                      placeholder="Full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-black/20 py-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-lg"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-mono uppercase tracking-widest text-black/60 mb-3 block">
                      Email Address
                    </span>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-black/20 py-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-lg"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-mono uppercase tracking-widest text-black/60 mb-3 block">
                      Inquiry Type
                    </span>
                    <select
                      className="w-full bg-transparent border-b-2 border-black/20 py-4 text-black focus:outline-none focus:border-black transition-colors text-lg"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                    >
                      <option value="collaboration">Collaboration</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="press">Press Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-mono uppercase tracking-widest text-black/60 mb-3 block">
                      Message
                    </span>
                    <textarea
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-black/20 py-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors resize-none text-lg"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-black/90 transition-all duration-300 text-lg"
                >
                  Send via WhatsApp
                </button>
                <p className="text-sm text-black/50 text-center -mt-4">
                  Opens WhatsApp with your message pre-filled — or email us at{" "}
                  <a href={`mailto:${SITE.email}`} className="underline hover:text-black">{SITE.email}</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}