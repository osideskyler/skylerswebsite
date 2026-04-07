import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/content/site-data";

type Pill = { name: string; category: string };

const categoryAccent: Record<string, string> = {
  "Build Stack":
    "border-[rgba(148,213,174,0.35)] bg-[linear-gradient(135deg,rgba(148,213,174,0.12),rgba(148,213,174,0.03))] shadow-[0_0_24px_-8px_rgba(148,213,174,0.35)]",
  "AI and Automation":
    "border-[rgba(120,186,230,0.32)] bg-[linear-gradient(135deg,rgba(120,186,230,0.11),rgba(120,186,230,0.03))] shadow-[0_0_24px_-8px_rgba(120,186,230,0.3)]",
  "Product and Business":
    "border-[rgba(230,190,130,0.3)] bg-[linear-gradient(135deg,rgba(230,190,130,0.1),rgba(230,190,130,0.02))] shadow-[0_0_24px_-8px_rgba(230,190,130,0.28)]",
};

function flattenSkills(groups: SkillGroup[]): Pill[] {
  return groups.flatMap((g) =>
    g.items.map((name) => ({ name, category: g.title })),
  );
}

function PillSpan({ pill }: { pill: Pill }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-tight text-white/85 backdrop-blur-sm transition-[box-shadow,transform] duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]",
        categoryAccent[pill.category] ?? "border-white/15 bg-white/[0.04]",
      )}
    >
      <span className="max-w-[14rem] truncate sm:max-w-none">{pill.name}</span>
    </span>
  );
}

function MarqueeRow({
  pills,
  className,
  durationClass,
}: {
  pills: Pill[];
  className?: string;
  durationClass: string;
}) {
  const track = (keyPrefix: string) =>
    pills.map((pill, i) => (
      <PillSpan key={`${keyPrefix}-${pill.name}-${pill.category}-${i}`} pill={pill} />
    ));

  return (
    <div
      className={cn(
        "group/marquee relative min-w-0 overflow-hidden py-1",
        "[--marquee-gap:0.75rem]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,hsl(var(--background))_0%,transparent_100%)] sm:w-24"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,hsl(var(--background))_0%,transparent_100%)] sm:w-24"
        aria-hidden
      />

      <div
        className={cn(
          "flex w-max flex-nowrap will-change-transform",
          "skills-marquee-track",
          durationClass,
          "group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        <div className="flex w-max flex-nowrap gap-[var(--marquee-gap)] pr-[var(--marquee-gap)]">
          {track("a")}
        </div>
        <div
          className="flex w-max flex-nowrap gap-[var(--marquee-gap)] pr-[var(--marquee-gap)]"
          aria-hidden
        >
          {track("b")}
        </div>
      </div>
    </div>
  );
}

export function SkillsMarquee({ groups }: { groups: SkillGroup[] }) {
  const pills = flattenSkills(groups);
  const altOrder = [...pills.slice(Math.floor(pills.length / 2)), ...pills.slice(0, Math.floor(pills.length / 2))];

  const flatList = pills.map((p) => p.name).join(", ");

  return (
    <div className="relative mt-10 w-full min-w-0 max-w-full">
      <p className="sr-only">Technical skills and tools: {flatList}.</p>

      <div className="section-shell w-full min-w-0 max-w-full overflow-hidden border-[rgba(148,213,174,0.12)] bg-[linear-gradient(165deg,rgba(12,18,26,0.95),rgba(6,10,16,0.88))] px-0 py-6 sm:py-8">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.45] [background-image:radial-gradient(circle_at_20%_0%,rgba(148,213,174,0.09),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(120,186,230,0.06),transparent_40%)]" />

        <div className="relative flex min-w-0 flex-col gap-5 sm:gap-6">
          <MarqueeRow pills={pills} durationClass="skills-marquee-duration-a" />
          <MarqueeRow pills={altOrder} durationClass="skills-marquee-duration-b" />
        </div>
      </div>
    </div>
  );
}
