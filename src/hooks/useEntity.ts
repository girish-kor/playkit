import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import {
  pollUntilResolved,
  readTransform,
  resolveEntity,
  subscribeDestroy,
  subscribeEnabledChange,
  writeTransform,
  type EntityTransform,
} from '../internal/pcEntity';
import { useLatest } from '../internal/useLatest';

/**
 * Hook for PlayCanvas entity access and transform updates (COMPONENTS.md § Hook:
 * useEntity). `entityId` is not validated against the live scene graph — an ID with no
 * matching entity resolves `entity` to `null` rather than throwing, and re-resolves
 * automatically if a matching entity appears later.
 */
export interface UseEntityOptions {
  entityId: string;
  /** Auto-sync transforms every frame (default: `false` — real per-frame cost when
   * multiplied across many entities; enable only when the transform must stay
   * live-mirrored in React state). */
  sync?: boolean;
  /** Debounce time in ms (default: `0`). */
  debounce?: number;
  onUpdate?: (transform: EntityTransform) => void;
  onDestroy?: () => void;
  onEnableChange?: (isEnabled: boolean) => void;
}

export interface UseEntityResult {
  entity: any;
  transform: EntityTransform;
  isEnabled: boolean;
  updateTransform: (t: Partial<EntityTransform>) => void;
}

const EMPTY_TRANSFORM: EntityTransform = { position: null, rotation: null, scale: null };

export function useEntity(options: UseEntityOptions): UseEntityResult {
  const { entityId, sync = false, debounce = 0, onUpdate, onDestroy, onEnableChange } = options;

  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);

  const [entity, setEntity] = React.useState<any>(() => resolveEntity(app, scene, entityId));
  const [transform, setTransform] = React.useState<EntityTransform>(() =>
    entity ? readTransform(entity) : EMPTY_TRANSFORM,
  );
  const [isEnabled, setIsEnabled] = React.useState<boolean>(() => Boolean(entity?.enabled));

  const onUpdateRef = useLatest(onUpdate);
  const onDestroyRef = useLatest(onDestroy);
  const onEnableChangeRef = useLatest(onEnableChange);

  // Resolve (and keep re-resolving until found) whenever the target id or the
  // app/scene identity changes.
  React.useEffect(() => {
    setEntity(resolveEntity(app, scene, entityId));
    return pollUntilResolved(
      () => resolveEntity(app, scene, entityId),
      (resolved) => setEntity(resolved),
    );
  }, [app, scene, entityId]);

  // Enable/disable + destroy subscriptions, scoped to whichever entity is currently
  // resolved.
  React.useEffect(() => {
    if (!entity) return;
    setIsEnabled(Boolean(entity.enabled));
    const unsubscribeEnabled = subscribeEnabledChange(entity, (next) => {
      setIsEnabled(next);
      onEnableChangeRef.current?.(next);
    });
    const unsubscribeDestroy = subscribeDestroy(entity, () => {
      onDestroyRef.current?.();
      setEntity(null);
    });
    return () => {
      unsubscribeEnabled();
      unsubscribeDestroy();
    };
  }, [entity, onEnableChangeRef, onDestroyRef]);

  // Per-frame transform mirroring, only while `sync` is true.
  React.useEffect(() => {
    if (!entity || !sync) return;
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let lastEmit = 0;

    const tick = () => {
      const next = readTransform(entity);
      const emit = () => {
        lastEmit = Date.now();
        setTransform(next);
        onUpdateRef.current?.(next);
      };
      if (debounce > 0) {
        const elapsed = Date.now() - lastEmit;
        if (!timeoutId) {
          timeoutId = setTimeout(
            () => {
              timeoutId = undefined;
              emit();
            },
            Math.max(0, debounce - elapsed),
          );
        }
      } else {
        emit();
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [entity, sync, debounce, onUpdateRef]);

  const updateTransform = React.useCallback(
    (t: Partial<EntityTransform>) => {
      writeTransform(entity, t);
      setTransform((prev) => ({ ...prev, ...t }));
    },
    [entity],
  );

  return { entity, transform, isEnabled, updateTransform };
}
