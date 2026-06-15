"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Words rendered with the gradient accent (matched ignoring punctuation). */
  accent?: string[];
};

/**
 * Staggered per-word mask reveal for headings. The viewport trigger lives on
 * the un-transformed container: the words themselves start translated outside
 * their overflow-hidden masks, where an IntersectionObserver would never see
 * them.
 */
export function WordReveal({ text, className, delay = 0, accent }: WordRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-baseline"
        >
          <motion.span
            className={cn(
              "inline-block will-change-transform",
              accent?.includes(word.replace(/[.,!?]/g, "")) && "text-gradient",
            )}
            variants={{
              hidden: { y: "115%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: delay + index * 0.07,
                },
              },
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.span>
  );
}
