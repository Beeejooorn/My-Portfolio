import { SquareArrowOutUpRight, UserRound } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import SectionIcon from "./SectionIcon.jsx";

export default function AboutCard({ onOpen }) {
  return (
    <GlassCard
      as="button"
      type="button"
      onClick={onOpen}
      className="group flex cursor-pointer flex-col justify-between p-7 text-left sm:p-8 md:col-span-4 lg:col-span-4"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      aria-labelledby="about-title"
      aria-label="Open more information about Bjorn"
    >
      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="about-title" className="flex items-center gap-3 text-2xl font-bold text-white">
            <SectionIcon>
              <UserRound size={21} aria-hidden="true" />
            </SectionIcon>
            About Me
          </h2>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.055] text-white/45 transition group-hover:bg-white/[0.09] group-hover:text-white/75">
            <SquareArrowOutUpRight size={15} aria-hidden="true" />
          </span>
        </div>
        <p className="text-base leading-7 text-text-muted">
         I build Webflow and front-end websites with clean structure, responsive layouts, 
         and logic that holds up after launch. My focus is simple: fast pages, 
         maintainable builds, and handoff clients can actually use.
        </p>
      </div>
    </GlassCard>
  );
}
