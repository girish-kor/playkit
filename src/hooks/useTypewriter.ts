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
  // Always start at 0, regardless of `autoStart` -- the mount effect below resets
  // `displayedCount` to 0 on every `text` change (including the initial mount) to
  // support re-triggering the effect for a new line of dialogue, so an
  // `autoStart`-conditional initial count here would only ever survive a single paint
  // before that effect overwrote it back to 0 anyway (a visible full-text-then-blank
  // flash for `autoStart: false`). `running` alone reflects `autoStart`.
  const [displayedCount, setDisplayedCount] = React.useState(0);
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
