export default function SectionIcon({ children, tone = "primary" }) {
  const toneClass = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  }[tone];

  return (
    <span
      className={`grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.045] ${toneClass}`}
    >
      {children}
    </span>
  );
}
