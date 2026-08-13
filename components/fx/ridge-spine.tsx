"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

/**
 * Document-length topographic contour. Stations are marked in the page with
 * `[data-ridge]`; this component interpolates a single path through them and
 * draws it as you scroll. One stroke. Everything else stays quiet.
 *
 * `data-ridge-side="gutter"` (default) keeps the line in the page margin.
 * `data-ridge-side="anchor"` pins to the element's own box (timeline dots, CTA).
 */
function catmullRomToBezier(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 8;
    const cp1y = p1.y + (p2.y - p0.y) / 8;
    const cp2x = p2.x - (p3.x - p1.x) / 8;
    const cp2y = p2.y - (p3.y - p1.y) / 8;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function collectStations(): Point[] {
  const stations = [
    ...document.querySelectorAll<HTMLElement>("[data-ridge]"),
  ];
  if (stations.length === 0) return [];

  const main = document.querySelector("main");
  const mainRect = main?.getBoundingClientRect();
  const isMobile = window.innerWidth < 768;
  const gutterX = isMobile
    ? 16
    : Math.max(22, (mainRect?.left ?? 48) - 20);

  return stations.map((el) => {
    const rect = el.getBoundingClientRect();
    const side = el.dataset.ridgeSide ?? "gutter";
    const yAlign = Number(el.dataset.ridgeY ?? "0.18");
    const inset = Number(el.dataset.ridgeInset ?? "7");
    const x =
      side === "anchor"
        ? rect.left + window.scrollX + inset
        : gutterX;
    return {
      x,
      y: rect.top + window.scrollY + rect.height * yAlign,
    };
  });
}

export function RidgeSpine() {
  const pathRef = useRef<SVGPathElement>(null);
  const [d, setD] = useState("");
  const [head, setHead] = useState<Point>({ x: -20, y: -20 });
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 26,
    restDelta: 0.001,
  });
  const groupY = useTransform(scrollY, (value) => -value);

  const measure = useCallback(() => {
    const points = collectStations();
    setD(catmullRomToBezier(points));
  }, []);

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(measure);
    const onLoad = () => measure();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", measure);

    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);

    const fonts = document.fonts;
    if (fonts?.ready) {
      void fonts.ready.then(measure);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  const updateHead = useCallback(
    (value: number) => {
      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      if (!len) return;
      const t = Math.max(0, Math.min(1, value));
      const point = path.getPointAtLength(t * len);
      setHead({ x: point.x, y: point.y });
    },
    [],
  );

  useMotionValueEvent(progress, "change", updateHead);

  useLayoutEffect(() => {
    updateHead(reduceMotion ? 1 : progress.get());
  }, [d, progress, reduceMotion, updateHead]);

  if (!d) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[12] h-screen w-screen overflow-hidden"
    >
      <defs>
        <linearGradient id="ridge-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ad5ae" />
          <stop offset="45%" stopColor="#78bae6" />
          <stop offset="100%" stopColor="#9ad5ae" />
        </linearGradient>
        <filter id="ridge-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.g style={{ y: groupY }}>
        <path
          d={d}
          fill="none"
          stroke="url(#ridge-stroke)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.1"
        />
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="url(#ridge-stroke)"
          strokeWidth="1.7"
          strokeLinecap="round"
          pathLength={1}
          filter="url(#ridge-glow)"
          style={{ pathLength: reduceMotion ? 1 : progress }}
        />
        <circle
          cx={head.x}
          cy={head.y}
          r="3.25"
          fill="#9ad5ae"
          filter="url(#ridge-glow)"
        />
      </motion.g>
    </svg>
  );
}
