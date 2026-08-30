import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: AssetViewer` (category: Debug/DevTools).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for AssetViewer, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the AssetViewer entry in `COMPONENTS.md`.
 */
export interface AssetViewerProps {
  className?: string;
  children?: React.ReactNode;
}

export const AssetViewer = React.forwardRef<HTMLElement, AssetViewerProps>(
  function AssetViewer(_props, _ref) {
    throw new Error(
      'AssetViewer is not implemented yet. See COMPONENTS.md § Component: AssetViewer, and src/components/devtools/AssetViewer.tsx.',
    );
  },
);

AssetViewer.displayName = 'AssetViewer';
