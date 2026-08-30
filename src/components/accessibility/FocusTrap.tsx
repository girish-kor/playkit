import * as React from 'react';

import { mergeRefs } from '../../internal/mergeRefs';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';

/**
 * Trap focus within modal/dialog and restore on release (COMPONENTS.md § Component:
 * FocusTrap). COMPONENTS.md names `@radix-ui/react-focus-trap` as a dependency, but
 * that package doesn't exist on the npm registry (docs/DEPENDENCIES.md's
 * "Unresolvable dependency" entry) -- implemented here as a self-contained
 * focus-cycling layer (`Tab`/`Shift+Tab` wraparound + `aria-hidden` on siblings)
 * instead. `Modal` uses Radix Dialog's own built-in focus scope rather than this
 * component (see `Modal.tsx`'s doc comment); this is the standalone implementation
 * for direct use (e.g. by `Dialogue`, `ContextMenu`) per COMPONENTS.md's Rebuild Notes.
 */
export type FocusTrapVariant = 'modal' | 'auto';

export interface FocusTrapProps {
  active: boolean;
  children: React.ReactNode;
  returnFocus?: boolean;
  variant?: FocusTrapVariant;
  initialFocus?: string | HTMLElement;
  className?: string;
  onTrap?: () => void;
  onRelease?: () => void;
  onDeactivate?: () => void;
  onFocusOut?: (e: FocusEvent) => void;
  'aria-label'?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(function FocusTrap(
  {
    active,
    children,
    returnFocus = true,
    className,
    initialFocus,
    onTrap,
    onRelease,
    onDeactivate,
    onFocusOut,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  const onTrapRef = useLatest(onTrap);
  const onReleaseRef = useLatest(onRelease);
  const onDeactivateRef = useLatest(onDeactivate);
  const onFocusOutRef = useLatest(onFocusOut);
  const wasActiveRef = React.useRef(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) {
      if (wasActiveRef.current) {
        wasActiveRef.current = false;
        onDeactivateRef.current?.();
        if (returnFocus) {
          previouslyFocusedRef.current?.focus?.();
          onReleaseRef.current?.();
        }
      }
      return;
    }

    wasActiveRef.current = true;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    let initialTarget: HTMLElement | null = null;
    if (typeof initialFocus === 'string') {
      initialTarget = container.querySelector<HTMLElement>(initialFocus);
    } else if (initialFocus instanceof HTMLElement) {
      initialTarget = container.contains(initialFocus) ? initialFocus : null;
    }
    const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    (initialTarget ?? focusables[0])?.focus();

    onTrapRef.current?.();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (e.relatedTarget && container.contains(e.relatedTarget as Node)) return;
      onFocusOutRef.current?.(e);
      const items = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      items[0]?.focus();
    };

    document.addEventListener('keydown', handleKeyDown, true);
    container.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [active, initialFocus, returnFocus, onTrapRef, onReleaseRef, onDeactivateRef, onFocusOutRef]);

  return (
    <Box ref={mergeRefs(containerRef, ref)} aria-label={ariaLabel} className={className}>
      {children}
    </Box>
  );
});

FocusTrap.displayName = 'FocusTrap';
