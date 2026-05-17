import { ArrowRight, Download } from "lucide-react";
import GlassCard from "./GlassCard.jsx";

export default function HeroCard({ profile, onViewProjects }) {
  return (
    <GlassCard
      as="section"
      className="relative flex min-h-[430px] min-w-0 flex-col justify-between overflow-hidden p-7 sm:p-9 lg:col-span-8 lg:row-span-2 lg:min-h-[468px]"
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

      <div className="relative z-10 max-w-4xl">
        <h1
          id="hero-title"
          className="max-w-[760px] text-[2.18rem] font-black leading-[1.06] text-white sm:text-6xl lg:text-[4.35rem]"
        >
          <span className="block sm:inline">Building the</span>
          <span className="block sm:inline"> future,</span>
          <br />
          <span>
            <span className="text-gradient block sm:inline">one line of code</span>
            <span className="text-gradient block sm:inline"> at a time</span>
          </span>
        </h1>

        <div className="mt-7 flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap">
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
      </div>
    </GlassCard>
  );
}
