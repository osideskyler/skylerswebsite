import fs from "fs";
import path from "path";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Mountain } from "lucide-react";

import { LifeGallery } from "@/components/life-gallery";
import { ProjectMediaFrame } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { RotatingHighlightCards } from "@/components/rotating-highlight-cards";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { ScrollToProjectsButton } from "@/components/scroll-to-projects-button";
import { SkillsMarquee } from "@/components/skills-marquee";
import { Button } from "@/components/ui/button";
import {
  education,
  experiences,
  featuredProjects,
  interests,
  rotatingResumeCards,
  secondaryProjects,
  siteMeta,
  skillGroups,
} from "@/content/site-data";

const GALLERY_EXCLUDE = new Set(["skylerbeach.JPG", "byulogo.svg"]);
const GALLERY_RE = /\.(jpe?g|png|gif|webp|mp4|webm)$/i;
const GALLERY_VIDEO_RE = /\.(mp4|webm)$/i;
const SITE_URL = "https://skylersmith.me";

export default function Home() {
  const aboutDir = path.join(process.cwd(), "public/images/about");
  const galleryFiles = fs
    .readdirSync(aboutDir)
    .filter((f) => GALLERY_RE.test(f) && !GALLERY_EXCLUDE.has(f))
    .sort((a, b) => {
      const aIsVideo = GALLERY_VIDEO_RE.test(a);
      const bIsVideo = GALLERY_VIDEO_RE.test(b);

      if (aIsVideo && !bIsVideo) return -1;
      if (!aIsVideo && bIsVideo) return 1;

      return a.localeCompare(b);
    });
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteMeta.name,
        url: SITE_URL,
        image: `${SITE_URL}${siteMeta.photo}`,
        description: siteMeta.intro,
        jobTitle: siteMeta.role,
        sameAs: [siteMeta.linkedin],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.school,
        },
      },
      {
        "@type": "WebSite",
        name: "Skyler Smith Portfolio",
        url: SITE_URL,
        description:
          "Skyler Smith portfolio featuring AI products, software projects, and business-minded product work.",
        author: {
          "@type": "Person",
          name: siteMeta.name,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="grid-sheen absolute inset-0" />
      </div>
      <SiteHeader />
      <main className="mx-auto min-w-0 max-w-7xl overflow-x-clip px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* ── HERO ── section-shell container */}
        <section className="section-shell relative isolate overflow-hidden px-3 py-8 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(87,153,123,0.45),transparent_72%)] blur-3xl" />
          <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(125deg,rgba(255,255,255,0.06),transparent_35%,transparent_65%,rgba(135,191,255,0.08))]" />
          <div className="relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal>
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[rgba(148,213,174,0.85)]">
                  <span className="inline-block h-px w-8 bg-[rgba(148,213,174,0.4)]" />
                  Portfolio 2026
                </span>
                {siteMeta.role && (
                  <p className="mt-4 text-sm uppercase tracking-[0.35em] text-white/55">
                    {siteMeta.role}
                  </p>
                )}
                <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {siteMeta.name}
                </h1>
                <p className="mt-5 max-w-2xl text-xl leading-8 text-white/78 sm:text-2xl">
                  {siteMeta.headline}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                  This Skyler Smith portfolio features AI, product, and software
                  projects built with a business lens.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ScrollToProjectsButton />
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

        {/* ── PROJECTS ── open layout, numbered entries, dividers */}
        <section id="projects" className="mt-20 border-t border-white/8 pt-16">
          <Reveal>
            <SectionHeading
              eyebrow="Featured Work"
              title="Projects"
              description="A portfolio of AI, product, and software projects spanning verification, analytics, automation, and data experiences."
            />
          </Reveal>
          <div className="mt-16 divide-y divide-white/8">
            {featuredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={project.slug} delay={index * 0.08}>
                  <article className={`py-14 ${index === 0 ? "pt-0" : ""}`}>
                    <div className="mb-8 flex items-baseline gap-6">
                      <span className="font-display text-7xl font-light text-white/[0.06] sm:text-8xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                          {project.eyebrow}
                        </p>
                        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {index === 0 ? (
                      <>
                        <ProjectMediaFrame item={project.media[0]} />
                        <div className="mt-8 grid gap-8 lg:grid-cols-2">
                          <p className="text-lg leading-8 text-white/75">
                            {project.oneLiner}
                          </p>
                          <div className="flex flex-col justify-between gap-6">
                            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/40">
                              {project.tech.join("  ·  ")}
                            </p>
                            <Button asChild variant="secondary">
                              <Link href={`/projects/${project.slug}`}>
                                Open case study
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="grid gap-8 lg:grid-cols-2">
                        <div className={isEven ? "" : "lg:order-2"}>
                          <p className="text-lg leading-8 text-white/75">
                            {project.oneLiner}
                          </p>
                          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/40">
                            {project.tech.join("  ·  ")}
                          </p>
                          <div className="mt-8">
                            <Button asChild variant="secondary">
                              <Link href={`/projects/${project.slug}`}>
                                Open case study
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <div className={isEven ? "" : "lg:order-1"}>
                          <ProjectMediaFrame item={project.media[0]} />
                        </div>
                      </div>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center">
            <Button asChild variant="ghost" size="lg">
              <Link href="#interests">See the rest of the projects below</Link>
            </Button>
          </div>
        </section>

        {/* ── HIGHLIGHTS ── accent-bordered stat blocks */}
        <Reveal>
          <div className="mt-20 border-t border-[rgba(148,213,174,0.15)] pt-12">
            <div className="mb-8 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/50">
              <Mountain className="h-4 w-4" />
              Notable achievements and experience
            </div>
            <RotatingHighlightCards cards={rotatingResumeCards} />
          </div>
        </Reveal>

        {/* ── EXPERIENCE + EDUCATION + SKILLS ── timeline, border-accents, text */}
        <section
          id="experience"
          className="mt-20 grid min-w-0 gap-16 overflow-x-clip lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Experience"
                title="Experience across product, engineering, and customer work."
              />
            </Reveal>
            <div className="relative mt-12">
              <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
              <div className="space-y-10">
                {experiences.map((experience, index) => (
                  <Reveal key={experience.title} delay={index * 0.08}>
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-[0.45rem] h-[15px] w-[15px] rounded-full border-2 border-[rgba(148,213,174,0.5)] bg-[hsl(var(--background))]" />
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {experience.title}
                          </h3>
                          <p className="mt-1 text-sm text-white/55">
                            {experience.organization} · {experience.location}
                          </p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          {experience.dates}
                        </p>
                      </div>
                      <ul className="mt-4 space-y-1.5 text-sm leading-6 text-white/60">
                        {experience.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span className="text-white/20 select-none">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-16">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Education"
                  title="Information systems with a strong technical edge."
                />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-10 border-l-2 border-[rgba(148,213,174,0.3)] pl-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/about/byulogo.svg"
                      alt="BYU Logo"
                      width={44}
                      height={44}
                      className="h-11 w-11"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {education.school}
                      </h3>
                      <p className="text-sm text-white/55">{education.graduation}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-base text-white/78">{education.degree}</p>
                  <ul className="mt-5 space-y-2 text-sm text-white/55">
                    {education.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-[rgba(148,213,174,0.55)] select-none">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="min-w-0">
              <Reveal>
                <SectionHeading title="Tools and skills" />
              </Reveal>
              <SkillsMarquee groups={skillGroups} />
            </div>
          </div>
        </section>

        {/* ── ABOUT / GALLERY ── gradient container */}
        <section id="about" className="mt-20">
          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(145,223,182,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(113,149,211,0.18),transparent_32%)]" />
              <LifeGallery mediaPaths={galleryFiles} />
            </div>
          </Reveal>
        </section>

        {/* ── SECONDARY PROJECTS + INTERESTS ── numbered list, border-accent blocks */}
        <section id="interests" className="mt-20 grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Beyond the Headline"
                title="More projects, experiments, and side interests."
              />
            </Reveal>
            <div className="mt-10 divide-y divide-white/8">
              {secondaryProjects.map((project, index) => (
                <Reveal key={project.title} delay={index * 0.05}>
                  <div className={`py-6 ${index === 0 ? "pt-0" : ""}`}>
                    <div className="flex items-start gap-5">
                      <span className="font-display text-2xl font-light text-white/[0.08] select-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-white/55">
                          {project.description}
                        </p>
                        <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/30">
                          {project.tags.join("  /  ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Life Outside Work"
                title="Interests"
              />
            </Reveal>
            <div className="mt-10 space-y-8">
              {interests.map((interest, index) => (
                <Reveal key={interest.title} delay={index * 0.08}>
                  <div className="border-l-2 border-white/8 pl-6 transition-colors duration-300 hover:border-[rgba(148,213,174,0.4)]">
                    <h3 className="text-base font-semibold text-white">
                      {interest.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {interest.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── section-shell bookend */}
        <section
          id="contact"
          className="mt-20 section-shell overflow-hidden px-3 py-8 sm:px-8 sm:py-14 lg:px-14"
        >
          <Reveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[rgba(148,213,174,0.85)]">
                  <span className="inline-block h-px w-8 bg-[rgba(148,213,174,0.4)]" />
                  Let&apos;s Connect
                </span>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Contact Skyler Smith
                </h2>
                <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
                  If you are hiring for product, AI, or software roles, reach out
                  anytime to connect about opportunities or projects.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  variant="light"
                >
                  <Link href={`mailto:${siteMeta.email}`} className="flex items-center gap-2">
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
