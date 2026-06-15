"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: string;
  className?: string;
  duration?: number;
};

const NUMERIC_RE = /^([^\d]*)([\d][\d,]*)(.*)$/;

/**
 * Counts the numeric part of a stat up from zero when scrolled into view.
 * Handles values like "98%", "$180k/mo", "500+", "1st", "2 Years"; strings
 * without digits render unchanged.
 */
export function StatCounter({ value, className, duration = 1 }: StatCounterProps) {
  const match = value.match(NUMERIC_RE);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(match ? "0" : value);

  useEffect(() => {
    const parts = value.match(NUMERIC_RE);
    if (!parts || !inView) return;
    const target = parseInt(parts[2].replace(/,/g, ""), 10);
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}
