"use client";

import { TypewriterCaret, useTypewriterName } from "@/components/fx/use-typewriter-name";

export function TypewriterName() {
  const { displayed, cursorState } = useTypewriterName();

  return (
    <span>
      {displayed}
      <TypewriterCaret state={cursorState} />
    </span>
  );
}
