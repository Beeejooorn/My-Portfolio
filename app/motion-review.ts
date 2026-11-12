import { useLayoutEffect, useRef, useState } from "react";

export function prefersReducedMotion(preference: MediaQueryList) {
  return (
    preference.matches &&
    !(
      import.meta.env.DEV &&
      document.documentElement.hasAttribute("data-m4-motion-review")
    )
  );
}

export function useLocalMotionReview() {
  const [enabled, setEnabled] = useState(false);
  const settings = useRef<{ enabled: boolean; force: boolean } | null>(null);
  useLayoutEffect(() => {
    if (!import.meta.env.DEV) return;
    // A document-scoped opt-in; SPA navigation keeps it, a full reload clears it.
    if (!settings.current) {
      const query = new URLSearchParams(location.search);
      const review = query.get("motionReview") === "1";
      settings.current = {
        enabled: review,
        force: review && query.get("forceMotion") === "1",
      };
    }
    const root = document.documentElement;
    root.toggleAttribute("data-m4-motion-review", settings.current.force);
    setEnabled(settings.current.enabled);
    return () => root.removeAttribute("data-m4-motion-review");
  }, []);
  return enabled;
}
