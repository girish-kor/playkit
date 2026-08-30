import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { resolveEntity } from '../internal/pcEntity';

/** Camera-forward raycast, throttled (docs/API.md § useRaycaster) — used by `Crosshair`. */
export function useRaycaster(options: { pcCamera: string; throttleRate?: number; mask?: number }): {
  target: unknown;
  intersect: () => unknown;
} {
  const { pcCamera, throttleRate = 33 } = options;
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);

  const [target, setTarget] = React.useState<unknown>(null);

  const intersect = React.useCallback((): unknown => {
    const cameraEntity = resolveEntity(app, scene, pcCamera);
    const cameraComponent = cameraEntity?.camera;
    const physics = app?.systems?.rigidbody;
    if (!cameraComponent?.screenToWorld || !physics?.raycastFirst) return null;

    const from = cameraEntity.getPosition?.();
    const to = cameraComponent.screenToWorld(
      app.graphicsDevice?.width / 2,
      app.graphicsDevice?.height / 2,
      cameraComponent.farClip,
    );
    const hit = physics.raycastFirst(from, to, options.mask);
    return hit?.entity ?? null;
  }, [app, scene, pcCamera, options.mask]);

  React.useEffect(() => {
    const id = setInterval(() => setTarget(intersect()), throttleRate);
    return () => clearInterval(id);
  }, [intersect, throttleRate]);

  return { target, intersect };
}
