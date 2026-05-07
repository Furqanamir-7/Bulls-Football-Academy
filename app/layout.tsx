import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ContactFloat } from "@/components/site/whatsapp-float";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bullsfc.site"),
  title: "BULLS FOOTBALL ACADEMY",
  description:
    "BULLS FOOTBALL ACADEMY - WE LEAD BY EXAMPLE. NOT BY WORDS. Elite coaching programs, centres, and international football tours.",
  keywords: [
    "football academy",
    "soccer training",
    "BULLS FOOTBALL ACADEMY",
    "youth football",
    "professional coaching",
  ],
  openGraph: {
    title: "BULLS FOOTBALL ACADEMY",
    description: "WE LEAD BY EXAMPLE. NOT BY WORDS.",
    type: "website",
    images: [{ url: "/og-image.png", alt: "BULLS Football Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BULLS FOOTBALL ACADEMY",
    description: "WE LEAD BY EXAMPLE. NOT BY WORDS.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.png?v=3", type: "image/png" }],
    apple: [{ url: "/apple-icon.png?v=3", type: "image/png", sizes: "180x180" }],
    shortcut: "/icon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full text-white antialiased">
        <Navbar />
        <main className="site-main pt-20 text-zinc-900" data-page-theme="light">
          {children}
        </main>
        <ContactFloat />
        <Footer />
      </body>
    </html>
  );
}
