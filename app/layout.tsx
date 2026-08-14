import type { Metadata } from "next";
import { Outfit, Cormorant } from "next/font/google";

import { DuskField } from "@/components/fx/dusk-field";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { TypewriterProvider } from "@/components/fx/use-typewriter-name";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skylersmith.me"),
  title: {
    default: "Skyler Smith Portfolio | AI, Product, and Software Projects",
    template: "%s | Skyler Smith Portfolio",
  },
  description:
    "Explore the Skyler Smith portfolio featuring AI products, software projects, case studies, and business-minded product work.",
  keywords: [
    "Skyler Smith",
    "Skyler Smith Portfolio",
    "Skyler Smith projects",
    "AI portfolio",
    "product portfolio",
    "software projects",
  ],
  authors: [{ name: "Skyler Smith", url: "https://skylersmith.me" }],
  creator: "Skyler Smith",
  publisher: "Skyler Smith",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://skylersmith.me",
    siteName: "Skyler Smith Portfolio",
    title: "Skyler Smith Portfolio | AI, Product, and Software Projects",
    description:
      "Explore the Skyler Smith portfolio featuring AI products, software projects, case studies, and business-minded product work.",
    images: [
      {
        url: "/images/about/skylerbeach.JPG",
        alt: "Skyler Smith portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyler Smith Portfolio | AI, Product, and Software Projects",
    description:
      "Explore the Skyler Smith portfolio featuring AI products, software projects, case studies, and business-minded product work.",
    images: ["/images/about/skylerbeach.JPG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${cormorant.variable} relative antialiased`}>
        <DuskField />
        <ScrollProgress />
        <div className="noise-overlay" aria-hidden />
        <div className="relative z-10">
          <TypewriterProvider>{children}</TypewriterProvider>
        </div>
      </body>
    </html>
  );
}
