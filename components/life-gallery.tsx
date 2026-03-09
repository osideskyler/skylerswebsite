"use client";

const VIDEO_EXTENSIONS = /\.(mp4|webm)$/i;

type LifeGalleryProps = {
  mediaPaths: string[];
};

function GalleryItem({ src }: { src: string }) {
  const isVideo = VIDEO_EXTENSIONS.test(src);

  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-[0_8px_26px_rgba(0,0,0,0.34)] sm:mb-5">
      {isVideo ? (
        <video
          src={`/images/about/${src}`}
          autoPlay
          muted
          loop
          playsInline
          className="block h-auto w-full transition-transform duration-300 ease-out hover:scale-[1.02]"
        />
      ) : (
        // The collage uses native dimensions to keep each photo's real aspect ratio.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/about/${src}`}
          alt=""
          loading="lazy"
          className="block h-auto w-full transition-transform duration-300 ease-out hover:scale-[1.02]"
        />
      )}
    </div>
  );
}

export function LifeGallery({ mediaPaths }: LifeGalleryProps) {
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
    <div className={`w-full ${masonryColumns} gap-4 sm:gap-5`}>
      {mediaPaths.map((src) => (
        <GalleryItem key={src} src={src} />
      ))}
    </div>
  );
}
