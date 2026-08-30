import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Avatar` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Avatar, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Avatar entry in `COMPONENTS.md`.
 */
export interface AvatarProps {
  className?: string;
  children?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLElement, AvatarProps>(function Avatar(_props, _ref) {
  throw new Error(
    'Avatar is not implemented yet. See COMPONENTS.md § Component: Avatar, and src/components/primitives/Avatar.tsx.',
  );
});

Avatar.displayName = 'Avatar';
