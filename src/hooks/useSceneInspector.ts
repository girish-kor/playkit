import * as React from 'react';

/** Live scene-hierarchy reader (docs/API.md § useSceneInspector) — used by `Inspector`. */
export function useSceneInspector(options: { pcScene: unknown }): {
  entities: unknown[];
  refresh: () => void;
} {
  const [, forceRefresh] = React.useReducer((n: number) => n + 1, 0);

  const entities = React.useMemo(() => {
    const scene = options.pcScene as { root?: { children?: unknown[] } } | undefined;
    return scene?.root?.children ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recomputed on demand via `refresh`, not on every `pcScene` identity change.
  }, [options.pcScene, forceRefresh]);

  return { entities, refresh: () => forceRefresh() };
}
