"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeroTitleProps = {
  name: string;
};

/**
 * Oversized stacked name whose fill tracks the dusk light.
 * Letters rise once; the gradient keeps moving with the landscape.
 */
export function HeroTitle({ name }: HeroTitleProps) {
  const reduceMotion = useReducedMotion();
  const lines = name.trim().split(/\s+/);

  return (
    <h1
      aria-label={name}
      className="font-display font-medium leading-[0.82] tracking-[-0.045em]"
    >
      {lines.map((line, lineIndex) => (
        <span key={line} className="block">
          {line.split("").map((letter, letterIndex) => (
            <span
              key={`${line}-${letterIndex}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className="hero-name inline-block will-change-transform"
                initial={reduceMotion ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.08 + lineIndex * 0.12 + letterIndex * 0.035,
                }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
