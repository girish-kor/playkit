import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: TerrainPainter` (category: Editor).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for TerrainPainter, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the TerrainPainter entry in `COMPONENTS.md`.
 */
export interface TerrainPainterProps {
  className?: string;
  children?: React.ReactNode;
}

export const TerrainPainter = React.forwardRef<HTMLElement, TerrainPainterProps>(
  function TerrainPainter(_props, _ref) {
    throw new Error(
      'TerrainPainter is not implemented yet. See COMPONENTS.md § Component: TerrainPainter, and src/components/editor/TerrainPainter.tsx.',
    );
  },
);

TerrainPainter.displayName = 'TerrainPainter';
