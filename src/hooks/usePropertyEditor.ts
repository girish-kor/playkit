/**
 * Generic entity-property get/set (docs/API.md § usePropertyEditor) — shared by
 * `Property` and `LightingControls` (the same hook, reused unmodified).
 */
export function usePropertyEditor(options: { entity: unknown }): {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
} {
  const entity = options.entity as Record<string, unknown> | undefined;
  return {
    get: (key: string) => entity?.[key],
    set: (key: string, value: unknown) => {
      if (entity) entity[key] = value;
    },
  };
}
