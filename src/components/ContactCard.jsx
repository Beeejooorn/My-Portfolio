import { Github, Instagram, Linkedin, Mail, MapPin, Send } from "lucide-react";
import GlassCard from "./GlassCard.jsx";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram,
};

export default function ContactCard({ profile, socialLinks }) {
  return (
    <GlassCard
      as="section"
      className="relative flex flex-col items-center justify-center overflow-hidden p-7 text-center sm:p-8 md:col-span-8 lg:col-span-5"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      aria-labelledby="contact-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10" />
      <div className="relative z-10 w-full">
        <h2 id="contact-title" className="text-2xl font-black text-white">
          Let's Work Together
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">
          Open to Webflow builds, front-end roles, and focused website projects.
        </p>

        <div className="mt-7 grid gap-3 rounded-3xl border border-white/10 bg-black/15 p-4 text-left">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 rounded-2xl px-2 py-2 text-sm text-text-muted transition hover:text-white"
          >
            <Mail size={18} className="text-primary" aria-hidden="true" />
            {profile.email}
          </a>
          <p className="flex items-center gap-3 px-2 py-2 text-sm text-text-muted">
            <MapPin size={18} className="text-tertiary" aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        <div className="mt-7 flex justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.label] ?? Github;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-white transition hover:scale-105 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/70"
                aria-label={link.label}
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <a
          href={`mailto:${profile.email}?subject=Portfolio%20conversation`}
          className="glass-button mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-white transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-primary/70"
        >
          Get in touch
          <Send size={17} aria-hidden="true" />
        </a>
      </div>
    </GlassCard>
  );
}
