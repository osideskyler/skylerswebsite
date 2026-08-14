"use client";

import { TypewriterCaret, useTypewriterName } from "@/components/fx/use-typewriter-name";

type HeroTitleProps = {
  name: string;
};

/**
 * Oversized stacked name, typed in lockstep with the nav wordmark.
 * Layout is reserved so the photo does not jump while letters arrive.
 */
export function HeroTitle({ name }: HeroTitleProps) {
  const { displayed, cursorState } = useTypewriterName();
  const spaceAt = displayed.indexOf(" ");
  const first = spaceAt === -1 ? displayed : displayed.slice(0, spaceAt);
  const onSecondLine = spaceAt !== -1;
  const second = onSecondLine ? displayed.slice(spaceAt + 1) : "";
  const [firstName, lastName] = name.trim().split(/\s+/);

  return (
    <h1
      aria-label={name}
      className="relative font-display font-medium leading-[0.82] tracking-[-0.045em]"
    >
      <span className="invisible block" aria-hidden>
        <span className="block">{firstName}</span>
        <span className="block">{lastName ?? ""}</span>
      </span>
      <span className="absolute inset-0" aria-hidden>
        <span className="block">
          <span className="hero-name">{first}</span>
          {onSecondLine ? null : (
            <TypewriterCaret
              state={cursorState}
              variant="bar"
              className="text-[#f4f1ea]"
            />
          )}
        </span>
        <span className="block">
          <span className="hero-name">{second}</span>
          {onSecondLine ? (
            <TypewriterCaret
              state={cursorState}
              variant="bar"
              className="text-[#f4f1ea]"
            />
          ) : null}
        </span>
      </span>
    </h1>
  );
}
