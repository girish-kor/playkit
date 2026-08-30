import * as React from 'react';

import { useAnnounce } from '../../hooks/useAnnounce';
import { cn } from '../../internal/cn';
import { mergeRefs } from '../../internal/mergeRefs';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';

/**
 * Wrapper that announces dynamic content changes via `aria-live` (COMPONENTS.md §
 * Component: LiveRegion). Watches `children`'s rendered text content via a
 * `MutationObserver` (per its own "Composition" field) rather than composing
 * `ScreenReader`, since it announces content the caller renders rather than an
 * explicit `message` prop.
 */
export type LiveRegionPriority = 'polite' | 'assertive';
export type LiveRegionRelevant = 'additions' | 'removals' | 'text' | 'all';

export interface LiveRegionProps {
  children: React.ReactNode;
  priority?: LiveRegionPriority;
  atomic?: boolean;
  relevant?: LiveRegionRelevant[];
  pcEntity?: string;
  debounce?: number;
  className?: string;
  visuallyHidden?: boolean;
  onAnnounce?: (text: string) => void;
}

export const LiveRegion = React.forwardRef<HTMLDivElement, LiveRegionProps>(function LiveRegion(
  {
    children,
    priority = 'polite',
    atomic = true,
    relevant = ['additions', 'text'],
    debounce = 100,
    className,
    visuallyHidden = false,
    onAnnounce,
  },
  ref,
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { announce } = useAnnounce({ debounce });
  const onAnnounceRef = useLatest(onAnnounce);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof MutationObserver === 'undefined') return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const text = node.textContent?.trim() ?? '';
        if (!text) return;
        announce(text, priority);
        onAnnounceRef.current?.(text);
      }, debounce);
    });

    observer.observe(node, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [announce, priority, debounce, onAnnounceRef]);

  return (
    <Box
      ref={mergeRefs(containerRef, ref)}
      aria-live={priority}
      aria-atomic={atomic}
      aria-relevant={relevant.join(' ') as React.AriaAttributes['aria-relevant']}
      className={cn(visuallyHidden && 'sr-only', className)}
    >
      {children}
    </Box>
  );
});

LiveRegion.displayName = 'LiveRegion';
