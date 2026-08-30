import * as React from 'react';

/** Stable per-instance identifier, for puzzle components that need a `puzzleId` to pass
 * to the `Puzzle` wrapper they compose internally (docs/REBUILD-GUIDE.md's puzzle
 * build order) without requiring the caller to supply one. Built on `React.useId()`
 * rather than a module-scope counter + ref read, so it stays pure during render. */
export function useStableId(prefix: string): string {
  const reactId = React.useId();
  return `${prefix}-${reactId}`;
}
