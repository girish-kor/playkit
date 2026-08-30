import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Console` (category: Debug/DevTools).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Console, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Console entry in `COMPONENTS.md`.
 */
export interface ConsoleProps {
  className?: string;
  children?: React.ReactNode;
}

export const Console = React.forwardRef<HTMLElement, ConsoleProps>(function Console(_props, _ref) {
  throw new Error(
    'Console is not implemented yet. See COMPONENTS.md § Component: Console, and src/components/devtools/Console.tsx.',
  );
});

Console.displayName = 'Console';
