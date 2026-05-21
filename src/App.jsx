import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import { socialLinks } from "./data/portfolio.js";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";

const routes = new Set(["home", "about", "projects"]);

function getRouteFromHash() {
  const nextRoute = window.location.hash.replace(/^#\/?/, "").split("?")[0] || "home";
  return routes.has(nextRoute) ? nextRoute : "home";
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    let isCancelled = false;
    const minimumLoad = new Promise((resolve) => window.setTimeout(resolve, 1900));
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    Promise.all([minimumLoad, pageLoaded]).then(() => {
      if (!isCancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setRoute(getRouteFromHash());

    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  useEffect(() => {
    document.body.style.overflow = selectedProject || isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, isLoading]);

  const handleNavigate = (nextRoute) => {
    const normalizedRoute = routes.has(nextRoute) ? nextRoute : "home";
    setSelectedProject(null);
    window.location.hash = normalizedRoute === "home" ? "/" : `/${normalizedRoute}`;
  };

  const page = {
    home: <Home onNavigate={handleNavigate} onSelectProject={setSelectedProject} />,
    about: <About onNavigate={handleNavigate} />,
    projects: <Projects onNavigate={handleNavigate} onSelectProject={setSelectedProject} />,
  }[route];

  return (
    <>
      <div className="site-ambient" aria-hidden="true" />
      <LoadingScreen isVisible={isLoading} />
      <AnimatePresence mode="wait">
        <motion.div
          key={route}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
      <SiteFooter socialLinks={socialLinks} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
