import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "../providers";

export const metadata = {
  title: "Portfolio Profesional | Full Stack Developer",
  description:
    "Portfolio de desarrollador Full Stack especializado en Next.js, TypeScript y AI",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </Providers>
  );
}
