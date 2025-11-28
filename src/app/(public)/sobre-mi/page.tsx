import { About } from "@/components/about/About";
import { Experience } from "@/components/about/Experience";

export const metadata = {
  title: "Sobre Mí | Mateo Gaviraghi",
  description:
    "Conoce más sobre mi trayectoria, experiencia y pasión por el desarrollo de software.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <About />
      <Experience />
    </div>
  );
}
