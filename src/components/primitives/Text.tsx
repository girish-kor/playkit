import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Text` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Text, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Text entry in `COMPONENTS.md`.
 */
export interface TextProps {
  className?: string;
  children?: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(_props, _ref) {
  throw new Error(
    'Text is not implemented yet. See COMPONENTS.md § Component: Text, and src/components/primitives/Text.tsx.',
  );
});

Text.displayName = 'Text';
