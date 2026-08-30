import * as React from 'react';

import { useScript } from './useScript';

/** Ammo/reload sync (docs/API.md § useAmmoSync) — used by `AmmoIndicator`. */
export interface UseAmmoSyncResult {
  current: number;
  reserve: number;
  isReloading: boolean;
  reload: () => void;
}

export function useAmmoSync(options: { pcEntity?: string } = {}): UseAmmoSyncResult {
  const current = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'ammoCurrent',
    initialValue: 0,
  });
  const reserve = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'ammoReserve',
    initialValue: 0,
  });
  const reloading = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'isReloading',
    initialValue: false,
  });

  const reload = React.useCallback(() => reloading.setValue(true), [reloading]);

  return {
    current: (current.value as number | undefined) ?? 0,
    reserve: (reserve.value as number | undefined) ?? 0,
    isReloading: Boolean(reloading.value),
    reload,
  };
}
