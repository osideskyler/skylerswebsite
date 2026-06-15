"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import type { ReactNode } from "react";

type ScrollSkewProps = {
  children: ReactNode;
  className?: string;
  /** Max skew in degrees at high scroll velocity. */
  max?: number;
};

/** Skews its children with scroll velocity, springing back to rest. */
export function ScrollSkew({ children, className, max = 2.5 }: ScrollSkewProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothed = useSpring(velocity, { stiffness: 120, damping: 30 });
  const skewY = useTransform(smoothed, [-1500, 1500], [-max, max]);

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { skewY }}
    >
      {children}
    </motion.div>
  );
}
