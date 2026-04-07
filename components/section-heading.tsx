type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[rgba(148,213,174,0.85)]">
          <span className="inline-block h-px w-8 bg-[rgba(148,213,174,0.4)]" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl ${eyebrow ? "mt-4" : "border-l-2 border-[rgba(148,213,174,0.35)] pl-6"}`}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
