/**
 * Shared PlayCanvas entity-resolution helpers used by every binding hook in
 * `src/hooks/` (useEntity, useScript, useEvent, useSync — per docs/ARCHITECTURE.md's
 * "Sync hook pattern": all binding logic is confined to hooks, factored here to avoid
 * duplicating the same resolve/poll/subscribe logic six times).
 *
 * COMPONENTS.md keeps every PlayCanvas value typed `any` ("will be typed as
 * pc.Application"/"pc.Entity") and never pins the exact engine method used to resolve
 * an `entityId` to a live entity. `app.root.findByGuid(id)` is the real PlayCanvas API
 * for exactly this lookup, so that's what's used here; every call is defensive
 * (optional chaining) so a plain mock object (docs/TESTING.md: "mocking
 * pc.Application/pc.Entity") degrades to the documented no-op instead of throwing.
 */

// Not a documented value — purely an internal retry cadence for "re-resolves
// automatically once the entity appears" (COMPONENTS.md § Hook: useEntity).
export const ENTITY_RESOLVE_POLL_MS = 250;

export function resolveEntity(app: any, scene: any, entityId: string | undefined | null): any {
  if (!entityId) return null;
  return app?.root?.findByGuid?.(entityId) ?? scene?.root?.findByGuid?.(entityId) ?? null;
}

/**
 * Polls until `resolve()` returns a non-null value, then stops. Returns a cleanup
 * function. Used instead of a one-shot lookup so a `pcEntity`/`entityId` that doesn't
 * resolve yet keeps trying rather than staying permanently null once the target entity
 * is added to the scene later (the documented "silent no-op ... until an entity with
 * that ID appears" contract — docs/VALIDATION.md, docs/TROUBLESHOOTING.md).
 */
export function pollUntilResolved<T>(
  resolve: () => T | null,
  onResolved: (value: T) => void,
  intervalMs: number = ENTITY_RESOLVE_POLL_MS,
): () => void {
  const immediate = resolve();
  if (immediate != null) {
    onResolved(immediate);
    return () => {};
  }
  const id = setInterval(() => {
    const value = resolve();
    if (value != null) {
      clearInterval(id);
      onResolved(value);
    }
  }, intervalMs);
  return () => clearInterval(id);
}

export interface EntityTransform {
  position: any;
  rotation: any;
  scale: any;
}

export function readTransform(entity: any): EntityTransform {
  return {
    position: entity?.getPosition?.() ?? null,
    rotation: entity?.getEulerAngles?.() ?? null,
    scale: entity?.getLocalScale?.() ?? null,
  };
}

export function writeTransform(entity: any, transform: Partial<EntityTransform>): void {
  if (!entity) return;
  if (transform.position !== undefined) entity.setPosition?.(transform.position);
  if (transform.rotation !== undefined) entity.setEulerAngles?.(transform.rotation);
  if (transform.scale !== undefined) entity.setLocalScale?.(transform.scale);
}

/** Subscribes to the real PlayCanvas `enable`/`disable` entity events when available. */
export function subscribeEnabledChange(
  entity: any,
  onChange: (isEnabled: boolean) => void,
): () => void {
  if (!entity?.on) return () => {};
  const onEnable = () => onChange(true);
  const onDisable = () => onChange(false);
  entity.on('enable', onEnable);
  entity.on('disable', onDisable);
  return () => {
    entity.off?.('enable', onEnable);
    entity.off?.('disable', onDisable);
  };
}

/** Subscribes to the real PlayCanvas `destroy` entity event when available. */
export function subscribeDestroy(entity: any, onDestroy: () => void): () => void {
  if (!entity?.once) return () => {};
  entity.once('destroy', onDestroy);
  return () => {
    entity.off?.('destroy', onDestroy);
  };
}

/**
 * Resolves a `stateKey` to the script instance that owns it, searching every script
 * attached to the entity's `script` component. COMPONENTS.md's `useScript` documents
 * `stateKey` generically (not scoped to a named script), so this is the resolution
 * strategy chosen to satisfy that: first script instance with a matching own property.
 */
export function findScriptOwning(entity: any, stateKey: string): any {
  const instances = entity?.script?.scripts as unknown[] | undefined;
  if (!instances) return null;
  for (const instance of instances) {
    if (instance && Object.prototype.hasOwnProperty.call(instance, stateKey)) {
      return instance;
    }
  }
  return null;
}
