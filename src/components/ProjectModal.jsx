import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import Tag from "./Tag.jsx";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.article
            className="glass-card max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem]"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            aria-modal="true"
            role="dialog"
            aria-labelledby="project-modal-title"
          >
            <div className="relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-xl transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/70"
                aria-label="Close project details"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <div className="relative border-b border-white/10 bg-black/20 p-4 sm:p-6">
                <div className="max-h-[58vh] overflow-y-auto rounded-3xl border border-white/10 bg-abyss">
                  <img
                    src={project.image}
                    alt={`${project.shortTitle} full website screenshot`}
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-tertiary/25 bg-tertiary/10 px-3 py-1 text-xs font-bold text-tertiary">
                      {project.status}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-text-muted">
                      {project.category}
                    </span>
                  </div>
                  <h2 id="project-modal-title" className="text-3xl font-black text-white sm:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-text-muted">{project.description}</p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-abyss transition hover:scale-[1.02] hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/70"
                      >
                        Live demo
                        <ExternalLink size={17} aria-hidden="true" />
                      </a>
                    ) : null}

                    {project.sourceUrl ? (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/70"
                      >
                        Source code
                        <Github size={17} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-7">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white/70">Tech stack</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((tech, index) => (
                        <Tag tone={index < 2 ? "primary" : "neutral"} key={tech}>
                          {tech}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase text-white/70">Key features</h3>
                    <ul className="mt-3 space-y-3 text-sm leading-6 text-text-muted">
                      {project.features.map((feature) => (
                        <li className="flex gap-3" key={feature}>
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-tertiary shadow-[0_0_12px_rgba(78,222,163,0.6)]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
