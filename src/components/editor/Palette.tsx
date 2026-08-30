import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Palette` (category: Editor).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Palette, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Palette entry in `COMPONENTS.md`.
 */
export interface PaletteProps {
  className?: string;
  children?: React.ReactNode;
}

export const Palette = React.forwardRef<HTMLElement, PaletteProps>(function Palette(_props, _ref) {
  throw new Error(
    'Palette is not implemented yet. See COMPONENTS.md § Component: Palette, and src/components/editor/Palette.tsx.',
  );
});

Palette.displayName = 'Palette';
