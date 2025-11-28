import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthInitializer } from "@/components/AuthInitializer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Mateo Gaviraghi - Full Stack Developer",
    template: "%s | Mateo Gaviraghi",
  },
  description:
    "Portfolio profesional de desarrollo Full Stack con AI. Especialista en Next.js, NestJS, TypeScript y tecnologías modernas.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "NestJS",
    "TypeScript",
    "React",
    "Node.js",
    "AI Development",
    "Portfolio",
  ],
  authors: [{ name: "Mateo Gaviraghi" }],
  creator: "Mateo Gaviraghi",
  publisher: "Mateo Gaviraghi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    title: "Mateo Gaviraghi - Full Stack Developer",
    description: "Portfolio profesional de desarrollo Full Stack con AI",
    siteName: "Mateo Gaviraghi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateo Gaviraghi - Full Stack Developer",
    description: "Portfolio profesional de desarrollo Full Stack con AI",
    creator: "@mateogaviraghi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased bg-slate-950`}>
        <AuthInitializer>{children}</AuthInitializer>
      </body>
    </html>
  );
}
