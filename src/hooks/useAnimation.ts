import * as React from 'react';

/**
 * requestAnimationFrame-driven tweening (docs/API.md § useAnimation). Frame-driven,
 * not time-guaranteed — under sustained frame drops the visual duration can stretch
 * beyond `duration` (docs/PERFORMANCE.md's documented caveat on `Health`/`Energy`).
 */
export interface UseAnimationOptions {
  from: number;
  to: number;
  duration: number;
  easing?: (t: number) => number;
}

const linear = (t: number) => t;

export function useAnimation(options: UseAnimationOptions): {
  value: number;
  isAnimating: boolean;
} {
  const { from, to, duration, easing = linear } = options;
  const [value, setValue] = React.useState(from);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    let rafId: number;
    const start = performance.now();
    setIsAnimating(true);

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, duration <= 0 ? 1 : elapsed / duration);
      setValue(from + (to - from) * easing(t));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setIsAnimating(false);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [from, to, duration, easing]);

  return { value, isAnimating };
}
