"use client";

import { TypewriterCaret, useTypewriterName } from "@/components/fx/use-typewriter-name";

type HeroTitleProps = {
  name: string;
};

function GradientLine({
  text,
  placeholder,
  showCaret,
  cursorState,
}: {
  text: string;
  placeholder: string;
  showCaret: boolean;
  cursorState: ReturnType<typeof useTypewriterName>["cursorState"];
}) {
  return (
    <span className="grid">
      <span className="invisible col-start-1 row-start-1">{placeholder}</span>
      <span className="col-start-1 row-start-1">
        {text ? <span className="hero-name">{text}</span> : null}
        {showCaret ? (
          <TypewriterCaret
            state={cursorState}
            variant="bar"
            className="text-[#f4f1ea]"
          />
        ) : null}
      </span>
    </span>
  );
}

/**
 * Oversized stacked name, typed in with a dusk wash across each line.
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
      className="font-display font-medium leading-[0.82] tracking-[-0.045em]"
    >
      <GradientLine
        text={first}
        placeholder={firstName ?? ""}
        showCaret={!onSecondLine}
        cursorState={cursorState}
      />
      <GradientLine
        text={second}
        placeholder={lastName ?? ""}
        showCaret={onSecondLine}
        cursorState={cursorState}
      />
    </h1>
  );
}
