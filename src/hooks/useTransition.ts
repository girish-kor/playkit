import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { useLoadingProgress } from './useLoadingProgress';
import { useLatest } from '../internal/useLatest';

/**
 * Hook for scene transitions with progress (COMPONENTS.md § Hook: useTransition).
 * `target` is not validated against the project's registered scenes at call time — an
 * unresolved target causes `start()`'s underlying `pcScene.loadScene(target)` call to
 * reject, surfaced via `onError`/`error` rather than failing earlier.
 */
export interface UseTransitionOptions {
  target: string;
  params?: unknown;
  /** Fade duration in ms (default: `500`). Only applies to `variant: 'fade'|'zoom'`. */
  fadeDuration?: number;
  variant?: 'fade' | 'cut' | 'slide' | 'zoom';
  onStart?: () => void;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onError?: (err: Error) => void;
}

export interface UseTransitionResult {
  isLoading: boolean;
  progress: number;
  isComplete: boolean;
  error: Error | null;
  start: () => void;
}

export function useTransition(options: UseTransitionOptions): UseTransitionResult {
  const {
    target,
    params,
    fadeDuration = 500,
    variant = 'fade',
    onStart,
    onProgress,
    onComplete,
    onError,
  } = options;

  const store = usePCStore();
  const scene = useStore(store, (s) => s.scene);
  const app = useStore(store, (s) => s.app);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const { progress } = useLoadingProgress({ pcApp: isLoading ? app : null });

  const onStartRef = useLatest(onStart);
  const onProgressRef = useLatest(onProgress);
  const onCompleteRef = useLatest(onComplete);
  const onErrorRef = useLatest(onError);

  React.useEffect(() => {
    if (isLoading) onProgressRef.current?.(progress);
  }, [progress, isLoading, onProgressRef]);

  const start = React.useCallback(() => {
    setIsLoading(true);
    setIsComplete(false);
    setError(null);
    onStartRef.current?.();

    const finish = () => {
      setIsLoading(false);
      setIsComplete(true);
      onCompleteRef.current?.();
    };

    const fail = (err: unknown) => {
      const e = err instanceof Error ? err : new Error(String(err));
      setIsLoading(false);
      setError(e);
      onErrorRef.current?.(e);
    };

    try {
      const result = scene?.loadScene?.(target, params);
      const settle =
        variant === 'cut' ? Promise.resolve(result) : delay(fadeDuration).then(() => result);
      Promise.resolve(settle).then(finish, fail);
    } catch (err) {
      fail(err);
    }
  }, [scene, target, params, variant, fadeDuration, onStartRef, onCompleteRef, onErrorRef]);

  return { isLoading, progress, isComplete, error, start };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
