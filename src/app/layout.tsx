import type { Metadata } from "next";
import { Outfit, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-quote",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A New Era of Science | UMHB Science Facility",
  description:
    "University of Mary Hardin-Baylor is building a new 56,000 sq ft, three-story science facility. Explore the vision and discover naming opportunities.",
  openGraph: {
    title: "A New Era of Science | UMHB",
    description:
      "A new 56,000 sq ft science facility for the University of Mary Hardin-Baylor. Opening January 2028.",
    images: ["/images/renderings/east-corner.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A New Era of Science | UMHB",
    description:
      "A new 56,000 sq ft science facility for UMHB. Opening January 2028.",
    images: ["/images/renderings/east-corner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${dmSans.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
