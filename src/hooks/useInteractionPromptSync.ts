import { useScript } from './useScript';

/** Interaction-target sync (docs/API.md § useInteractionPromptSync) — used by `InteractionPrompt`. */
export function useInteractionPromptSync(options: { pcEntity?: string } = {}): { target: unknown } {
  const { value } = useScript({ entityId: options.pcEntity ?? '', stateKey: 'interactionTarget' });
  return { target: value };
}
