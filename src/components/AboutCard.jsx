import { Code2, UserRound } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import SectionIcon from "./SectionIcon.jsx";

export default function AboutCard({ capabilities }) {
  return (
    <GlassCard
      as="section"
      className="flex flex-col justify-between p-7 sm:p-8 md:col-span-4 lg:col-span-4"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      aria-labelledby="about-title"
    >
      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="about-title" className="flex items-center gap-3 text-2xl font-bold text-white">
            <SectionIcon>
              <UserRound size={21} aria-hidden="true" />
            </SectionIcon>
            About Me
          </h2>
          <Code2 className="text-white/35" size={20} aria-hidden="true" />
        </div>
        <p className="text-base leading-7 text-text-muted">
          Frontend developer focused on the logic behind the design. I build fast,
          maintainable websites with clean structure, reliable responsive behavior, and
          client-friendly handoff.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {capabilities.map((item) => (
          <div
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
            key={item.title}
          >
            <h3 className="text-sm font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
