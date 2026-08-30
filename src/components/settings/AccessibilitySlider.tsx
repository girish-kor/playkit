import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: AccessibilitySlider` (category: Settings).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for AccessibilitySlider, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the AccessibilitySlider entry in `COMPONENTS.md`.
 */
export interface AccessibilitySliderProps {
  className?: string;
  children?: React.ReactNode;
}

export const AccessibilitySlider = React.forwardRef<HTMLElement, AccessibilitySliderProps>(
  function AccessibilitySlider(_props, _ref) {
    throw new Error(
      'AccessibilitySlider is not implemented yet. See COMPONENTS.md § Component: AccessibilitySlider, and src/components/settings/AccessibilitySlider.tsx.',
    );
  },
);

AccessibilitySlider.displayName = 'AccessibilitySlider';
