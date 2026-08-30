import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { findScriptOwning, pollUntilResolved, resolveEntity } from '../internal/pcEntity';
import { useLatest } from '../internal/useLatest';

/**
 * Bidirectional state sync with PlayCanvas with conflict resolution (COMPONENTS.md §
 * Hook: useSync). Built from `useEntity` + `useScript`'s resolution strategy per
 * docs/API.md ("Built from useEntity + useScript"). `prop` is not validated — an
 * unresolved prop reads as `undefined` and writes are dropped silently.
 */
export interface UseSyncOptions {
  entityId: string;
  prop: string;
  /** Seeds the hook's own `value` on first resolution; the hook owns `value` after
   * that (mirrors every other `use<Domain>Sync` hook's {value, setValue} shape). */
  localValue: unknown;
  syncDirection?: 'both' | 'toPC' | 'fromPC';
  /** Write debounce in ms (default: `100`) — also the remote-poll interval, since
   * PlayCanvas doesn't push property-change notifications generically. */
  debounce?: number;
  conflictStrategy?: 'local' | 'remote' | 'merge';
  onSync?: (value: unknown) => void;
  onConflict?: (local: unknown, remote: unknown) => void;
  onChange?: (value: unknown) => void;
}

export interface UseSyncResult {
  value: unknown;
  setValue: (v: unknown) => void;
  isLocal: boolean;
  isRemote: boolean;
  hasConflict: boolean;
}

function readRemote(target: any, prop: string): unknown {
  return target ? target[prop] : undefined;
}

function writeRemote(target: any, prop: string, next: unknown): void {
  if (target) target[prop] = next;
}

function mergeValues(local: unknown, remote: unknown): unknown {
  if (
    typeof local === 'object' &&
    local !== null &&
    typeof remote === 'object' &&
    remote !== null &&
    !Array.isArray(local) &&
    !Array.isArray(remote)
  ) {
    // Merge strategy: combine local and remote, preferring remote for new keys and
    // local for existing keys (docs/API.md's exact wording for useSync's 'merge').
    return { ...remote, ...local };
  }
  return local;
}

export function useSync(options: UseSyncOptions): UseSyncResult {
  const {
    entityId,
    prop,
    localValue,
    syncDirection = 'both',
    debounce = 100,
    conflictStrategy = 'local',
    onSync,
    onConflict,
    onChange,
  } = options;

  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);

  const [value, setValueState] = React.useState<unknown>(localValue);
  const [isLocal, setIsLocal] = React.useState(false);
  const [isRemote, setIsRemote] = React.useState(false);
  const [hasConflict, setHasConflict] = React.useState(false);

  const onSyncRef = useLatest(onSync);
  const onConflictRef = useLatest(onConflict);
  const onChangeRef = useLatest(onChange);

  const targetRef = React.useRef<any>(null);
  const lastKnownRemoteRef = React.useRef<unknown>(undefined);
  const pendingLocalRef = React.useRef<{ value: unknown } | null>(null);

  React.useEffect(() => {
    return pollUntilResolved(
      () => resolveEntity(app, scene, entityId),
      (entity) => {
        const target = findScriptOwning(entity, prop) ?? entity;
        targetRef.current = target;
        lastKnownRemoteRef.current = readRemote(target, prop);
      },
    );
  }, [app, scene, entityId, prop]);

  React.useEffect(() => {
    const tick = () => {
      const target = targetRef.current;
      if (!target) return;

      const remoteNow = readRemote(target, prop);
      const remoteChanged = remoteNow !== lastKnownRemoteRef.current;
      const pending = pendingLocalRef.current;

      if (remoteChanged && (syncDirection === 'fromPC' || syncDirection === 'both')) {
        if (syncDirection === 'both' && pending) {
          setHasConflict(true);
          onConflictRef.current?.(pending.value, remoteNow);
          const resolved =
            conflictStrategy === 'remote'
              ? remoteNow
              : conflictStrategy === 'merge'
                ? mergeValues(pending.value, remoteNow)
                : pending.value;
          setValueState(resolved);
          onChangeRef.current?.(resolved);
        } else {
          setHasConflict(false);
          setValueState(remoteNow);
          setIsRemote(true);
          setIsLocal(false);
          onChangeRef.current?.(remoteNow);
        }
        lastKnownRemoteRef.current = remoteNow;
      }

      if (pending && (syncDirection === 'toPC' || syncDirection === 'both')) {
        writeRemote(target, prop, pending.value);
        lastKnownRemoteRef.current = pending.value;
        pendingLocalRef.current = null;
        setIsLocal(true);
        setIsRemote(false);
        onSyncRef.current?.(pending.value);
      }
    };

    const id = setInterval(tick, Math.max(debounce, 16));
    return () => clearInterval(id);
  }, [syncDirection, conflictStrategy, debounce, prop, onConflictRef, onSyncRef, onChangeRef]);

  const setValue = React.useCallback(
    (next: unknown) => {
      setValueState(next);
      onChangeRef.current?.(next);
      pendingLocalRef.current = { value: next };
    },
    [onChangeRef],
  );

  return { value, setValue, isLocal, isRemote, hasConflict };
}
