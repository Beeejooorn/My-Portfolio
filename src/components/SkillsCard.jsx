import { Layers3 } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import SectionIcon from "./SectionIcon.jsx";
import Tag from "./Tag.jsx";

export default function SkillsCard({ skills }) {
  return (
    <GlassCard
      as="section"
      className="flex flex-col p-7 sm:p-8 md:col-span-4 lg:col-span-4"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      aria-labelledby="skills-title"
    >
      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 id="skills-title" className="flex items-center gap-3 text-2xl font-bold text-white">
          <SectionIcon tone="secondary">
            <Layers3 size={21} aria-hidden="true" />
          </SectionIcon>
          Tech Stack
        </h2>
      </div>

      <div className="mt-auto flex flex-wrap gap-2.5">
        {skills.slice(0, 6).map((skill, index) => (
          <Tag tone={index < 4 ? "primary" : "neutral"} key={skill}>
            {skill}
          </Tag>
        ))}
      </div>
    </GlassCard>
  );
}
