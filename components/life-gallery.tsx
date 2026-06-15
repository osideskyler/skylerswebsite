"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Parallax } from "@/components/fx/parallax";

const VIDEO_EXTENSIONS = /\.(mp4|webm)$/i;

// Subtle per-item drift speeds so the collage shifts in layers while scrolling.
const GALLERY_PARALLAX_SPEEDS = [0.12, -0.07, 0.18, 0.03, -0.12, 0.08];

type LifeGalleryProps = {
  mediaPaths: string[];
};

function GalleryItem({
  src,
  index,
  onOpen,
}: {
  src: string;
  index: number;
  onOpen: () => void;
}) {
  const isVideo = VIDEO_EXTENSIONS.test(src);

  return (
    <Parallax
      speed={GALLERY_PARALLAX_SPEEDS[index % GALLERY_PARALLAX_SPEEDS.length]}
      className="mb-4 break-inside-avoid sm:mb-5"
    >
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open photo in fullscreen"
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left shadow-[0_8px_26px_rgba(0,0,0,0.34)]"
    >
      {isVideo ? (
        <video
          src={`/images/about/${src}`}
          autoPlay
          muted
          loop
          playsInline
          className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        // The collage uses native dimensions to keep each photo's real aspect ratio.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/about/${src}`}
          alt=""
          loading="lazy"
          className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      )}
      <span className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/35 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="h-4 w-4 text-white/90" />
      </span>
    </button>
    </Parallax>
  );
}

function Lightbox({
  mediaPaths,
  active,
  onClose,
  onStep,
}: {
  mediaPaths: string[];
  active: number;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const src = mediaPaths[active];
  const isVideo = VIDEO_EXTENSIONS.test(src);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(3,6,10,0.88)] p-4 backdrop-blur-md sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        type="button"
        aria-label="Close viewer"
        className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/5 p-2.5 text-white/80 transition hover:bg-white/15 hover:text-white"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>

      {mediaPaths.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-2 z-10 rounded-full border border-white/15 bg-white/5 p-2.5 text-white/80 transition hover:bg-white/15 hover:text-white sm:left-6"
            onClick={(event) => {
              event.stopPropagation();
              onStep(-1);
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-2 z-10 rounded-full border border-white/15 bg-white/5 p-2.5 text-white/80 transition hover:bg-white/15 hover:text-white sm:right-6"
            onClick={(event) => {
              event.stopPropagation();
              onStep(1);
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={src}
          className="flex max-h-full max-w-5xl flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(event) => event.stopPropagation()}
        >
          {isVideo ? (
            <video
              src={`/images/about/${src}`}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="max-h-[80vh] w-auto max-w-full rounded-xl shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/about/${src}`}
              alt=""
              className="max-h-[80vh] w-auto max-w-full rounded-xl shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            />
          )}
          <figcaption className="text-xs uppercase tracking-[0.25em] text-white/45">
            {active + 1} / {mediaPaths.length}
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}

export function LifeGallery({ mediaPaths }: LifeGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (direction: number) =>
      setActive((current) =>
        current === null
          ? current
          : (current + direction + mediaPaths.length) % mediaPaths.length,
      ),
    [mediaPaths.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, close, step]);

  if (mediaPaths.length === 0) {
    return null;
  }

  const masonryColumns =
    mediaPaths.length <= 2
      ? "columns-1 sm:columns-2"
      : mediaPaths.length <= 6
        ? "columns-2 lg:columns-3"
        : "columns-2 md:columns-3 xl:columns-4";

  return (
    <>
      <div className={`w-full ${masonryColumns} gap-4 sm:gap-5`}>
        {mediaPaths.map((src, index) => (
          <GalleryItem
            key={src}
            src={src}
            index={index}
            onOpen={() => setActive(index)}
          />
        ))}
      </div>
      <AnimatePresence>
        {active !== null ? (
          <Lightbox
            mediaPaths={mediaPaths}
            active={active}
            onClose={close}
            onStep={step}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
