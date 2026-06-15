"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** Border radius for the hover sheen overlay, matching the child card. */
  radiusClassName?: string;
};

/** 3D-tilts its child toward the cursor with a light sheen that tracks it. */
export function Tilt({
  children,
  className,
  max = 6,
  radiusClassName = "rounded-[2rem]",
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 18 });
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.10), transparent 65%)`;

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        className="group/tilt relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || !ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          rotateY.set((px - 0.5) * 2 * max);
          rotateX.set(-(py - 0.5) * 2 * max);
          glowX.set(px * 100);
          glowY.set(py * 100);
        }}
        onPointerLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
      >
        {children}
        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100",
            radiusClassName,
          )}
          style={{ background: sheen }}
        />
      </motion.div>
    </div>
  );
}
