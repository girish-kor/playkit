import * as React from 'react';

/** Character-by-character text reveal (docs/API.md § useTypewriter) — used by `Dialogue`. */
export interface UseTypewriterOptions {
  text: string;
  /** Characters per second (default: `30`, matching `Dialogue`'s documented default —
   * see docs/PERFORMANCE.md). */
  speed?: number;
  autoStart?: boolean;
}

export function useTypewriter(options: UseTypewriterOptions): {
  displayed: string;
  isComplete: boolean;
  start: () => void;
  skip: () => void;
} {
  const { text, speed = 30, autoStart = true } = options;
  const [displayedCount, setDisplayedCount] = React.useState(autoStart ? 0 : text.length);
  const [running, setRunning] = React.useState(autoStart);

  React.useEffect(() => {
    setDisplayedCount(0);
    setRunning(autoStart);
  }, [text, autoStart]);

  React.useEffect(() => {
    if (!running || displayedCount >= text.length) return;
    const msPerChar = 1000 / Math.max(speed, 1);
    const id = setTimeout(() => setDisplayedCount((c) => Math.min(c + 1, text.length)), msPerChar);
    return () => clearTimeout(id);
  }, [running, displayedCount, text, speed]);

  return {
    displayed: text.slice(0, displayedCount),
    isComplete: displayedCount >= text.length,
    start: () => setRunning(true),
    skip: () => setDisplayedCount(text.length),
  };
}
