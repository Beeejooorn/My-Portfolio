import { ArrowUpRight } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import Tag from "./Tag.jsx";

const layoutClasses = {
  feature: "min-h-[430px] md:col-span-8 lg:col-span-7",
  tall: "min-h-[430px] md:col-span-8 lg:col-span-5",
  compact: "min-h-[360px] md:col-span-4 lg:col-span-4",
};

export default function ProjectCard({ project, onSelect, id }) {
  const isFeature = project.layout === "feature" || project.layout === "tall";

  return (
    <GlassCard
      as="button"
      id={id}
      type="button"
      className={`group flex cursor-pointer flex-col overflow-hidden p-0 text-left ${layoutClasses[project.layout]}`}
      onClick={() => onSelect(project)}
      whileHover={{ y: -4, scale: 1.005 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      aria-label={`Open project details for ${project.title}`}
    >
      <div className={`relative w-full overflow-hidden ${isFeature ? "h-72" : "h-52"}`}>
        <img
          src={project.image}
          alt={`${project.shortTitle} website preview`}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.045]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
        <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/25 text-white opacity-0 backdrop-blur-xl transition duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
      </div>

      <div className="-mt-9 flex flex-1 flex-col justify-between p-7 sm:p-8">
        <div className="relative z-10">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-tertiary/25 bg-tertiary/10 px-3 py-1 text-xs font-bold text-tertiary">
              {project.status}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-text-muted">
              {project.category}
            </span>
          </div>
          <h3 className="text-2xl font-black leading-tight text-white">{project.shortTitle}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-muted">
            {project.description}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
