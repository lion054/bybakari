import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart-context";
import { FabChat } from "@/components/fab-chat";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

type RootRouteContext = { queryClient: QueryClient };

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { httpEquiv: "x-ua-compatible", content: "IE=edge" },
      { name: "theme-color", content: "#000000" },
      { name: "mobile-web-app-capable", content: "yes" },

      // SEO Core
      { name: "description", content: "Discover premium African fashion & cultural heritage. #byBakari features the MOSI signature print inspired by Victoria Falls, handcrafted pieces, and authentic artisanal collections from Zimbabwe." },
      { name: "keywords", content: "African fashion, luxury clothing, MOSI print, Victoria Falls design, Zimbabwe fashion, cultural heritage, artisanal craftsmanship, premium African brands, African designer, Harare fashion" },
      { name: "author", content: "Bakari Sibanda" },
      { name: "creator", content: "#byBakari" },
      { name: "publisher", content: "#byBakari" },

      // Open Graph for Social Sharing
      { property: "og:site_name", content: "#byBakari" },
      { property: "og:type", content: "business.business" },
      { property: "og:title", content: "#byBakari | Premium African Fashion & MOSI Signature Print" },
      { property: "og:description", content: "Celebrate African artistry with #byBakari. Discover the MOSI signature print inspired by Victoria Falls and authentic artisanal collections from Zimbabwe." },
      { property: "og:image", content: "https://bybakari.com/bybakari/banner.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://bybakari.com/" },
      { property: "og:locale", content: "en_US" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@by_BAKARI" },
      { name: "twitter:creator", content: "@by_BAKARI" },
      { name: "twitter:title", content: "#byBakari | Premium African Fashion & MOSI Signature Print" },
      { name: "twitter:description", content: "Celebrate African artistry with #byBakari. Discover the MOSI signature print inspired by Victoria Falls." },
      { name: "twitter:image", content: "https://bybakari.com/bybakari/banner.png" },

      // Local Business Schema
      { name: "business:contact_data:street_address", content: "76 Robert Mugabe Rd" },
      { name: "business:contact_data:locality", content: "Harare" },
      { name: "business:contact_data:region", content: "Zimbabwe" },
      { name: "business:contact_data:postal_code", content: "ZW" },
      { name: "business:contact_data:country_name", content: "Zimbabwe" },

      // Geo Tags
      { name: "geo.placename", content: "Harare, Zimbabwe" },
      { name: "geo.position", content: "-17.8252;31.0335" },
      { name: "ICBM", content: "-17.8252, 31.0335" },

      // Apple Touch Icon
      { name: "apple-mobile-web-app-title", content: "#byBakari" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },

      // SEO Robots
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "format-detection", content: "telephone=no" },
      { name: "bingbot", content: "index, follow" },

      // PWA
      { name: "application-name", content: "#byBakari" },
      { name: "msapplication-config", content: "/browserconfig.xml" },
      { name: "msapplication-TileColor", content: "#000000" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // DNS Prefetch for Performance & SEO (signals good UX)
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },

      // Preconnect for Critical Fonts
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },

      // Font Loading
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },

      // Icons
      { rel: "icon", href: "/bybakari/logo.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/bybakari/logo.png" },
      { rel: "manifest", href: "/manifest.json" },

      // Sitemap
      { rel: "sitemap", href: "https://bybakari.com/sitemap.xml", type: "application/xml" },

      // Social Links for SEO Trust
      { rel: "me", href: "https://www.instagram.com/by_bakari/" },
      { rel: "me", href: "https://twitter.com/by_BAKARI" },
      { rel: "me", href: "https://www.facebook.com/by_bakari-100308721531076" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <FabChat />
        <Toaster position="bottom-center" />
      </CartProvider>
    </QueryClientProvider>
  );
}
