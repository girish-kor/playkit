import * as React from 'react';

/**
 * Scrolls a container to its bottom, optionally re-running when `dependencies` change
 * (docs/API.md § useScrollToBottom) — used by `ScrollArea`, `History`.
 */
export interface UseScrollToBottomOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  dependencies?: unknown[];
  smooth?: boolean;
}

export interface UseScrollToBottomResult {
  scrollToBottom: () => void;
}

export function useScrollToBottom(options: UseScrollToBottomOptions): UseScrollToBottomResult {
  const { containerRef, smooth = false } = options;

  const scrollToBottom = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  }, [containerRef, smooth]);

  return { scrollToBottom };
}
