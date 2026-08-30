import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ScreenReader` (category: Accessibility).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ScreenReader, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ScreenReader entry in `COMPONENTS.md`.
 */
export interface ScreenReaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const ScreenReader = React.forwardRef<HTMLElement, ScreenReaderProps>(
  function ScreenReader(_props, _ref) {
    throw new Error(
      'ScreenReader is not implemented yet. See COMPONENTS.md § Component: ScreenReader, and src/components/accessibility/ScreenReader.tsx.',
    );
  },
);

ScreenReader.displayName = 'ScreenReader';
