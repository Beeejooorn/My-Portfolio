import { useRef } from "react";
import { projects } from "../projects";
import { Link } from "react-router";
import { ProjectPreview } from "../components/ProjectPreview";
import styles from "./Home.module.css";

export const meta = () => [
  { title: "Bjorn Tanamal — Frontend Developer" },
  {
    name: "description",
    content:
      "Bjorn Tanamal, a junior front-end developer based in the Philippines, working across design and code.",
  },
];

export default function Page() {
  const projectList = useRef<HTMLUListElement>(null);
  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.container}>
          <p className={styles.introduction}>I am Bjorn Tanamal</p>
          <h1
            id="hero-title"
            className={styles.headline}
            aria-label="FRONTEND DEVELOPER"
          >
            <span>FRONTEND</span> <span>DEVELOPER</span>
          </h1>
        </div>
      </section>

      <section className={styles.work} aria-labelledby="selected-work-title">
        <div className={styles.container}>
          <h2 id="selected-work-title" className={styles.workHeading}>
            Selected Work.
          </h2>
          <p className={styles.workIntroduction}>
            Candidate projects · inclusion and order pending review.
          </p>
          <p id="project-link-note" className={styles.screenReaderOnly}>
            Project links open in a new tab.
          </p>
          <ul
            ref={projectList}
            className={styles.projectList}
            aria-label="Selected projects"
          >
            {projects.map((project, index) => (
              <li key={project.href}>
                <a
                  className={styles.project}
                  data-preview-index={index}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="project-link-note"
                >
                  <span className={styles.projectNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.projectTitle}>{project.title}</span>
                  <span className={styles.projectCategory}>
                    {project.category}
                  </span>
                  <span className={styles.projectAction} aria-hidden="true">
                    View Project ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ProjectPreview list={projectList} projects={projects} />
          <Link to="/works" className={styles.textLink}>
            View all projects ↗
          </Link>
        </div>
      </section>

      <section className={styles.about} aria-labelledby="home-about-title">
        <div className={styles.container}>
          <h2 id="home-about-title" className={styles.aboutHeading}>
            ABOUT
          </h2>
          <div className={styles.aboutBody}>
            <dl className={styles.metadata}>
              <div>
                <dt>Based in</dt>
                <dd>Philippines</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Front-end Development</dd>
              </div>
            </dl>
            <div className={styles.aboutIntroduction}>
              <p>
                I'm Bjorn, a junior front-end developer working across design
                and code. I use Figma to explore layouts and build responsive
                websites in the browser, paying attention to navigation,
                spacing, and interaction.
              </p>
              <Link to="/about" className={styles.aboutLink}>
                More about me ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="home-contact-title">
        <div className={styles.container}>
          <h2 id="home-contact-title" className={styles.contactHeading}>
            <Link to="/contact">
              GET IN TOUCH <span aria-hidden="true">↗</span>
            </Link>
          </h2>
          <p className={styles.contactCopy}>
            Have a project in mind? Let’s talk.
          </p>
          <p className={styles.contactPending}>
            Contact destinations pending confirmation.
          </p>
        </div>
      </section>
    </main>
  );
}
