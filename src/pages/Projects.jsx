import { motion } from "framer-motion";
import BackButton from "../components/BackButton.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/portfolio.js";

export default function Projects({ onNavigate, onSelectProject }) {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:py-12">
      <BackButton onClick={() => onNavigate("home")} />

      <header className="mt-10 max-w-3xl">
        <motion.h1
          className="text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          Projects
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-base leading-8 text-text-muted sm:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          A focused collection of websites, Webflow builds, mobile apps, and front-end
          projects built for clear structure, responsive behavior, and polished presentation.
        </motion.p>
      </header>

      <section className="mt-10 grid items-stretch gap-5 md:grid-cols-8 lg:grid-cols-12 lg:gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            onSelect={onSelectProject}
            variant="showcase"
            isFeatured={index < 2}
            key={project.id}
          />
        ))}
      </section>
    </main>
  );
}
