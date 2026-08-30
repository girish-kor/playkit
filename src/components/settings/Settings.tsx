import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Settings` (category: Settings).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Settings, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Settings entry in `COMPONENTS.md`.
 */
export interface SettingsProps {
  className?: string;
  children?: React.ReactNode;
}

export const Settings = React.forwardRef<HTMLElement, SettingsProps>(
  function Settings(_props, _ref) {
    throw new Error(
      'Settings is not implemented yet. See COMPONENTS.md § Component: Settings, and src/components/settings/Settings.tsx.',
    );
  },
);

Settings.displayName = 'Settings';
