import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: InteractionPrompt` (category: HUD).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for InteractionPrompt, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the InteractionPrompt entry in `COMPONENTS.md`.
 */
export interface InteractionPromptProps {
  className?: string;
  children?: React.ReactNode;
}

export const InteractionPrompt = React.forwardRef<HTMLElement, InteractionPromptProps>(
  function InteractionPrompt(_props, _ref) {
    throw new Error(
      'InteractionPrompt is not implemented yet. See COMPONENTS.md § Component: InteractionPrompt, and src/components/hud/InteractionPrompt.tsx.',
    );
  },
);

InteractionPrompt.displayName = 'InteractionPrompt';
