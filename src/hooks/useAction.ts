import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { pollUntilResolved, resolveEntity } from '../internal/pcEntity';

/**
 * Invokes a PlayCanvas script method by name (docs/API.md § useAction). `pcEntity` is
 * required here (unlike most sync hooks' optional `pcEntity?`) — used by
 * `Button.pcAction`, `Confetti`. Callers with no entity to bind to at all (e.g. a
 * plain, non-PlayCanvas `Button`) pass an empty string, which resolves to the same
 * documented no-op as every other unresolved-id case.
 */
export interface UseActionOptions {
  pcEntity: string;
  method: string;
}

export interface UseActionResult {
  execute: (...args: unknown[]) => unknown;
}

export function useAction(options: UseActionOptions): UseActionResult {
  const { pcEntity, method } = options;

  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);
  const entityRef = React.useRef<any>(null);

  React.useEffect(() => {
    return pollUntilResolved(
      () => resolveEntity(app, scene, pcEntity),
      (entity) => {
        entityRef.current = entity;
      },
    );
  }, [app, scene, pcEntity]);

  const execute = React.useCallback(
    (...args: unknown[]) => {
      const entity = entityRef.current;
      const instances = entity?.script?.scripts as unknown[] | undefined;
      const owner = instances?.find(
        (instance) =>
          instance && typeof (instance as Record<string, unknown>)[method] === 'function',
      ) as Record<string, (...a: unknown[]) => unknown> | undefined;
      return owner?.[method]?.(...args);
    },
    [method],
  );

  return { execute };
}
