import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

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

export const Route = createRootRoute({
  head: () => ({
    title: "Blinkit Showcase",
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // SEO
      { name: "description", content: "Blinkit Showcase — Instant Delivery, reimagined." },
      { name: "theme-color", content: "#D7FF00" },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Blinkit Showcase" },
      { property: "og:description", content: "Premium Blinkit-inspired instant delivery experience." },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Blinkit_in" },
      { name: "twitter:title", content: "Blinkit Showcase" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },

      // MAIN FAVICON (put favicon.ico inside /public)
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },

      // PNG favicon
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/blinkit-favicon-32x32.png",
      },

      // Apple icon
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },

      // Manifest
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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
  return <Outlet />;
}