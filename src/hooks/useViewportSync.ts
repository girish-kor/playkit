import { useViewport } from './useViewport';

/** Viewport-size sync for `Responsive`/`OrientationLock` (docs/API.md § useViewportSync). */
export function useViewportSync(): { width: number; height: number } {
  const { width, height } = useViewport();
  return { width, height };
}
