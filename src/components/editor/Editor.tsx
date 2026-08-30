import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Editor` (category: Editor).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Editor, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Editor entry in `COMPONENTS.md`.
 */
export interface EditorProps {
  className?: string;
  children?: React.ReactNode;
}

export const Editor = React.forwardRef<HTMLElement, EditorProps>(function Editor(_props, _ref) {
  throw new Error(
    'Editor is not implemented yet. See COMPONENTS.md § Component: Editor, and src/components/editor/Editor.tsx.',
  );
});

Editor.displayName = 'Editor';
