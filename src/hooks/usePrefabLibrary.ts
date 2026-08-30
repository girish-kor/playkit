import * as React from 'react';

import type { Prefab } from '../types';

/** Available-prefab registry (docs/API.md § usePrefabLibrary) — used by `Palette`. */
export function usePrefabLibrary(options: { pcApp: unknown }): {
  prefabs: Prefab[];
  categories: string[];
  load: (id: string) => Prefab | undefined;
} {
  const prefabs = React.useMemo<Prefab[]>(() => {
    const app = options.pcApp as { assets?: { list?: () => unknown[] } } | undefined;
    const assets = (app?.assets?.list?.() ?? []) as Array<{
      id: string;
      name: string;
      type: string;
      data?: unknown;
    }>;
    return assets
      .filter((asset) => asset.type === 'template' || asset.type === 'prefab')
      .map((asset) => ({ id: asset.id, name: asset.name, data: asset.data }));
  }, [options.pcApp]);

  const categories = React.useMemo(
    () =>
      Array.from(new Set(prefabs.map((p) => p.category).filter((c): c is string => Boolean(c)))),
    [prefabs],
  );

  const load = React.useCallback((id: string) => prefabs.find((p) => p.id === id), [prefabs]);

  return { prefabs, categories, load };
}
