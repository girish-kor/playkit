import { useScript } from './useScript';

export interface A11yPreferences {
  reducedMotion?: boolean;
  highContrast?: boolean;
  fontScale?: number;
}

/** Accessibility-preference sync (docs/API.md § useA11ySync) — used by `A11y`. */
export function useA11ySync(options: { pcEntity?: string } = {}): {
  preferences: A11yPreferences;
  update: (patch: Partial<A11yPreferences>) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'a11yPreferences',
    initialValue: {} as A11yPreferences,
  });
  const preferences = (value as A11yPreferences | undefined) ?? {};
  return { preferences, update: (patch) => setValue({ ...preferences, ...patch }) };
}
