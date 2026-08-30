import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';

/**
 * Forwards touch-driven movement into the PlayCanvas app (docs/API.md §
 * useTouchBridge) — used by `Touch`, `Joystick`. Fires a custom `touch:start` /
 * `touch:move` / `touch:end` event on the app (mirroring `useEvent`'s
 * `entity.fire(event)` convention) rather than a specific `pc.TouchDevice` API, since
 * neither `Touch` nor `Joystick` binds to one particular entity.
 */
export interface UseTouchBridgeResult {
  sendTouchStart: (data: { x: number; y: number; id?: string | number }) => void;
  sendTouchMove: (data: { x: number; y: number; id?: string | number }) => void;
  sendTouchEnd: (data: { id?: string | number }) => void;
}

export function useTouchBridge(): UseTouchBridgeResult {
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);

  return {
    sendTouchStart: (data) => app?.fire?.('touch:start', data),
    sendTouchMove: (data) => app?.fire?.('touch:move', data),
    sendTouchEnd: (data) => app?.fire?.('touch:end', data),
  };
}
