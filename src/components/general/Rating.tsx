import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Rating` (category: General).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Rating, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Rating entry in `COMPONENTS.md`.
 */
export interface RatingProps {
  className?: string;
  children?: React.ReactNode;
}

export const Rating = React.forwardRef<HTMLElement, RatingProps>(function Rating(_props, _ref) {
  throw new Error(
    'Rating is not implemented yet. See COMPONENTS.md § Component: Rating, and src/components/general/Rating.tsx.',
  );
});

Rating.displayName = 'Rating';
