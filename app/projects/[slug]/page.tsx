import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { ProjectMediaFrame } from "@/components/project-media";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/content/site-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="grid-sheen absolute inset-0" />
      </div>
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-4 sm:gap-10 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
          <Button asChild variant="ghost" className="mb-8 px-0">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </Link>
          </Button>

          <Badge className="mb-4">{project.eyebrow}</Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-8 text-white/76">
            {project.oneLiner}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/64">
            {project.summary}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Role</p>
              <p className="mt-3 text-lg font-medium text-white">{project.role}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Timeline
              </p>
              <p className="mt-3 text-lg font-medium text-white">{project.timeline}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Tech</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge key={item} className="tracking-[0.08em] normal-case text-white/72">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-12">
            <SectionHeading
              eyebrow="Case Study"
              title="What needed to be solved."
              description={project.problem}
            />
            <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                Solution approach
              </p>
              <p className="mt-4 text-base leading-7 text-white/72">
                {project.solution}
              </p>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                Outcomes
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-white/72">
                {project.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-12">
            <SectionHeading
              eyebrow="Media"
              title="Designed to show screenshots and demos cleanly."
              description="These slots are ready for your real assets. Add images or videos into `public/images` and `public/videos`, then point the file paths in `content/site-data.ts` to them."
            />
            <div className="mt-10 grid gap-6">
              {project.media.map((item) => (
                <ProjectMediaFrame key={`${project.slug}-${item.alt}`} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell px-3 py-8 sm:px-8 sm:py-14 lg:px-14">
          <SectionHeading
            eyebrow="Impact Summary"
            title="The most important recruiter-facing takeaways."
            description="These bullet points are intentionally outcome-driven so a recruiter can scan fast and still understand the value of the project."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {project.impact.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-sm leading-6 text-white/74">{item}</p>
              </div>
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
