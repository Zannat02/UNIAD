"use client";

import { useState } from "react";

/**
 * Click the thumbnail -> a dark overlay modal opens with the actual YouTube
 * video embedded (autoplaying) -> visitor never leaves the page. This is
 * NOT a YouTube ad — it's our own thumbnail image acting as a play button
 * for a normal YouTube embed, which is the standard "click to play" pattern.
 */
export default function VideoThumbnail({ youtubeId, thumbnail, label }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${label}`}
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-[#101820]/10 bg-[#101820]/5"
      >
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={label}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#101820]/80 to-[#101820]/60">
            <span className="px-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {label} — video thumbnail placeholder
            </span>
          </div>
        )}

        {/* play button */}
        <span className="absolute inset-0 flex items-center justify-center bg-[#101820]/10 transition-colors group-hover:bg-[#101820]/20">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-[#101820]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101820]/90 p-5"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-sm font-semibold text-white"
            >
              Close ✕
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={label}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}