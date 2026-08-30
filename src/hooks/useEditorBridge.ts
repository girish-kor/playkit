/** Scene-editing operations (docs/API.md § useEditorBridge) — used by `Editor`. */
export function useEditorBridge(options: { pcScene: unknown }): {
  place: (prefab: unknown, position: { x: number; y: number; z: number }) => unknown;
  delete: (entity: unknown) => void;
  transform: (entity: unknown, transform: unknown) => void;
} {
  const scene = options.pcScene as { root?: { addChild?: (e: unknown) => void } } | undefined;

  return {
    place: (prefab: unknown, position) => {
      const instance = prefab as { clone?: () => Record<string, unknown> } | undefined;
      const cloned = instance?.clone?.();
      if (cloned) {
        (cloned as { setPosition?: (p: unknown) => void }).setPosition?.(position);
        scene?.root?.addChild?.(cloned);
      }
      return cloned ?? null;
    },
    delete: (entity: unknown) => (entity as { destroy?: () => void } | undefined)?.destroy?.(),
    transform: (entity: unknown, transform: unknown) => {
      const e = entity as
        | {
            setPosition?: (p: unknown) => void;
            setEulerAngles?: (r: unknown) => void;
            setLocalScale?: (s: unknown) => void;
          }
        | undefined;
      const t = transform as
        { position?: unknown; rotation?: unknown; scale?: unknown } | undefined;
      if (t?.position !== undefined) e?.setPosition?.(t.position);
      if (t?.rotation !== undefined) e?.setEulerAngles?.(t.rotation);
      if (t?.scale !== undefined) e?.setLocalScale?.(t.scale);
    },
  };
}
