import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Slider` (category: Settings).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Slider, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Slider entry in `COMPONENTS.md`.
 */
export interface SliderProps {
  className?: string;
  children?: React.ReactNode;
}

export const Slider = React.forwardRef<HTMLElement, SliderProps>(function Slider(_props, _ref) {
  throw new Error(
    'Slider is not implemented yet. See COMPONENTS.md § Component: Slider, and src/components/settings/Slider.tsx.',
  );
});

Slider.displayName = 'Slider';
