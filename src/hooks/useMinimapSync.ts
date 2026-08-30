import { useScript } from './useScript';

/** Minimap texture/marker projection sync (docs/API.md § useMinimapSync) — used by `Minimap`. */
export function useMinimapSync(options: { pcCamera?: string; pcEntity?: string } = {}): {
  textureUrl: string | undefined;
  projectMarker: (worldPos: { x: number; y: number; z: number }) => { x: number; y: number };
} {
  const { value } = useScript({
    entityId: options.pcCamera ?? options.pcEntity ?? '',
    stateKey: 'minimapTextureUrl',
  });
  return {
    textureUrl: value as string | undefined,
    // Real projection needs the resolved pc.CameraComponent (see useCameraProjection);
    // this fallback assumes an orthographic top-down camera centered on the origin.
    projectMarker: (worldPos) => ({ x: worldPos.x, y: worldPos.z }),
  };
}
