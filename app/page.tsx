import fs from "fs";
import path from "path";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Mail, Mountain } from "lucide-react";

import { LifeGallery } from "@/components/life-gallery";
import { ProjectMediaFrame } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { RotatingHighlightCards } from "@/components/rotating-highlight-cards";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { ScrollToProjectsButton } from "@/components/scroll-to-projects-button";
import { Badge } from "@/components/ui/badge";
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
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:gap-10 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="section-shell relative isolate overflow-hidden px-3 py-8 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(87,153,123,0.45),transparent_72%)] blur-3xl" />
          <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(125deg,rgba(255,255,255,0.06),transparent_35%,transparent_65%,rgba(135,191,255,0.08))]" />
          <div className="relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal>
              <div className="max-w-3xl">
                <Badge className="mb-5">Portfolio 2026</Badge>
                {siteMeta.role && (
                  <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/55">
                    {siteMeta.role}
                  </p>
                )}
                <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
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

        <section id="projects" className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
          <Reveal>
            <SectionHeading
              eyebrow="Featured Work"
              title="Projects"
              description="A portfolio of AI, product, and software projects spanning verification, analytics, automation, and data experiences."
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
          <div className="mt-8 flex justify-center">
            <Button asChild variant="ghost" size="lg">
              <Link href="#interests">See the rest of the projects below</Link>
            </Button>
          </div>
        </section>

        <Reveal>
          <div className="section-shell px-3 py-6 sm:px-8 sm:py-10 lg:px-14">
            <div className="flex items-center gap-3 mb-8 text-sm uppercase tracking-[0.3em] text-white/50">
              <Mountain className="h-4 w-4" />
              Notable achievements and experience
            </div>
            <RotatingHighlightCards cards={rotatingResumeCards} />
          </div>
        </Reveal>

        <section id="experience" className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
            <Reveal>
              <SectionHeading
                eyebrow="Experience"
                title="Experience across product, engineering, and customer work."
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
                    <ul className="mt-4 space-y-1 text-sm leading-6 text-white/72 list-disc list-inside">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <section className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
              <Reveal>
                <SectionHeading
                  eyebrow="Education"
                  title="Information systems with a strong technical edge."
                />
              </Reveal>
              <Reveal delay={0.08} className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/about/byulogo.svg"
                    alt="BYU Logo"
                    width={44}
                    height={44}
                    className="h-11 w-11"
                  />
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

            <section className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
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

        <section id="about" className="section-shell px-3 py-6 sm:px-8 sm:py-10 lg:px-14">
          <Reveal delay={0.12}>
            <div className="relative mt-4 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(145,223,182,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(113,149,211,0.18),transparent_32%)]" />
              <LifeGallery mediaPaths={galleryFiles} />
            </div>
          </Reveal>
        </section>

        <section id="interests" className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
            <Reveal>
              <SectionHeading
                eyebrow="Beyond the Headline"
                title="More projects, experiments, and side interests."
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

          <div className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
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
          className="section-shell overflow-hidden px-3 py-8 sm:px-8 sm:py-14 lg:px-14"
        >
          <Reveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Badge className="mb-4">Let&apos;s Connect</Badge>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
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
