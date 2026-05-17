export default function Tag({ children, tone = "neutral" }) {
  const toneClass =
    tone === "primary"
      ? "border-primary/25 bg-primary/10 text-primary"
      : "border-white/10 bg-white/[0.055] text-white";

  return (
    <span className={`rounded-lg border px-3 py-1.5 font-mono text-xs ${toneClass}`}>
      {children}
    </span>
  );
}
