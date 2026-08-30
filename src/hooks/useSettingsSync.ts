import { useScript } from './useScript';
import type { SettingsCategory } from '../types';

/**
 * Whole-blob settings sync (docs/API.md § useSettingsSync, docs/CONFIGURATION.md) —
 * used ONLY by the `Settings` container itself; distinct from the per-key
 * `useSettingSync`.
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
    resetAll: () =>
      setValue(
        settings.map((category) => ({
          ...category,
          settings: category.settings.map((s) => ({ ...s, default: s.default })),
        })),
      ),
  };
}
