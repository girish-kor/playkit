import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: History` (category: Dialogue).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for History, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the History entry in `COMPONENTS.md`.
 */
export interface HistoryProps {
  className?: string;
  children?: React.ReactNode;
}

export const History = React.forwardRef<HTMLElement, HistoryProps>(function History(_props, _ref) {
  throw new Error(
    'History is not implemented yet. See COMPONENTS.md § Component: History, and src/components/dialogue/History.tsx.',
  );
});

History.displayName = 'History';
