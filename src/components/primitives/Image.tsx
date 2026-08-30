import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Image` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Image, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Image entry in `COMPONENTS.md`.
 */
export interface ImageProps {
  className?: string;
  children?: React.ReactNode;
}

export const Image = React.forwardRef<HTMLElement, ImageProps>(function Image(_props, _ref) {
  throw new Error(
    'Image is not implemented yet. See COMPONENTS.md § Component: Image, and src/components/primitives/Image.tsx.',
  );
});

Image.displayName = 'Image';
