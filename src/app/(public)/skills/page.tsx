import { SkillsSection } from "@/components/skills/SkillsSection";

export const metadata = {
  title: "Habilidades | Mateo Gaviraghi",
  description:
    "Explora mis habilidades técnicas en desarrollo frontend, backend y devops.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-20">
      <SkillsSection />
    </div>
  );
}
