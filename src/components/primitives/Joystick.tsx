import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Joystick` (category: Primitives).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Joystick, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Joystick entry in `COMPONENTS.md`.
 */
export interface JoystickProps {
  className?: string;
  children?: React.ReactNode;
}

export const Joystick = React.forwardRef<HTMLElement, JoystickProps>(
  function Joystick(_props, _ref) {
    throw new Error(
      'Joystick is not implemented yet. See COMPONENTS.md § Component: Joystick, and src/components/primitives/Joystick.tsx.',
    );
  },
);

Joystick.displayName = 'Joystick';
