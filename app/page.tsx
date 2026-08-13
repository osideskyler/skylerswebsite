import fs from "fs";
import path from "path";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";

import { CopyEmailButton } from "@/components/copy-email-button";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Parallax } from "@/components/fx/parallax";
import { RidgeCanvas } from "@/components/fx/ridge-canvas";
import { RidgeSpine } from "@/components/fx/ridge-spine";
import { WordReveal } from "@/components/fx/word-reveal";
import { LifeGallery } from "@/components/life-gallery";
import { ProjectMediaFrame } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
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
    <div className="relative overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="grid-sheen absolute inset-0" />
      </div>
      <RidgeSpine />
      <SiteHeader />
      <main className="mx-auto min-w-0 max-w-7xl overflow-x-clip px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* ── HERO ── */}
        <section className="section-shell relative isolate overflow-hidden px-3 py-8 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(87,153,123,0.45),transparent_72%)] blur-3xl" />
          <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(125deg,rgba(255,255,255,0.06),transparent_35%,transparent_65%,rgba(135,191,255,0.08))]" />
          <RidgeCanvas className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] w-full opacity-55" />
          <div className="relative z-[20] grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <Parallax speed={0.12} fade>
              <Reveal>
                <div className="max-w-3xl">
                  {siteMeta.role ? (
                    <p
                      data-ridge
                      data-ridge-y="0.5"
                      className="text-sm uppercase tracking-[0.35em] text-white/55"
                    >
                      {siteMeta.role}
                    </p>
                  ) : null}
                  <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    <WordReveal text={siteMeta.name} delay={0.1} />
                  </h1>
                  <p className="mt-5 max-w-2xl text-xl leading-8 text-white/78 sm:text-2xl">
                    <WordReveal
                      text={siteMeta.headline}
                      delay={0.3}
                      accent={["AI-driven"]}
                    />
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ScrollToProjectsButton />
                    <Button asChild variant="secondary" size="lg">
                      <Link href={siteMeta.resume} target="_blank">
                        View resume
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </Parallax>

            <Reveal delay={0.12}>
              <div className="relative z-[20] mx-auto w-full max-w-[16rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] aspect-[3/4] lg:mx-0 lg:max-w-xs">
                {siteMeta.photo ? (
                  <Image
                    src={siteMeta.photo}
                    alt={siteMeta.name}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-white/30">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-white/20" />
                    <p className="text-xs uppercase tracking-[0.25em]">Photo</p>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(5,10,16,0.72)] px-3.5 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[rgb(148,213,174)] [animation:pulse-dot_2.2s_ease-out_infinite]" />
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
                    Open to product &amp; AI roles
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="mt-20 border-t border-white/8 pt-16">
          <Reveal>
            <SectionHeading
              eyebrow="Featured Work"
              title="Projects"
              description="Verification, analytics, and data products shipped with a business lens."
            />
          </Reveal>
          <div className="mt-16 divide-y divide-white/8">
            {featuredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={project.slug} delay={index * 0.08}>
                  <article
                    data-ridge
                    data-ridge-y="0.08"
                    className={`group py-14 ${index === 0 ? "pt-0" : ""}`}
                  >
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                        {project.eyebrow}
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                        {project.title}
                      </h3>
                      {project.impact[0] ? (
                        <p className="mt-3 font-mono text-sm tracking-tight text-[rgba(148,213,174,0.88)]">
                          {project.impact[0]}
                        </p>
                      ) : null}
                    </div>

                    {index === 0 ? (
                      <>
                        <Parallax speed={0.1}>
                          <ProjectMediaFrame item={project.media[0]} compact />
                        </Parallax>
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
                          <Parallax speed={0.12}>
                            <ProjectMediaFrame item={project.media[0]} compact />
                          </Parallax>
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
              <Link href="#more-work">More experiments below</Link>
            </Button>
          </div>
        </section>

        {/* ── EXPERIENCE + EDUCATION + SKILLS ── */}
        <section
          id="experience"
          data-ridge
          data-ridge-y="0.04"
          className="mt-20 grid min-w-0 gap-16 overflow-x-clip lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Experience"
                title="Product, engineering, and customer work."
              />
            </Reveal>
            <ExperienceTimeline items={experiences} />
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
                <div className="mt-10 pl-6">
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

        {/* ── ABOUT / GALLERY ── */}
        <section
          id="about"
          data-ridge
          data-ridge-y="0.08"
          className="mt-20"
        >
          <Reveal delay={0.12}>
            <div className="relative z-[20] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(145,223,182,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(113,149,211,0.18),transparent_32%)]" />
              <LifeGallery mediaPaths={galleryFiles} />
            </div>
          </Reveal>
        </section>

        {/* ── SECONDARY PROJECTS + INTERESTS ── */}
        <section id="interests" className="mt-20 grid gap-16 lg:grid-cols-2">
          <div id="more-work">
            <Reveal>
              <SectionHeading
                eyebrow="Beyond the Headline"
                title="More projects, experiments, and side interests."
              />
            </Reveal>
            <div
              data-ridge
              data-ridge-y="0.04"
              className="mt-10 divide-y divide-white/8"
            >
              {secondaryProjects.map((project, index) => (
                <Reveal key={project.title} delay={index * 0.05}>
                  <div className={`py-6 ${index === 0 ? "pt-0" : ""}`}>
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
                  <div className="pl-6">
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

        {/* ── CONTACT ── */}
        <section
          id="contact"
          data-ridge
          data-ridge-y="0.12"
          className="mt-20 overflow-hidden px-3 py-10 sm:px-8 sm:py-16 lg:px-14"
        >
          <Reveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Let&apos;s talk.
                </h2>
                <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
                  Hiring for product, AI, or software roles? Reach out.
                </p>
              </div>
              <div
                data-ridge
                data-ridge-side="anchor"
                data-ridge-y="0.5"
                data-ridge-inset="24"
                className="flex flex-col gap-3"
              >
                <CopyEmailButton email={siteMeta.email} />
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

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 px-1 pt-8 text-xs text-white/35 sm:flex-row">
          <p>© 2026 Skyler Smith. Designed and built with Next.js.</p>
          <a
            href="#"
            className="flex items-center gap-1.5 transition-colors hover:text-white/70"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </footer>
      </main>
    </div>
  );
}
