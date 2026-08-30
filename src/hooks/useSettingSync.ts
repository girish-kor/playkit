import * as React from 'react';

import { useScript } from './useScript';

/**
 * The canonical per-setting sync mechanism (docs/CONFIGURATION.md): syncs ONE setting
 * value, keyed by `key`. Used by `Toggle`, `Slider`, `Select`, `RadioGroup`,
 * `ColorPicker`, `AccessibilitySlider`, `Rating`. Distinct from `useSettingsSync`,
 * which syncs the entire settings-categories blob for the `Settings` container itself.
 *
 * Without `pcEntity`, this is purely local React state seeded by `defaultValue` — a
 * setting doesn't have to be bound to a PlayCanvas entity to exist.
 */
export interface UseSettingSyncOptions {
  key: string;
  pcEntity?: string;
  defaultValue?: unknown;
}

export interface UseSettingSyncResult {
  value: unknown;
  setValue: (v: unknown) => void;
}

export function useSettingSync(options: UseSettingSyncOptions): UseSettingSyncResult {
  const { key, pcEntity, defaultValue } = options;

  const [localValue, setLocalValue] = React.useState(defaultValue);
  const script = useScript({
    entityId: pcEntity ?? '',
    stateKey: key,
    initialValue: defaultValue,
  });

  if (!pcEntity) {
    return { value: localValue, setValue: setLocalValue };
  }
  return { value: script.value, setValue: script.setValue };
}
