import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const samsungBrowserGuardScript = `(() => {
  const ua = navigator.userAgent || "";
  const isSamsungInternet = /SamsungBrowser/i.test(ua);

  document.write(
    isSamsungInternet
      ? '<meta data-browser-color-scheme="samsung" name="color-scheme" content="dark only"><meta data-browser-color-scheme="samsung" name="supported-color-schemes" content="dark">'
      : '<meta data-browser-color-scheme="default" name="color-scheme" content="only light"><meta data-browser-color-scheme="default" name="supported-color-schemes" content="light">',
  );

  if (!isSamsungInternet) return;

  const doc = document.documentElement;
  doc.setAttribute("data-samsung-internet", "true");

  const detectSamsungDark = () => {
    try {
      const bg = getComputedStyle(document.body || document.documentElement).backgroundColor;
      const m = bg.match(/\\d+/g);
      if (!m) return false;
      const [r, g, b] = m.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    } catch (e) {
      return false;
    }
  };

  const updateDarkFlag = () => {
    const isDark = detectSamsungDark() || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      doc.setAttribute("data-samsung-dark", "true");
      document.querySelectorAll("img, picture, video, canvas").forEach((el) => {
        el.style.setProperty("display", "none", "important");
      });
    } else {
      doc.removeAttribute("data-samsung-dark");
    }
  };

  const lockSamsungStyles = () => {
    const setImportant = (element, property, value) => {
      if (!element) return;
      element.style.setProperty(property, value, "important");
    };

    const surfaceSelectors = "body, #app-shell, main, section, footer, header, article, [class*='bg-background'], [class*='bg-card']";
    const textSelectors = "h1, h2, h3, h4, h5, h6, p, span, a, li, strong, em, small, label, button, input, textarea";
    const accentSelectors = "[class*='text-[var(--claret'], [class*='text-[#6b1a1f'], .lucide-phone";

    setImportant(document.documentElement, "background-color", "#F5EFE3");
    setImportant(document.documentElement, "color", "#433329");
    setImportant(document.documentElement, "color-scheme", "light");
    setImportant(document.documentElement, "forced-color-adjust", "none");

    document.querySelectorAll(surfaceSelectors).forEach((element) => {
      setImportant(element, "background-color", "#F5EFE3");
      setImportant(element, "background-image", "none");
      setImportant(element, "color", "#433329");
      setImportant(element, "-webkit-text-fill-color", "#433329");
      setImportant(element, "color-scheme", "light");
      setImportant(element, "forced-color-adjust", "none");
    });

    document.querySelectorAll(textSelectors).forEach((element) => {
      setImportant(element, "color", "#433329");
      setImportant(element, "-webkit-text-fill-color", "#433329");
      setImportant(element, "text-decoration-color", "#433329");
      setImportant(element, "caret-color", "#433329");
    });

    document.querySelectorAll(accentSelectors).forEach((element) => {
      setImportant(element, "color", "#6b1a1f");
      setImportant(element, "-webkit-text-fill-color", "#6b1a1f");
      setImportant(element, "text-decoration-color", "#6b1a1f");
    });

    document.querySelectorAll("svg, svg *, [stroke], [fill]").forEach((element) => {
      setImportant(element, "stroke", "currentColor");
      setImportant(element, "fill", "currentColor");
    });

    document.querySelectorAll("img, picture, video, canvas").forEach((element) => {
      const keepCustomDarkTreatment = element instanceof HTMLElement && element.dataset.allowSamsungFilter === "true";

      if (keepCustomDarkTreatment) {
        setImportant(element, "background-color", "transparent");
        return;
      }

      setImportant(element, "filter", "none");
      setImportant(element, "mix-blend-mode", "normal");
      setImportant(element, "background-color", "transparent");
    });
  };

  const runLocks = () => {
    lockSamsungStyles();
    updateDarkFlag();
    requestAnimationFrame(lockSamsungStyles);
    requestAnimationFrame(updateDarkFlag);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runLocks, { once: true });
  } else {
    runLocks();
  }

  new MutationObserver(runLocks).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();`;

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
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#F5EFE3" },
      { title: "Irina & Alex — 09.08.2026" },
      { name: "description", content: "Irina & Alex se căsătoresc. 9 august 2026. Palatul Noblesse." },
      { name: "author", content: "Irina & Alex" },
      { property: "og:title", content: "Irina & Alex — 09.08.2026" },
      { property: "og:description", content: "Irina & Alex se căsătoresc. 9 august 2026. Palatul Noblesse." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Irina & Alex — 09.08.2026" },
      { name: "twitter:description", content: "Irina & Alex se căsătoresc. 9 august 2026. Palatul Noblesse." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/793a3341-5f88-4df6-9844-f1b4b65e3bde/id-preview-b7d2d8c3--38d126e6-c0d5-4689-8f27-9d468ced3256.lovable.app-1777843739416.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/793a3341-5f88-4df6-9844-f1b4b65e3bde/id-preview-b7d2d8c3--38d126e6-c0d5-4689-8f27-9d468ced3256.lovable.app-1777843739416.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "only light", backgroundColor: "#F5EFE3" }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: samsungBrowserGuardScript }} />
        <HeadContent />
      </head>
      <body style={{ backgroundColor: "#F5EFE3", color: "#433329" }}>
        <div id="app-shell">{children}</div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
