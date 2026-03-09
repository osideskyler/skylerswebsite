"use client";

import { useState, useEffect } from "react";

const BLINK_COUNT = 5;
const BLINK_DURATION_MS = 1000;

type Step =
  | { kind: "type"; char: string }
  | { kind: "backspace" }
  | { kind: "pause"; ms: number };

// Types "Skyler Smt" → pauses (realization) → backspace → continues "ith"
const SCRIPT: Step[] = [
  { kind: "type", char: "S" },
  { kind: "type", char: "k" },
  { kind: "type", char: "y" },
  { kind: "type", char: "l" },
  { kind: "type", char: "e" },
  { kind: "type", char: "r" },
  { kind: "type", char: " " },
  { kind: "type", char: "S" },
  { kind: "type", char: "m" },
  { kind: "type", char: "t" },   // typo — should be "i"
  { kind: "pause", ms: 500 },    // moment of realization
  { kind: "backspace" },
  { kind: "type", char: "i" },
  { kind: "type", char: "t" },
  { kind: "type", char: "h" },
];

function getDelay(step: Step): number {
  if (step.kind === "pause") return step.ms;
  if (step.kind === "backspace") return 75 + Math.random() * 55;
  if (step.char === " ") return 300 + Math.random() * 130;
  return 55 + Math.random() * 110;
}

export function TypewriterName() {
  const [displayed, setDisplayed] = useState("");
  const [cursorState, setCursorState] = useState<"typing" | "blinking" | "hidden">("typing");

  useEffect(() => {
    let stepIdx = 0;
    let text = "";
    let timeoutId: ReturnType<typeof setTimeout>;

    function next() {
      if (stepIdx >= SCRIPT.length) {
        setCursorState("blinking");
        return;
      }

      const step = SCRIPT[stepIdx];
      const delay = getDelay(step);
      stepIdx++;

      timeoutId = setTimeout(() => {
        if (step.kind === "type") {
          text += step.char;
          setDisplayed(text);
        } else if (step.kind === "backspace") {
          text = text.slice(0, -1);
          setDisplayed(text);
        }
        next();
      }, delay);
    }

    next();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (cursorState !== "blinking") return;
    const id = setTimeout(
      () => setCursorState("hidden"),
      BLINK_COUNT * BLINK_DURATION_MS,
    );
    return () => clearTimeout(id);
  }, [cursorState]);

  return (
    <span>
      {displayed}
      {cursorState !== "hidden" && (
        <span className={cursorState === "blinking" ? "animate-blink" : ""}>|</span>
      )}
    </span>
  );
}
