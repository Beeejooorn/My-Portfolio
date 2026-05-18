import { BriefcaseBusiness, CheckCircle2, UserRound } from "lucide-react";
import BackButton from "../components/BackButton.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionIcon from "../components/SectionIcon.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import { aboutPage, profile, testimonials } from "../data/portfolio.js";

export default function About({ onNavigate }) {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:py-12">
      <BackButton onClick={() => onNavigate("home")} />

      <section className="mt-8 grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
        <GlassCard as="aside" className="overflow-hidden p-0 lg:col-span-4">
          <div className="relative aspect-[4/3] max-h-[300px] overflow-hidden">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} portrait`}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="avatar-placeholder flex h-full w-full items-center justify-center">
                <span className="text-6xl font-black text-white/70">BT</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-abyss to-transparent" />
          </div>
          <div className="p-7 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-tertiary">
              <span className="h-2.5 w-2.5 rounded-full bg-tertiary shadow-[0_0_16px_rgba(78,222,163,0.72)]" />
              {profile.availability}
            </p>
            <h1 className="mt-3 text-3xl font-black text-white">{profile.name}</h1>
            <p className="mt-2 font-mono text-sm text-primary">{profile.role}</p>
          </div>
        </GlassCard>

        <GlassCard as="section" className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-2 font-mono text-xs font-bold text-primary">
            <UserRound size={14} aria-hidden="true" />
            About Me
          </span>
          <h2 className="mt-6 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl">
            {aboutPage.headline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-text-muted sm:text-lg">
            {aboutPage.introduction}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {aboutPage.quickFacts.map((fact) => (
              <div
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-bold text-white/90"
                key={fact}
              >
                <CheckCircle2 className="shrink-0 text-primary" size={16} aria-hidden="true" />
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard as="section" className="p-7 sm:p-8 lg:col-span-12">
          <div className="mb-6 flex items-center gap-3">
            <SectionIcon>
              <BriefcaseBusiness size={20} aria-hidden="true" />
            </SectionIcon>
            <h2 className="text-2xl font-black text-white">Career Journey</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {aboutPage.journey.map((item) => (
              <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5" key={item.title}>
                <p className="font-mono text-xs font-bold uppercase text-primary">{item.period}</p>
                <h3 className="mt-2 text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black text-white">Client Perspectives</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} key={`${testimonial.name}-${testimonial.role}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
