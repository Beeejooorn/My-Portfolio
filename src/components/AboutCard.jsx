import { SquareArrowOutUpRight, UserRound } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import SectionIcon from "./SectionIcon.jsx";

export default function AboutCard({ onOpen }) {
  return (
    <GlassCard
      as="button"
      type="button"
      onClick={onOpen}
      className="group flex cursor-pointer flex-col p-7 text-left sm:p-8 md:col-span-4 lg:col-span-4 lg:row-span-2"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      aria-labelledby="about-title"
      aria-label="Open more information about Bjorn"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
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

        <div className="flex flex-1 items-center py-10">
          <p className="max-w-[32rem] text-base leading-8 text-text-muted">
            I handle the design and development side of responsive websites, from Figma
            planning to front-end builds and Webflow delivery.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
          <p className="font-mono text-xs font-bold uppercase text-primary">Focus</p>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Clear layouts, responsive behavior, CMS-ready structure, and client feedback
            revisions.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
