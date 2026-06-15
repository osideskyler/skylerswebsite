"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ParallaxProps = {
  children?: ReactNode;
  className?: string;
  /**
   * Drift strength and direction: positive moves against the scroll
   * (rises as you scroll down), negative trails behind it. ~0.1–0.5.
   */
  speed?: number;
  /** Fade out as the element leaves the top of the viewport. */
  fade?: boolean;
};

/** Scroll-linked vertical drift for layered depth between page elements. */
export function Parallax({
  children,
  className,
  speed = 0.2,
  fade = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = speed * 140;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={
        reduceMotion
          ? undefined
          : { y, opacity: fade ? opacity : undefined }
      }
    >
      {children}
    </motion.div>
  );
}
