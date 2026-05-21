import { Layers3, Route } from "lucide-react";
import BackButton from "../components/BackButton.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionIcon from "../components/SectionIcon.jsx";
import Tag from "../components/Tag.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import { aboutPage, profile, skills, testimonials } from "../data/portfolio.js";

export default function About({ onNavigate }) {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:py-12">
      <BackButton onClick={() => onNavigate("home")} />

      <section className="mt-8 grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
        <GlassCard as="aside" className="overflow-hidden p-0 lg:col-span-3">
          <div className="relative aspect-[4/3] max-h-[260px] overflow-hidden">
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
          <div className="p-6 sm:p-7">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-tertiary">
              <span className="h-2.5 w-2.5 rounded-full bg-tertiary shadow-[0_0_16px_rgba(78,222,163,0.72)]" />
              {profile.availability}
            </p>
            <h1 className="mt-3 text-2xl font-black leading-tight text-white">{profile.name}</h1>
            <p className="mt-2 font-mono text-sm text-primary">{profile.role}</p>
          </div>
        </GlassCard>

        <GlassCard as="section" className="flex flex-col justify-between overflow-hidden p-7 sm:p-9 lg:col-span-9">
          <div>
            <div className="flex items-center gap-3">
              <SectionIcon tone="secondary">
                <Layers3 size={21} aria-hidden="true" />
              </SectionIcon>
              <div>
                <p className="font-mono text-xs font-bold uppercase text-primary">Working Toolkit</p>
                <h2 className="mt-1 text-3xl font-black text-white sm:text-4xl">Tech Stack</h2>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-8 text-text-muted">
              The tools I use across Figma planning, responsive website development, Webflow
              builds, CMS work, student systems, and the technologies I am actively improving.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-black/[0.12] p-5 sm:p-6">
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, index) => (
                <Tag tone={index < 4 ? "primary" : "neutral"} key={skill}>
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard as="section" className="p-7 sm:p-8 lg:col-span-12">
          <div className="mb-6 flex items-center gap-3">
            <SectionIcon>
              <Route size={20} aria-hidden="true" />
            </SectionIcon>
            <h2 className="text-2xl font-black text-white">How I Work</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {aboutPage.process.map((item) => (
              <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5" key={item.title}>
                <p className="font-mono text-xs font-bold uppercase text-primary">{item.step}</p>
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
