import * as React from 'react';

import { useScript } from './useScript';
import type { KeyBinding } from '../types';

/**
 * Structured-array sync for keybindings (docs/API.md § useKeybindSync) — used by
 * `Keybinds`. Distinct from `useSettingSync`'s scalar-value sync because bindings are
 * a list, not a single value.
 */
export function useKeybindSync(options: { pcEntity?: string } = {}): {
  bindings: KeyBinding[];
  setBindings: (bindings: KeyBinding[]) => void;
  reset: () => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'keybindings',
    initialValue: [] as KeyBinding[],
  });
  const bindings = (value as KeyBinding[] | undefined) ?? [];

  // `useScript`'s entity/script resolution happens in an effect, one render after
  // mount -- capturing `initialRef` via `useRef(value)` would freeze it at `[]` (the
  // placeholder `initialValue`) on that first render, before the real bindings ever
  // arrive, making `reset()` wipe the bindings instead of restoring them. Capture it
  // from an effect instead (never write a ref during render -- react-hooks/refs),
  // re-checking each time `bindings` changes until the first real value shows up.
  const initialRef = React.useRef<KeyBinding[] | null>(null);
  React.useEffect(() => {
    if (initialRef.current === null && bindings.length > 0) {
      initialRef.current = bindings;
    }
  }, [bindings]);

  return {
    bindings,
    setBindings: (next: KeyBinding[]) => setValue(next),
    reset: () => setValue(initialRef.current ?? []),
  };
}
