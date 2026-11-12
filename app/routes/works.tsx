import { Link } from "react-router";
import { projects } from "../projects";
import styles from "./Works.module.css";

export const meta = () => [{ title: "Works — Bjorn Tanamal" }];

export default function Works() {
  return (
    <main className={styles.page} id="main" tabIndex={-1}>
      <header className={styles.opening}>
        <h1 aria-label="Works">WORKS</h1>
        <p>A collection of websites and interfaces I've worked on.</p>
      </header>
      <section className={styles.gallery} aria-label="Project collection">
        {projects.map(({ title, category, image, href }) => (
          <a
            key={title}
            className={styles.card}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-description="Opens in a new tab"
          >
            <div className={styles.frame}>
              <img
                src={image}
                alt={`Screenshot of ${title} website`}
                loading="lazy"
              />
            </div>
            <div className={styles.caption}>
              <div>
                <h2>{title}</h2>
                <p>{category}</p>
              </div>
              <span>Live Site ↗</span>
            </div>
          </a>
        ))}
      </section>
      <section className={styles.invitation} aria-labelledby="works-contact">
        <h2 id="works-contact">Have a project in mind?</h2>
        <Link to="/contact">Get in touch ↗</Link>
      </section>
    </main>
  );
}
