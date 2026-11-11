import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { pathname } = useLocation();
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const sync = () => {
      setMobile(media.matches);
      setOpen(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    setOpen(false);
    setHidden(false);
    if (previousPath.current !== pathname) {
      document.getElementById("main")?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);
  useEffect(() => {
    let previous = window.scrollY;
    let distance = 0;
    let direction = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const limit = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const y = Math.max(0, Math.min(window.scrollY, limit));
      const delta = y - previous;
      previous = y;
      setScrolled(y > 12);
      if (
        y <= 12 ||
        limit <= 12 ||
        open ||
        header.current?.contains(document.activeElement)
      ) {
        distance = 0;
        direction = 0;
        setHidden(false);
        return;
      }
      if (delta === 0) return;
      const nextDirection = Math.sign(delta);
      if (direction !== nextDirection) distance = 0;
      direction = nextDirection;
      distance += Math.abs(delta);
      if (distance >= (direction > 0 ? 60 : 14)) {
        setHidden(direction > 0);
        distance = 0;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [open, pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      ) {
        setOpen(false);
        if (header.current?.contains(document.activeElement))
          toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <>
      <header
        ref={header}
        className={styles.header}
        data-hidden={hidden && !open}
        data-open={open}
        data-scrolled={scrolled}
        onFocusCapture={() => setHidden(false)}
      >
        <nav aria-label="Main navigation" className={styles.inner}>
          <Link
            to="/"
            className={styles.identity}
            onClick={() => setOpen(false)}
          >
            Bjorn Tanamal
          </Link>
          <button
            ref={toggle}
            type="button"
            className={styles.toggle}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="shared-navigation"
            onClick={() => {
              setOpen((value) => !value);
              setHidden(false);
            }}
          >
            <span className={styles.icon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <div
            id="shared-navigation"
            className={styles.links}
            inert={mobile && !open}
            aria-hidden={mobile && !open ? true : undefined}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/" end className={styles.home}>
              HOME
            </NavLink>
            <NavLink to="/works">WORK</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
          </div>
        </nav>
      </header>
      <div className={styles.reserve} aria-hidden="true" />
    </>
  );
}
