import { ArrowUpRight, ExternalLink, Github, Images } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import Tag from "./Tag.jsx";

const layoutClasses = {
  feature: "min-h-[430px] md:col-span-8 lg:col-span-7",
  tall: "min-h-[430px] md:col-span-8 lg:col-span-5",
  compact: "min-h-[360px] md:col-span-4 lg:col-span-4",
};

function ProjectLinks({ project }) {
  if (!project.liveUrl && !project.sourceUrl) {
    return (
      <div className="mt-auto pt-8">
        <span className="glass-button inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white transition group-hover:border-white/25">
          View screenshots
          <Images size={16} aria-hidden="true" />
        </span>
      </div>
    );
  }

  return (
    <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className={`inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-abyss transition hover:scale-[1.02] hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/70 ${
            project.sourceUrl ? "" : "sm:col-span-2"
          }`}
        >
          Live demo
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      ) : null}

      {project.sourceUrl ? (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="glass-button inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/70"
        >
          Source code
          <Github size={16} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

export default function ProjectCard({ project, onSelect, id, variant = "home", isFeatured = false }) {
  const isFeature = project.layout === "feature" || project.layout === "tall";

  if (variant === "showcase") {
    const handleKeyDown = (event) => {
      if (event.target.closest("a")) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect(project);
      }
    };

    return (
      <GlassCard
        as="article"
        role="button"
        tabIndex={0}
        className={`group flex h-full cursor-pointer flex-col overflow-hidden p-0 text-left ${
          isFeatured ? "md:col-span-4 lg:col-span-6" : "md:col-span-4 lg:col-span-4"
        }`}
        onClick={() => onSelect(project)}
        onKeyDown={handleKeyDown}
        whileHover={{ y: -4, scale: 1.003 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.25 }}
        aria-label={`Open project details for ${project.title}`}
      >
        <div className={`relative shrink-0 overflow-hidden bg-abyss ${isFeatured ? "h-64 lg:h-72" : "h-56 lg:h-64"}`}>
          <img
            src={project.image}
            alt={`${project.shortTitle} website preview`}
            className="h-full w-full object-cover object-top opacity-[0.82] brightness-[0.9] saturate-[0.9] transition duration-700 group-hover:scale-[1.035] group-hover:opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/35 to-black/20" />
        </div>

        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-tertiary/25 bg-tertiary/10 px-3 py-1 text-xs font-bold text-tertiary">
                {project.status}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-text-muted">
                {project.category}
              </span>
            </div>

            <h2 className="text-3xl font-black text-white">{project.shortTitle}</h2>
            <p className="mt-4 text-base leading-7 text-text-muted">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech, index) => (
                <Tag tone={index < 2 ? "primary" : "neutral"} key={tech}>
                  {tech}
                </Tag>
              ))}
            </div>

            <div className="mt-7">
              <h3 className="text-sm font-black text-white">Key features</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                {project.features.slice(0, 3).map((feature) => (
                  <li className="flex gap-3" key={feature}>
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ProjectLinks project={project} />
        </div>
      </GlassCard>
    );
  }

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

      <div className="flex flex-1 flex-col justify-between gap-8 p-7 sm:p-8">
        <div className="relative z-10">
          <div className="mb-6 flex flex-wrap gap-2.5">
            <span className="rounded-full border border-tertiary/25 bg-tertiary/10 px-3 py-1 text-xs font-bold text-tertiary">
              {project.status}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-text-muted">
              {project.category}
            </span>
          </div>
          <h3 className="text-2xl font-black leading-tight text-white">{project.shortTitle}</h3>
          <p className="mt-5 line-clamp-2 text-sm leading-6 text-text-muted">
            {project.description}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2.5">
          {project.stack.slice(0, 3).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
