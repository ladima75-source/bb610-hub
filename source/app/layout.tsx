import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bb610.com.ua"),
  title: "BB610 — системи для сучасного вирощування",
  description:
    "Рішення, технології та професійні товари для сучасного вирощування. Garden, Water, Market та Berry.",
  keywords: ["BB610", "контейнерне вирощування", "автоматичний полив", "фертигація", "лохина"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "BB610 — вирощуємо, автоматизуємо, постачаємо",
    description: "Чотири спеціалізовані напрямки для сучасного вирощування в одній екосистемі.",
    url: "/",
    siteName: "BB610",
    locale: "uk_UA",
    type: "website",
    images: [{ url: "/media/og-bb610.jpg", width: 1200, height: 630, alt: "BB610" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BB610 — системи для сучасного вирощування",
    description: "Garden, Water, Market та Berry — в одній екосистемі.",
    images: ["/media/og-bb610.jpg"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased">{children}</body>
    </html>
  );
}
