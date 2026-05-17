import { BriefcaseBusiness } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import SectionIcon from "./SectionIcon.jsx";

export default function ExperienceCard({ experience }) {
  return (
    <GlassCard
      as="section"
      className="p-7 sm:p-8 md:col-span-8 lg:col-span-7"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className="flex items-center gap-3 text-2xl font-bold text-white">
        <SectionIcon tone="tertiary">
          <BriefcaseBusiness size={21} aria-hidden="true" />
        </SectionIcon>
        Experience
      </h2>

      <div className="mt-8 space-y-7">
        {experience.map((item, index) => (
          <article className="relative border-l border-white/10 pl-7" key={item.title}>
            <span
              className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full ${
                index === 0 ? "bg-tertiary shadow-[0_0_14px_rgba(78,222,163,0.7)]" : "bg-white/25"
              }`}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{item.place}</p>
              </div>
              <span className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-xs text-white/55">
                {item.period}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">{item.detail}</p>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}
