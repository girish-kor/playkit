import * as React from 'react';

/**
 * Hook for PlayCanvas asset-loading progress (docs/API.md § Rendering/utility hooks —
 * "used by LoadScreen, useTransition"). `manifest`, when given, is a list of asset ids
 * to track instead of every asset currently in `pcApp.assets`.
 */
export interface UseLoadingProgressOptions {
  pcApp: any;
  manifest?: string[];
}

export interface UseLoadingProgressResult {
  progress: number;
  isComplete: boolean;
  error: Error | null;
}

function relevantAssets(pcApp: any, manifest?: string[]): any[] {
  const all: any[] = pcApp?.assets?.list?.() ?? [];
  if (!manifest || manifest.length === 0) return all;
  const wanted = new Set(manifest);
  return all.filter((asset) => wanted.has(asset.id) || wanted.has(asset.name));
}

function computeProgress(assets: any[]): number {
  if (assets.length === 0) return 1;
  const loaded = assets.filter((asset) => asset.loaded).length;
  return loaded / assets.length;
}

export function useLoadingProgress(options: UseLoadingProgressOptions): UseLoadingProgressResult {
  const { pcApp, manifest } = options;

  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!pcApp?.assets) {
      setProgress(1);
      return;
    }

    const recompute = () => setProgress(computeProgress(relevantAssets(pcApp, manifest)));
    recompute();

    const onLoad = () => recompute();
    const onError = (_asset: unknown, err: unknown) => {
      setError(err instanceof Error ? err : new Error(String(err)));
    };

    pcApp.assets.on?.('load', onLoad);
    pcApp.assets.on?.('error', onError);
    // Registries that emit progress events directly (loaded, total) during preload.
    const onProgress = (loaded: number, total: number) => {
      if (total > 0) setProgress(loaded / total);
    };
    pcApp.assets.on?.('progress', onProgress);

    return () => {
      pcApp.assets.off?.('load', onLoad);
      pcApp.assets.off?.('error', onError);
      pcApp.assets.off?.('progress', onProgress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcApp, JSON.stringify(manifest)]);

  return { progress, isComplete: progress >= 1, error };
}
