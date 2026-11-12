import styles from "./About.module.css";

export const meta = () => [{ title: "About — Bjorn Tanamal" }];

export default function About() {
  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <div className={styles.intro}>
        <header className={styles.heading}>
          <h1>ABOUT ME.</h1>
          <p>
            A closer look at who I am, how I work, and what drives me as a
            developer.
          </p>
        </header>
        <div className={styles.profile}>
          <img
            className={styles.portrait}
            src="/images/bjorn-portrait.jpg"
            width="853"
            height="1280"
            alt="Bjorn Tanamal in graduation attire"
          />
          <div className={styles.bio}>
            <h2>Hi, I'm Bjorn.</h2>
            <p>
              I'm a junior front-end developer based in the Philippines. I build
              responsive, user-focused websites by bridging design and code,
              turning ideas into clean, functional, and visually engaging
              experiences.
            </p>
            <p className={styles.approach}>
              I enjoy taking a design from Figma and bringing it to life on the
              web. I focus on structure, spacing, and interaction, with the goal
              of creating websites that feel intentional, easy to use, and
              connected to real goals.
            </p>
            <a
              className={styles.download}
              href="/Bjorn-Tanamal-Resume.pdf"
              download="Bjorn-Tanamal-Resume.pdf"
            >
              DOWNLOAD RÉSUMÉ <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
      <section className={styles.statement} aria-label="Personal statement">
        <h2>
          <span>Skills? I have them.</span>{" "}
          <strong>
            I just need an opportunity <br />
            to show it.
          </strong>
        </h2>
      </section>
    </main>
  );
}
