import * as React from 'react';

/**
 * Scaffold stub — not yet implemented.
 *
 * Authoritative contract: `COMPONENTS.md` § `## Component: Modal` (category: Modal).
 * Before implementing, read (in this order): `docs/REBUILD-GUIDE.md`, `COMPONENTS.md`'s
 * full entry for Modal, then `docs/CODING-STANDARDS.md`. Do not invent props/events/
 * defaults here — every field must come from the Modal entry in `COMPONENTS.md`.
 */
export interface ModalProps {
  className?: string;
  children?: React.ReactNode;
}

export const Modal = React.forwardRef<HTMLElement, ModalProps>(function Modal(_props, _ref) {
  throw new Error(
    'Modal is not implemented yet. See COMPONENTS.md § Component: Modal, and src/components/modal/Modal.tsx.',
  );
});

Modal.displayName = 'Modal';
