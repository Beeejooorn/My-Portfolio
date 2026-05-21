import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen({ isVisible }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return undefined;
    }

    let animationFrameId;
    const duration = 1550;
    const holdAtZero = 180;
    const startTime = performance.now();
    setProgress(0);

    const tick = (time) => {
      const elapsed = Math.max(0, Math.min((time - startTime - holdAtZero) / duration, 1));
      const eased = 1 - (1 - elapsed) ** 3;
      setProgress(Math.round(eased * 100));

      if (elapsed < 1) {
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    animationFrameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-abyss px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-label="Loading portfolio"
        >
          <motion.div
            className="loader-shell"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex w-full items-center justify-between gap-5">
              <span className="font-mono text-[11px] font-bold uppercase text-white/56">
                Loading
              </span>
              <span className="loader-percent">{progress}%</span>
            </div>
            <div className="loader-progress" aria-hidden="true">
              <motion.span
                className="loader-progress-bar"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
