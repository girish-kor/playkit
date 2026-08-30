import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: AlertBanner` (category: Feedback).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for AlertBanner, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the AlertBanner entry in `COMPONENTS.md`.
 */
export interface AlertBannerProps {
  className?: string;
  children?: React.ReactNode;
}

export const AlertBanner = React.forwardRef<HTMLElement, AlertBannerProps>(
  function AlertBanner(_props, _ref) {
    throw new Error(
      'AlertBanner is not implemented yet. See COMPONENTS.md § Component: AlertBanner, and src/components/feedback/AlertBanner.tsx.',
    );
  },
);

AlertBanner.displayName = 'AlertBanner';
