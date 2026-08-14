import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { ProjectMediaFrame } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { featuredProjects, siteMeta } from "@/content/site-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getProjectBySlug(slug: string) {
  return featuredProjects.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project case study could not be found.",
    };
  }

  const image =
    project.media.find((item) => item.type === "image" && item.src)?.src ?? siteMeta.photo;
  const projectUrl = `/projects/${project.slug}`;
  const title = `${project.title} | Skyler Smith Portfolio`;

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      type: "article",
      url: projectUrl,
      title,
      description: project.summary,
      images: image
        ? [
            {
              url: image,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* ── HEADER ── */}
        <section className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
          <Button asChild variant="ghost" className="mb-8 px-0">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </Link>
          </Button>

          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[rgba(148,213,174,0.85)]">
            <span className="inline-block h-px w-8 bg-[rgba(148,213,174,0.4)]" />
            {project.eyebrow}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-8 text-white/76">
            {project.oneLiner}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/64">
            {project.summary}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Role</p>
              <p className="mt-2 text-lg font-medium text-white">{project.role}</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Timeline</p>
              <p className="mt-2 text-lg font-medium text-white">{project.timeline}</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Tech</p>
              <p className="mt-2 font-mono text-sm leading-6 text-white/55">
                {project.tech.join("  ·  ")}
              </p>
            </div>
          </div>
        </section>

        {/* ── CASE STUDY + MEDIA ── */}
        <section className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-0">
            <div className="border-t border-white/8 pt-10">
              <SectionHeading
                eyebrow="Case Study"
                title="What needed to be solved."
                description={project.problem}
              />
            </div>

            <div className="mt-10 border-l-2 border-[rgba(148,213,174,0.3)] pl-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Solution approach
              </p>
              <p className="mt-4 text-base leading-7 text-white/70">
                {project.solution}
              </p>
            </div>

            <div className="mt-8 border-l-2 border-white/10 pl-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Outcomes
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-white/65">
                {project.outcomes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-white/20 select-none">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/8 pt-10">
            <SectionHeading
              eyebrow="Media"
              title="Inside the product."
              description="Screenshots and demos from the actual build."
            />
            <div className="mt-10 grid gap-6">
              {project.media.map((item, index) => (
                <Reveal key={`${project.slug}-${item.alt}`} delay={index * 0.06}>
                  <ProjectMediaFrame item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPACT ── numbered accent blocks */}
        <section className="mt-10 border-t border-white/8 pt-10">
          <SectionHeading
            eyebrow="Impact Summary"
            title="What this project delivered."
            description="The outcomes that mattered, at a glance."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {project.impact.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <div className="h-full border-t-2 border-[rgba(148,213,174,0.2)] pt-4 transition-colors duration-300 hover:border-[rgba(148,213,174,0.45)]">
                  <span className="font-display text-3xl font-light text-white/[0.08]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-white/65">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="secondary">
              <Link href="/">
                Continue exploring portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
