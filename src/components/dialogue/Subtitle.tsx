import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Subtitle` (category: Dialogue).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Subtitle, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Subtitle entry in `COMPONENTS.md`.
 */
export interface SubtitleProps {
  className?: string;
  children?: React.ReactNode;
}

export const Subtitle = React.forwardRef<HTMLElement, SubtitleProps>(
  function Subtitle(_props, _ref) {
    throw new Error(
      'Subtitle is not implemented yet. See COMPONENTS.md § Component: Subtitle, and src/components/dialogue/Subtitle.tsx.',
    );
  },
);

Subtitle.displayName = 'Subtitle';
