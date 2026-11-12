import { useEffect, useRef, useState } from "react";

type Styles = {
  opacity: number;
  transform: string;
  duration: string;
  native: number;
  angle: number;
};
const read = (node: Element | null): Styles | null => {
  if (!node) return null;
  const css = getComputedStyle(node);
  const matrix = new DOMMatrixReadOnly(
    css.transform === "none" ? undefined : css.transform,
  );
  return {
    opacity: Number(css.opacity),
    transform: css.transform,
    duration: css.transitionDuration,
    native: node.getAnimations().length,
    angle: (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI,
  };
};

export default function LocalMotionReview() {
  const output = useRef<HTMLOutputElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const report = useRef<object>({});
  const [copied, setCopied] = useState("");
  useEffect(() => {
    let frame = 0;
    let pointer = { x: 0, y: 0, seen: false };
    let lastWrite = 0;
    let lastSaved = 0;
    let lastPointerAt = 0;
    const frames: object[] = [];
    const summary = {
      peakPreviewLag: 0,
      trailingFrames: 0,
      previewFadeFrames: 0,
      imageWipeFrames: 0,
      strokeFrames: [0, 0, 0],
      dropdownFrames: 0,
      headerFrames: 0,
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY, seen: true };
      lastPointerAt = performance.now();
      if (marker.current) {
        marker.current.style.display = "block";
        marker.current.style.transform = `translate3d(${pointer.x - 9}px, ${pointer.y - 9}px, 0)`;
      }
    };
    const sample = (time: number) => {
      const preview = document.querySelector<HTMLElement>(
        "[data-project-preview]",
      );
      const r = preview?.getBoundingClientRect();
      const style = read(preview);
      const visible = preview?.dataset.visible === "true";
      const target =
        r && pointer.seen
          ? {
              x: Math.max(
                16,
                Math.min(innerWidth - r.width - 16, pointer.x - r.width / 2),
              ),
              y: Math.max(
                16,
                Math.min(innerHeight - r.height - 16, pointer.y - r.height / 2),
              ),
            }
          : null;
      const lag = target && r ? Math.hypot(target.x - r.x, target.y - r.y) : 0;
      const toggle = document.querySelector(
        'button[aria-controls="shared-navigation"]',
      );
      const strokes = Array.from(
        toggle?.querySelectorAll("span > span") ?? [],
      ).map(read);
      const menu = read(document.getElementById("shared-navigation"));
      const header = read(document.querySelector("header"));
      const forced = document.documentElement.hasAttribute(
        "data-m4-motion-review",
      );
      const rawReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (visible && lag > 1 && time - lastPointerAt > 32)
        summary.trailingFrames++;
      if (visible && time - lastPointerAt > 16)
        summary.peakPreviewLag = Math.max(summary.peakPreviewLag, lag);
      if (style && style.opacity > 0.001 && style.opacity < 0.999)
        summary.previewFadeFrames++;
      if (
        preview?.querySelectorAll("img") &&
        Array.from(preview.querySelectorAll("img")).some(
          (n) => n.getAnimations().length,
        )
      )
        summary.imageWipeFrames++;
      strokes.forEach((stroke, index) => {
        if (
          stroke &&
          (index === 1
            ? stroke.opacity > 0.001 && stroke.opacity < 0.999
            : Math.abs(stroke.angle) > 0.1 && Math.abs(stroke.angle) < 44.9)
        )
          summary.strokeFrames[index]++;
      });
      if (menu && menu.opacity > 0.001 && menu.opacity < 0.999)
        summary.dropdownFrames++;
      if (header && header.opacity > 0.001 && header.opacity < 0.999)
        summary.headerFrames++;
      const current = {
        ms: Math.round(time),
        pointer,
        sincePointerEventMs: time - lastPointerAt,
        preview: r
          ? {
              x: r.x,
              y: r.y,
              target,
              lag,
              visible,
              project: preview?.dataset.project,
              styles: style,
            }
          : null,
        strokes,
        menu,
        header,
        open: toggle?.getAttribute("aria-expanded"),
      };
      if (time - lastSaved >= 16) {
        frames.push(current);
        if (frames.length > 180) frames.shift();
        lastSaved = time;
      }
      report.current = {
        url: location.href,
        rawReduced,
        forced,
        effectiveReduced: rawReduced && !forced,
        summary,
        current,
        frames,
      };
      if (output.current && time - lastWrite >= 70) {
        output.current.textContent = [
          `Browser reduced motion: ${rawReduced}`,
          `DEV force normal motion: ${forced ? "ON" : "off"}`,
          `Effective reduced motion: ${rawReduced && !forced}`,
          "Blue crosshair = actual pointer coordinates",
          `Pointer: ${pointer.x.toFixed(0)}, ${pointer.y.toFixed(0)}`,
          r && target
            ? `Preview X/Y: ${r.x.toFixed(1)}, ${r.y.toFixed(1)}; target ${target.x.toFixed(1)}, ${target.y.toFixed(1)}; lag ${lag.toFixed(1)}px`
            : "Preview: not active",
          `Project: ${preview?.dataset.project ?? "none"}; peak lag ${summary.peakPreviewLag.toFixed(1)}px; trailing frames ${summary.trailingFrames}`,
          `Preview fade frames: ${summary.previewFadeFrames}; wipe frames: ${summary.imageWipeFrames}`,
          ...strokes.map(
            (stroke, i) =>
              `Stroke ${i + 1}: ${stroke?.angle.toFixed(1)}deg; opacity ${stroke?.opacity.toFixed(2)}; durations ${stroke?.duration}`,
          ),
          `Stroke intermediate frames: [${summary.strokeFrames.join(", ")}]`,
          `Dropdown opacity: ${menu?.opacity.toFixed(2)}; duration: ${menu?.duration}; intermediate frames: ${summary.dropdownFrames}`,
          `Navbar opacity: ${header?.opacity.toFixed(2)}; duration: ${header?.duration}; intermediate frames: ${summary.headerFrames}`,
        ].join("\n");
        lastWrite = time;
      }
      frame = requestAnimationFrame(sample);
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", move, { passive: true });
    frame = requestAnimationFrame(sample);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", move);
    };
  }, []);

  return (
    <>
      <div
        ref={marker}
        data-motion-pointer=""
        aria-hidden="true"
        style={{
          display: "none",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9998,
          pointerEvents: "none",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M9 0v18M0 9h18" stroke="#0879ff" strokeWidth="2" />
        </svg>
      </div>
      <aside
        aria-label="Local motion review"
        style={{
          position: "fixed",
          right: 8,
          bottom: 8,
          zIndex: 9999,
          maxWidth: "min(540px, calc(100vw - 16px))",
          maxHeight: "42vh",
          overflow: "auto",
          background: "#111",
          color: "#fff",
          border: "2px solid #58a5ff",
          padding: 10,
          font: "11px/1.45 monospace",
          overflowWrap: "anywhere",
        }}
      >
        <strong>LOCAL MOTION REVIEW — DEV ONLY</strong>
        <div>
          Uses existing normal timings. Production ignores these parameters.
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard
                .writeText(JSON.stringify(report.current, null, 2))
                .then(() => setCopied("Report copied"))
                .catch(() => setCopied("Copy unavailable; select the readout"));
            }}
          >
            Copy motion report
          </button>{" "}
          <span role="status">{copied}</span>
        </div>
        <output
          ref={output}
          aria-live="off"
          style={{ display: "block", whiteSpace: "pre-wrap" }}
        />
        <a href={location.pathname} style={{ color: "#8fc1ff" }}>
          Exit review and reload this route
        </a>
      </aside>
    </>
  );
}
