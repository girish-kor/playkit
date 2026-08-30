import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Tag` (category: General).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Tag, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Tag entry in `COMPONENTS.md`.
 */
export interface TagProps {
  className?: string;
  children?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLElement, TagProps>(function Tag(_props, _ref) {
  throw new Error(
    'Tag is not implemented yet. See COMPONENTS.md § Component: Tag, and src/components/general/Tag.tsx.',
  );
});

Tag.displayName = 'Tag';
