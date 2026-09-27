"use client";

import { useState } from "react";

/**
 * Renders `src` as a real <img>. If it fails to load (which happens a lot
 * right now since real photography hasn't been dropped into /public yet),
 * it swaps to a styled placeholder instead of leaving the browser's default
 * broken-image icon on screen — same behavior at every screen size. The
 * day a real file exists at that path, this same code just shows it —
 * no component changes needed.
 */
export default function FallbackImage({
  src,
  alt,
  className,
  placeholderClassName,
  placeholderTextClassName = "text-xs font-medium uppercase tracking-[0.2em]",
  placeholderLabel,
}) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img src={src} alt={alt} onError={() => setErrored(true)} className={className} />
    );
  }

  return (
    <div className={placeholderClassName}>
      <span className={`px-4 text-center ${placeholderTextClassName}`}>{placeholderLabel}</span>
    </div>
  );
}