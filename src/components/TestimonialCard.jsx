import GlassCard from "./GlassCard.jsx";

export default function TestimonialCard({ testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <GlassCard
      as="article"
      className="flex min-h-[250px] flex-col justify-between p-7 sm:p-8"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
    >
      <div>
        <span className="font-mono text-6xl leading-none text-primary/45">"</span>
        <p className="mt-3 text-base italic leading-7 text-white/88">{testimonial.quote}</p>
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={`${testimonial.name} profile`}
            className="h-12 w-12 rounded-full border border-white/15 bg-white/[0.04] object-cover shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
          />
        ) : (
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.055] font-mono text-xs font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
        <div>
          <p className="font-bold text-white">{testimonial.name}</p>
          <p className="mt-0.5 font-mono text-xs text-text-muted">{testimonial.role}</p>
        </div>
      </div>
    </GlassCard>
  );
}
