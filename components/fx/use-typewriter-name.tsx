"use client";

import { useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const BLINK_COUNT = 5;
const BLINK_DURATION_MS = 1000;
const FULL_NAME = "Skyler Smith";

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
  { kind: "type", char: "t" },
  { kind: "pause", ms: 500 },
  { kind: "backspace" },
  { kind: "type", char: "i" },
  { kind: "type", char: "t" },
  { kind: "type", char: "h" },
];

export type CursorState = "typing" | "blinking" | "hidden";

export type TypewriterState = {
  displayed: string;
  cursorState: CursorState;
};

function getDelay(step: Step): number {
  if (step.kind === "pause") return step.ms;
  if (step.kind === "backspace") return 75 + Math.random() * 55;
  if (step.char === " ") return 300 + Math.random() * 130;
  return 55 + Math.random() * 110;
}

const TypewriterContext = createContext<TypewriterState | null>(null);

function useTypewriterPlayback(): TypewriterState {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const [cursorState, setCursorState] = useState<CursorState>("typing");

  useEffect(() => {
    if (reduceMotion !== false) return;

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
      stepIdx += 1;

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
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || cursorState !== "blinking") return;
    const id = setTimeout(
      () => setCursorState("hidden"),
      BLINK_COUNT * BLINK_DURATION_MS,
    );
    return () => clearTimeout(id);
  }, [cursorState, reduceMotion]);

  return useMemo(
    () =>
      reduceMotion
        ? { displayed: FULL_NAME, cursorState: "hidden" as const }
        : { displayed, cursorState },
    [reduceMotion, displayed, cursorState],
  );
}

export function TypewriterProvider({ children }: { children: ReactNode }) {
  const state = useTypewriterPlayback();
  return (
    <TypewriterContext.Provider value={state}>
      {children}
    </TypewriterContext.Provider>
  );
}

export function useTypewriterName(): TypewriterState {
  const shared = useContext(TypewriterContext);
  if (!shared) {
    throw new Error("useTypewriterName must be used within TypewriterProvider");
  }
  return shared;
}

export function TypewriterCaret({
  state,
  className,
  variant = "pipe",
}: {
  state: CursorState;
  className?: string;
  variant?: "pipe" | "bar";
}) {
  if (state === "hidden") return null;
  const blink = state === "blinking" ? "animate-blink" : "";

  if (variant === "bar") {
    return (
      <span
        className={`ml-[0.05em] inline-block h-[0.72em] w-[0.045em] translate-y-[0.05em] bg-current align-baseline ${blink} ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  return (
    <span className={`${blink} ${className ?? ""}`} aria-hidden>
      |
    </span>
  );
}
