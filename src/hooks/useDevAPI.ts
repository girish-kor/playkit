/**
 * Shared dev-tooling API (docs/API.md § useDevAPI) — the hook behind `DevTools`,
 * `PerformanceMonitor`, `AssetViewer`. `COMPONENTS.md` documents this return shape
 * with a literal `...`, i.e. explicitly incomplete — do not assume members beyond
 * `inspect`/`getScene` without a spec update.
 */
export function useDevAPI(options: { pcApp: unknown }): {
  inspect: (entity: unknown) => unknown;
  getScene: () => unknown;
} {
  const app = options.pcApp as { scene?: unknown } | undefined;
  return {
    inspect: (entity: unknown) => entity,
    getScene: () => app?.scene ?? null,
  };
}
