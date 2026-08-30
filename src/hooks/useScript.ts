import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { findScriptOwning, pollUntilResolved, resolveEntity } from '../internal/pcEntity';
import { useLatest } from '../internal/useLatest';

/**
 * Hook for PlayCanvas script state access (COMPONENTS.md § Hook: useScript).
 * `stateKey` is not validated against the target script's actual attribute set — a
 * missing key resolves to `initialValue`/`undefined` rather than erroring, since the
 * script may not have loaded yet.
 */
export interface UseScriptOptions {
  entityId: string;
  stateKey: string;
  initialValue?: unknown;
  /** Write debounce in ms (default: `100`). */
  debounce?: number;
  onChange?: (value: unknown) => void;
  onSync?: (value: unknown) => void;
  onError?: (error: Error) => void;
}

export interface UseScriptResult {
  value: unknown;
  setValue: (v: unknown) => void;
  isSynced: boolean;
  isLoading: boolean;
}

export function useScript(options: UseScriptOptions): UseScriptResult {
  const { entityId, stateKey, initialValue, debounce = 100, onChange, onSync, onError } = options;

  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);

  const [scriptInstance, setScriptInstance] = React.useState<any>(null);
  const [value, setValueState] = React.useState<unknown>(initialValue);
  const [isSynced, setIsSynced] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeRef = useLatest(onChange);
  const onSyncRef = useLatest(onSync);
  const onErrorRef = useLatest(onError);
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    setIsLoading(true);
    return pollUntilResolved(
      () => {
        const entity = resolveEntity(app, scene, entityId);
        return entity ? findScriptOwning(entity, stateKey) : null;
      },
      (instance) => {
        setScriptInstance(instance);
        const initial = instance[stateKey] ?? initialValue;
        setValueState(initial);
        setIsSynced(true);
        setIsLoading(false);
        onChangeRef.current?.(initial);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialValue/callbacks read via refs/first-resolution only.
  }, [app, scene, entityId, stateKey]);

  const setValue = React.useCallback(
    (next: unknown) => {
      setValueState(next);
      onChangeRef.current?.(next);
      setIsSynced(false);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        try {
          if (scriptInstance) {
            scriptInstance[stateKey] = next;
          }
          setIsSynced(true);
          onSyncRef.current?.(next);
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          onErrorRef.current?.(error);
        }
      }, debounce);
    },
    [scriptInstance, stateKey, debounce, onChangeRef, onSyncRef, onErrorRef],
  );

  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return { value, setValue, isSynced, isLoading };
}
