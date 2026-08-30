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
  const initialRef = React.useRef<KeyBinding[]>((value as KeyBinding[] | undefined) ?? []);

  return {
    bindings: (value as KeyBinding[] | undefined) ?? [],
    setBindings: (bindings: KeyBinding[]) => setValue(bindings),
    reset: () => setValue(initialRef.current),
  };
}
