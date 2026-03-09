import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  Mountain,
} from "lucide-react";

import { ProjectMediaFrame } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  education,
  experiences,
  featuredProjects,
  heroHighlights,
  interests,
  secondaryProjects,
  siteMeta,
  skillGroups,
  snapshots,
} from "@/content/site-data";

export default function Home() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="grid-sheen absolute inset-0" />
      </div>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 lg:px-8 lg:py-10">
        <section className="section-shell relative isolate overflow-hidden px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(87,153,123,0.45),transparent_72%)] blur-3xl" />
          <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(125deg,rgba(255,255,255,0.06),transparent_35%,transparent_65%,rgba(135,191,255,0.08))]" />
          <div className="relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal>
              <div className="max-w-3xl">
                <Badge className="mb-5">Portfolio 2026</Badge>
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/55">
                  {siteMeta.role}
                </p>
                <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {siteMeta.name}
                </h1>
                <p className="mt-5 max-w-2xl text-xl leading-8 text-white/78 sm:text-2xl">
                  {siteMeta.headline}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                  Software that solves real problems, communicates value, and
                  feels polished enough for customers and recruiters alike.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="#projects">
                      Explore projects
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href={siteMeta.resume} target="_blank">
                      View resume
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg">
                    <Link href={siteMeta.linkedin} target="_blank">
                      LinkedIn
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(145,223,182,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(113,149,211,0.15),transparent_40%)]" />
                {siteMeta.photo ? (
                  <Image
                    src={siteMeta.photo}
                    alt={siteMeta.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-white/30">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-white/20" />
                    <p className="text-xs uppercase tracking-[0.25em]">Photo</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="section-shell px-6 py-14 sm:px-10 lg:px-14">
          <Reveal>
            <SectionHeading
              eyebrow="Featured Work"
              title="Projects built to earn a second look."
            />
          </Reveal>
          <div className="mt-12 space-y-8">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <article className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-7">
                  <div className="flex flex-col justify-between">
                    <div>
                      <Badge className="mb-4">{project.eyebrow}</Badge>
                      <h3 className="font-display text-3xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-lg leading-7 text-white/78">
                        {project.oneLiner}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <Badge key={tag} className="tracking-[0.12em] normal-case text-white/72">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button asChild variant="secondary">
                        <Link href={`/projects/${project.slug}`}>
                          Open case study
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <ProjectMediaFrame item={project.media[0]} />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <div className="section-shell px-6 py-10 sm:px-10 lg:px-14">
            <div className="flex items-center gap-3 mb-8 text-sm uppercase tracking-[0.3em] text-white/50">
              <Mountain className="h-4 w-4" />
              Outdoor x product builder
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                    {highlight.label}
                  </p>
                  <p className="font-display text-4xl font-semibold text-white mt-2">
                    {highlight.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/68">
                    {highlight.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <section id="experience" className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="section-shell px-6 py-14 sm:px-10 lg:px-14">
            <Reveal>
              <SectionHeading
                eyebrow="Experience"
                title="Technical, business, and customer-facing reps."
              />
            </Reveal>
            <div className="mt-10 space-y-5">
              {experiences.map((experience, index) => (
                <Reveal key={experience.title} delay={index * 0.08}>
                  <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-white">
                          <BriefcaseBusiness className="h-4 w-4 text-[rgba(148,213,174,0.88)]" />
                          <h3 className="text-lg font-semibold">{experience.title}</h3>
                        </div>
                        <p className="mt-2 text-white/70">
                          {experience.organization} · {experience.location}
                        </p>
                      </div>
                      <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                        {experience.dates}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/72">
                      • {experience.bullets[0]}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <section className="section-shell px-6 py-14 sm:px-10 lg:px-14">
              <Reveal>
                <SectionHeading
                  eyebrow="Education"
                  title="Information systems with a strong technical edge."
                />
              </Reveal>
              <Reveal delay={0.08} className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-white/12 bg-white/8 p-3">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{education.school}</h3>
                    <p className="text-sm text-white/65">{education.graduation}</p>
                  </div>
                </div>
                <p className="mt-5 text-base text-white/80">{education.degree}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {education.highlights.map((highlight) => (
                    <Badge key={highlight} className="tracking-[0.1em] normal-case text-white/72">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            </section>

            <section className="section-shell px-6 py-14 sm:px-10 lg:px-14">
              <Reveal>
                <SectionHeading
                  eyebrow="Tools and Skills"
                  title="A mix of engineering, AI workflows, and product execution."
                />
              </Reveal>
              <div className="mt-10 grid gap-4">
                {skillGroups.map((group, index) => (
                  <Reveal key={group.title} delay={index * 0.08}>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Badge
                            key={item}
                            className="tracking-[0.08em] normal-case text-white/72"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section id="about" className="section-shell px-6 py-14 sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="About Me"
                title="A portfolio that feels like the work and the person behind it."
              />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(145,223,182,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(113,149,211,0.18),transparent_32%)]" />
                {snapshots.map((snapshot, index) => {
                  const positions = [
                    "left-5 top-5",
                    "right-8 top-10",
                    "left-10 top-36",
                    "right-6 top-44",
                    "left-18 bottom-8",
                    "right-20 bottom-12",
                  ];

                  return (
                    <div
                      key={snapshot.title}
                      className={`glass-card absolute w-40 rounded-[1.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] ${positions[index]}`}
                    >
                      <div className="mb-4 aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)),radial-gradient(circle_at_top,rgba(132,197,155,0.32),transparent_45%)]">
                        {snapshot.imageSrc ? (
                          <Image
                            src={snapshot.imageSrc}
                            alt={snapshot.title}
                            width={320}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <h3 className="text-sm font-semibold text-white">{snapshot.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-white/62">
                        {snapshot.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="interests" className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="section-shell px-6 py-14 sm:px-10 lg:px-14">
            <Reveal>
              <SectionHeading
                eyebrow="Beyond the Headline"
                title="Smaller builds, experiments, and side interests."
              />
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {secondaryProjects.map((project, index) => (
                <Reveal key={project.title} delay={index * 0.05}>
                  <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/68">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} className="tracking-[0.08em] normal-case text-white/72">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="section-shell px-6 py-14 sm:px-10 lg:px-14">
            <Reveal>
              <SectionHeading
                eyebrow="Life Outside Work"
                title="The personal side should still feel intentional."
              />
            </Reveal>
            <div className="mt-10 space-y-4">
              {interests.map((interest, index) => (
                <Reveal key={interest.title} delay={index * 0.08}>
                  <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-lg font-semibold text-white">{interest.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/68">
                      {interest.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section-shell overflow-hidden px-6 py-14 sm:px-10 lg:px-14"
        >
          <Reveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Badge className="mb-4">Let&apos;s Connect</Badge>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Built to be memorable, clear, and easy to update.
                </h2>
                <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
                  Interested in working together? Reach out anytime.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href={`mailto:${siteMeta.email}`}>
                    <Mail className="h-4 w-4" />
                    {siteMeta.email}
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={siteMeta.linkedin} target="_blank">
                    LinkedIn profile
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={siteMeta.resume} target="_blank">
                    Download resume
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
