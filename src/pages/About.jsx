import { BriefcaseBusiness, GraduationCap, Layers3, MapPin } from "lucide-react";
import BackButton from "../components/BackButton.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionIcon from "../components/SectionIcon.jsx";
import Tag from "../components/Tag.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import { aboutPage, profile, testimonials } from "../data/portfolio.js";

export default function About({ onNavigate }) {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:py-12">
      <BackButton onClick={() => onNavigate("home")} />

      <section className="mt-8 grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
        <GlassCard as="aside" className="flex flex-col justify-between p-7 sm:p-8 lg:col-span-3">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-tertiary">
              <span className="h-2.5 w-2.5 rounded-full bg-tertiary shadow-[0_0_16px_rgba(78,222,163,0.72)]" />
              {profile.availability}
            </p>
            <h1 className="mt-3 text-2xl font-black leading-tight text-white">{profile.name}</h1>
            <p className="mt-2 font-mono text-sm text-primary">{profile.role}</p>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-primary" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase text-primary">Based in</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-text-muted">{profile.location}</p>
          </div>
        </GlassCard>

        <GlassCard as="section" className="flex flex-col overflow-hidden p-7 sm:p-9 lg:col-span-9">
          <div>
            <div className="flex items-center gap-3">
              <SectionIcon tone="primary">
                <BriefcaseBusiness size={21} aria-hidden="true" />
              </SectionIcon>
              <div>
                <p className="font-mono text-xs font-bold uppercase text-primary">What I Handle</p>
                <h2 className="mt-1 text-3xl font-black text-white sm:text-4xl">
                  Design, build, revise, and ship.
                </h2>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-8 text-text-muted">
              {aboutPage.introduction}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {aboutPage.capabilityGroups.map((item) => (
              <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5" key={item.title}>
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </GlassCard>

        <GlassCard as="section" className="p-7 sm:p-8 lg:col-span-8">
          <div className="flex items-center gap-3">
            <SectionIcon tone="secondary">
              <Layers3 size={20} aria-hidden="true" />
            </SectionIcon>
            <div>
              <p className="font-mono text-xs font-bold uppercase text-primary">Working Toolkit</p>
              <h2 className="mt-1 text-2xl font-black text-white">Tech Stack</h2>
            </div>
          </div>
          <div className="mt-7 grid gap-4">
            {aboutPage.toolkitGroups.map((group) => (
              <article className="rounded-2xl border border-white/10 bg-black/[0.12] p-5" key={group.label}>
                <p className="mb-3 font-mono text-xs font-bold uppercase text-primary">{group.label}</p>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item, index) => (
                    <Tag tone={index < 2 ? "primary" : "neutral"} key={item}>
                      {item}
                    </Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </GlassCard>

        <GlassCard as="section" className="flex flex-col justify-center p-7 sm:p-8 lg:col-span-4">
          <div className="flex items-center gap-3">
            <SectionIcon tone="tertiary">
              <GraduationCap size={20} aria-hidden="true" />
            </SectionIcon>
            <div>
              <p className="font-mono text-xs font-bold uppercase text-primary">Learning Path</p>
              <h2 className="mt-1 text-2xl font-black text-white">Education and growth</h2>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-text-muted">{aboutPage.learning}</p>
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
