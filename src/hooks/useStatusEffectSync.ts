import * as React from 'react';

import { useScript } from './useScript';
import type { StatusEffect } from '../types';

/** Status-effect list sync (docs/API.md § useStatusEffectSync) — used by `StatusEffects`. */
export function useStatusEffectSync(options: { pcEntity?: string } = {}): {
  effects: StatusEffect[];
  removeEffect: (id: string) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'statusEffects',
    initialValue: [] as StatusEffect[],
  });
  const effects = React.useMemo(() => (value as StatusEffect[] | undefined) ?? [], [value]);
  const removeEffect = React.useCallback(
    (id: string) => setValue(effects.filter((e) => e.id !== id)),
    [effects, setValue],
  );
  return { effects, removeEffect };
}
