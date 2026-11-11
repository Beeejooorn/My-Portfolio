import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useAnimate } from "motion/react-mini";
import { useLocation } from "react-router";
import styles from "./SmoothReveal.module.css";

export function SmoothReveal({ children }: { children: ReactNode }) {
  const { key } = useLocation();
  const [surface, animate] = useAnimate<HTMLDivElement>();
  const previousKey = useRef(key);
  const [announcement, setAnnouncement] = useState("");
  useLayoutEffect(() => {
    if (previousKey.current !== key) {
      setAnnouncement(
        `${document.querySelector("main h1")?.textContent ?? document.title} page`,
      );
      previousKey.current = key;
    }
    const element = surface.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let controls: ReturnType<typeof animate> | undefined;
    let active = true;
    const clear = () => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    };
    const stop = () => {
      controls?.stop();
      controls?.cancel();
      clear();
    };
    const changed = () => {
      if (preference.matches) stop();
    };
    preference.addEventListener("change", changed);
    if (!preference.matches) {
      const mobile = window.matchMedia("(max-width: 700px)").matches;
      try {
        controls = animate(
          element,
          {
            opacity: [0.35, 1],
            transform: [`translateY(${mobile ? 6 : 12}px)`, "translateY(0px)"],
          },
          { duration: mobile ? 0.28 : 0.42, ease: [0.22, 1, 0.36, 1] },
        );
        controls.then(() => {
          if (active) {
            controls?.cancel();
            clear();
          }
        });
      } catch {
        clear();
      }
    }
    return () => {
      active = false;
      preference.removeEventListener("change", changed);
      stop();
    };
  }, [key, animate, surface]);
  return (
    <>
      <div ref={surface} className={styles.surface} data-smooth-reveal="">
        {children}
      </div>
      <div
        className={styles.announcement}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
    </>
  );
}
