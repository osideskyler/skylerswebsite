import { Play, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import type { ProjectMedia } from "@/content/site-data";
import { cn } from "@/lib/utils";

type ProjectMediaProps = {
  item: ProjectMedia;
  className?: string;
};

export function ProjectMediaFrame({ item, className }: ProjectMediaProps) {
  const isVideo = item.type === "video";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(145deg,rgba(20,32,46,0.92),rgba(7,11,18,0.98))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(87,153,123,0.25),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
        {item.src ? (
          isVideo ? (
            <video
              className="h-full w-full object-cover"
              controls
              poster={item.poster}
              preload="metadata"
            >
              <source src={item.src} />
            </video>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          )
        ) : (
          <div className="flex h-full w-full items-end justify-between p-6">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/10">
                {isVideo ? (
                  <Play className="h-5 w-5 text-white/90" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-white/90" />
                )}
              </div>
              <p className="max-w-xs text-lg font-medium text-white">
                {item.placeholder}
              </p>
            </div>
            <div className="h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(122,211,163,0.55),transparent_68%)] blur-xl" />
          </div>
        )}
      </div>
      <p className="mt-4 text-sm leading-6 text-white/65">{item.caption}</p>
    </div>
  );
}
