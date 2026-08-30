import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: TreeView` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for TreeView, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the TreeView entry in `COMPONENTS.md`.
 */
export interface TreeViewProps {
  className?: string;
  children?: React.ReactNode;
}

export const TreeView = React.forwardRef<HTMLElement, TreeViewProps>(
  function TreeView(_props, _ref) {
    throw new Error(
      'TreeView is not implemented yet. See COMPONENTS.md § Component: TreeView, and src/components/primitives/TreeView.tsx.',
    );
  },
);

TreeView.displayName = 'TreeView';
