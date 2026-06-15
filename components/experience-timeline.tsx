"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

type ExperienceItem = {
  title: string;
  organization: string;
  location: string;
  dates: string;
  bullets: string[];
};

function TimelineEntry({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  return (
    <motion.div
      className="relative pl-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }}
    >
      <motion.div
        className="absolute left-0 top-[0.45rem] h-[15px] w-[15px] rounded-full border-2 border-[rgba(148,213,174,0.6)] bg-[hsl(var(--background))]"
        style={{ boxShadow: "0 0 16px rgba(148,213,174,0.35)" }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
      />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{experience.title}</h3>
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
    </motion.div>
  );
}

/** Experience timeline whose accent line draws itself as you scroll. */
export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.78", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <div ref={ref} className="relative mt-12">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
      <motion.div
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-[linear-gradient(180deg,#9ad5ae,#78bae6)]"
        style={{ scaleY }}
      />
      <div className="space-y-10">
        {items.map((experience, index) => (
          <TimelineEntry
            key={experience.title}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
