import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';

/** Fires a scene-side event for the chosen dialogue option (docs/API.md § useDialogueChoice) — used by `Dialogue`. */
export function useDialogueChoice(): { selectChoice: (choiceId: string) => void } {
  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  return { selectChoice: (choiceId: string) => app?.fire?.('dialogue:choice', choiceId) };
}
