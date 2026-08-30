import * as React from 'react';

import { useScript } from './useScript';
import type { DialogueLine } from '../types';

/**
 * Dialogue-line sync (docs/API.md § useDialogueSync) — used by `Dialogue`, `Subtitle`
 * (without `useDialogueChoice`). `DialogueLine`'s shape is undeclared in
 * `COMPONENTS.md` — treated as opaque here too (docs/DATA-MODELS.md).
 */
export function useDialogueSync(options: { pcEntity?: string } = {}): {
  lines: DialogueLine[];
  currentLine: DialogueLine | undefined;
  nextLine: () => void;
} {
  const { value } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'dialogueLines',
    initialValue: [] as DialogueLine[],
  });
  const lines = (value as DialogueLine[] | undefined) ?? [];
  const [index, setIndex] = React.useState(0);

  return {
    lines,
    currentLine: lines[index],
    nextLine: () => setIndex((i) => Math.min(i + 1, Math.max(lines.length - 1, 0))),
  };
}
