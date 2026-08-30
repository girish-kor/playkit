import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { pollUntilResolved, resolveEntity } from '../internal/pcEntity';

/** Player heading/rotation, recomputed on transform change (docs/API.md § usePlayerRotation) — used by `Compass`. */
export function usePlayerRotation(options: { pcEntity?: string } = {}): {
  heading: number;
  rotation: { x: number; y: number; z: number } | null;
} {
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);

  const [rotation, setRotation] = React.useState<{ x: number; y: number; z: number } | null>(null);

  React.useEffect(() => {
    let rafId: number;
    const stopPolling = pollUntilResolved(
      () => resolveEntity(app, scene, options.pcEntity),
      (entity) => {
        const tick = () => {
          const euler = entity.getEulerAngles?.();
          if (euler) setRotation({ x: euler.x, y: euler.y, z: euler.z });
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
    );
    return () => {
      stopPolling();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [app, scene, options.pcEntity]);

  const heading = React.useMemo(
    () => (rotation ? ((rotation.y % 360) + 360) % 360 : 0),
    [rotation],
  );

  return { heading, rotation };
}
