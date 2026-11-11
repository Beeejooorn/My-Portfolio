import { SocialIcon } from "./SocialIcon";
import styles from "./Footer.module.css";
const platforms = ["Gmail", "Instagram", "Threads", "LinkedIn"] as const;
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.name}>BJORN TANAMAL</span>
        <ul
          className={styles.socials}
          aria-label="Social profiles; destinations pending confirmation"
        >
          {platforms.map((name) => (
            <li key={name}>
              <SocialIcon name={name} />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
