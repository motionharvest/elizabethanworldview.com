import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteName = "Shakespeare's World";
const siteDescription =
  "A landing page for Shakespeare's World: Seeing the Plays Through Elizabethan Eyes, featuring an interactive Three.js celestial spheres motif.";
const siteUrl = "https://elizabethanworldview.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [{ url: "/images/cover.jpg", width: 540, height: 810 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/images/cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      {/* Browser extensions (ColorZilla, Grammarly, …) inject attributes on
          <body> before hydration; ignore those attribute diffs. */}
      <body suppressHydrationWarning>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
