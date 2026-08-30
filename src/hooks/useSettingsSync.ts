import * as React from 'react';

import { useScript } from './useScript';
import type { SettingsCategory } from '../types';

/**
 * Whole-blob settings sync (COMPONENTS.md § Hook: useSettingsSync, docs/
 * CONFIGURATION.md) -- used ONLY by the `Settings` container itself; distinct from the
 * per-key `useSettingSync`. COMPONENTS.md's own "Returns" line documents a flatter
 * `{ settings: Record<string, any>, setSetting: (key, value) => void, resetAll }`
 * shape, but `Settings`'s actual data model (docs/DATA-MODELS.md's `SettingsCategory`/
 * `SettingDef`, which `Settings.tsx` renders directly) is grouped into categories with
 * per-setting metadata (label, type, min/max/step) that a flat key->value record can't
 * carry -- so this hook syncs the richer `SettingsCategory[]` shape `Settings` actually
 * needs, and `setSetting` is scoped by `(categoryId, key, value)` rather than `(key,
 * value)` alone, since setting keys are only unique within their category.
 */
export function useSettingsSync(options: { pcEntity?: string } = {}): {
  settings: SettingsCategory[];
  setSetting: (categoryId: string, key: string, value: unknown) => void;
  resetAll: () => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'settingsBlob',
    initialValue: [] as SettingsCategory[],
  });
  const settings = (value as SettingsCategory[] | undefined) ?? [];

  // Captured once, the first time this resolves, so `resetAll` has an actual baseline
  // to restore -- `setSetting` overwrites each `SettingDef.default` in place as the
  // live current value, so by the time `resetAll` runs, `settings` itself no longer
  // holds the original values to reset *to*.
  const initialRef = React.useRef<SettingsCategory[] | null>(null);
  React.useEffect(() => {
    if (initialRef.current === null && settings.length > 0) {
      initialRef.current = settings;
    }
  }, [settings]);

  return {
    settings,
    setSetting: (categoryId, key, next) =>
      setValue(
        settings.map((category) =>
          category.id !== categoryId
            ? category
            : {
                ...category,
                settings: category.settings.map((s) =>
                  s.key === key ? { ...s, default: next } : s,
                ),
              },
        ),
      ),
    resetAll: () => {
      if (initialRef.current) setValue(initialRef.current);
    },
  };
}
