import { ArrowRight, Download } from "lucide-react";
import GlassCard from "./GlassCard.jsx";

export default function HeroCard({ profile, onViewProjects }) {
  return (
    <GlassCard
      as="section"
      className="relative flex min-h-[430px] min-w-0 flex-col justify-between gap-8 overflow-hidden p-7 sm:p-9 lg:col-span-8 lg:row-span-2 lg:min-h-[468px]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-tertiary/5 opacity-80" />

      <div className="relative z-10 flex items-center gap-4">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} profile`}
            className="h-20 w-20 rounded-full border border-white/15 object-cover shadow-glass"
          />
        ) : (
          <div
            className="avatar-placeholder h-20 w-20 rounded-full border border-white/15 shadow-glass"
            aria-label="Profile image placeholder"
          />
        )}
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-tertiary">
            <span className="relative h-3 w-3 rounded-full bg-tertiary shadow-[0_0_18px_rgba(78,222,163,0.75)]">
              <span className="absolute inset-0 rounded-full bg-tertiary/70 motion-safe:animate-ping" />
            </span>
            {profile.availability}
          </p>
          <p className="mt-1 text-base text-text-muted">{profile.name}</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center">
        <h1
          id="hero-title"
          className="max-w-[780px] text-[2.28rem] font-black leading-[1.08] text-white sm:text-[3rem] lg:text-[3.42rem] xl:text-[3.58rem]"
        >
          <span className="block sm:inline">Clean Webflow</span>
          <span className="block sm:inline"> builds.</span>
          <br />
          <span>
            <span className="text-gradient inline-block">Responsive front-end.</span>
            <span className="text-gradient inline-block"> Client-ready handoff.</span>
          </span>
        </h1>
      </div>

      <div className="relative z-10 flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onViewProjects}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-abyss shadow-[0_0_30px_rgba(255,255,255,0.16)] transition duration-300 hover:scale-[1.03] hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/70 sm:w-auto"
        >
          <span>View projects</span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
        <a
          href={profile.cvPath}
          download
          className="glass-button inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-primary/70 sm:w-auto"
        >
          <span>Download CV</span>
          <Download size={18} aria-hidden="true" />
        </a>
      </div>
    </GlassCard>
  );
}
