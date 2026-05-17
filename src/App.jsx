import { useEffect, useState } from "react";
import AboutCard from "./components/AboutCard.jsx";
import ContactCard from "./components/ContactCard.jsx";
import ExperienceCard from "./components/ExperienceCard.jsx";
import HeroCard from "./components/HeroCard.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import SkillsCard from "./components/SkillsCard.jsx";
import {
  experience,
  profile,
  projects,
  skills,
  socialLinks,
} from "./data/portfolio.js";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="site-ambient" aria-hidden="true" />
      <main className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 md:grid-cols-8 md:gap-6 lg:grid-cols-12 lg:py-12">
        <HeroCard profile={profile} onViewProjects={handleViewProjects} />
        <AboutCard />
        <SkillsCard skills={skills} />

        {projects.slice(0, 2).map((project, index) => (
          <ProjectCard
            id={index === 0 ? "projects" : undefined}
            project={project}
            onSelect={setSelectedProject}
            key={project.id}
          />
        ))}

        <ExperienceCard experience={experience} />
        <ContactCard profile={profile} socialLinks={socialLinks} />
      </main>
      <SiteFooter socialLinks={socialLinks} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
