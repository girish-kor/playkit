import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: ColorPicker` (category: Settings).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for ColorPicker, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the ColorPicker entry in `COMPONENTS.md`.
 */
export interface ColorPickerProps {
  className?: string;
  children?: React.ReactNode;
}

export const ColorPicker = React.forwardRef<HTMLElement, ColorPickerProps>(
  function ColorPicker(_props, _ref) {
    throw new Error(
      'ColorPicker is not implemented yet. See COMPONENTS.md § Component: ColorPicker, and src/components/settings/ColorPicker.tsx.',
    );
  },
);

ColorPicker.displayName = 'ColorPicker';
