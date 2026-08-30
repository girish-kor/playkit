import * as React from 'react';

import { useScript } from './useScript';
import type { HistoryEntry } from '../types';

/** Dialogue/chat history sync (docs/API.md § useDialogueHistory) — used by `History`. */
export function useDialogueHistory(options: { pcEntity?: string; maxEntries?: number } = {}): {
  entries: HistoryEntry[];
  clear: () => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'dialogueHistory',
    initialValue: [] as HistoryEntry[],
  });
  const entries = React.useMemo(() => {
    const all = (value as HistoryEntry[] | undefined) ?? [];
    return options.maxEntries ? all.slice(-options.maxEntries) : all;
  }, [value, options.maxEntries]);
  return { entries, clear: () => setValue([]) };
}
