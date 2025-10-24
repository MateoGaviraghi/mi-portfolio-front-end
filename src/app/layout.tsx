import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tu Nombre - Full Stack Developer",
    template: "%s | Tu Nombre - Full Stack Developer",
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
  authors: [{ name: "Tu Nombre" }],
  creator: "Tu Nombre",
  publisher: "Tu Nombre",
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
    title: "Tu Nombre - Full Stack Developer",
    description: "Portfolio profesional de desarrollo Full Stack con AI",
    siteName: "Tu Nombre Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu Nombre - Full Stack Developer",
    description: "Portfolio profesional de desarrollo Full Stack con AI",
    creator: "@tu_username",
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
  return <>{children}</>;
}
