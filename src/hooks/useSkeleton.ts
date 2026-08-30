import * as React from 'react';

/** Computes the placeholder box's inline style (docs/API.md § useSkeleton) — used by `Skeleton`. */
export function useSkeleton(options: { width?: number | string; height?: number | string } = {}): {
  style: React.CSSProperties;
} {
  const { width, height } = options;
  return { style: { width, height } };
}
