import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { resolveEntity } from '../internal/pcEntity';

/** World-to-screen projection (docs/API.md § useCameraProjection) — used by `HUD`, `DamageNumbers`, `Minimap`. */
export function useCameraProjection(options: { pcCamera: string }): {
  project: (worldPos: { x: number; y: number; z: number }) => { x: number; y: number };
} {
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);

  const project = (worldPos: { x: number; y: number; z: number }): { x: number; y: number } => {
    const cameraEntity = resolveEntity(app, scene, options.pcCamera);
    const cameraComponent = cameraEntity?.camera;
    if (cameraComponent?.worldToScreen) {
      const screenPos = { x: 0, y: 0, z: 0 };
      cameraComponent.worldToScreen(worldPos, screenPos);
      return { x: screenPos.x, y: screenPos.y };
    }
    return { x: worldPos.x, y: worldPos.y };
  };

  return { project };
}
