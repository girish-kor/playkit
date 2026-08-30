import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

import { useModalSync } from '../../hooks/useModalSync';
import { cn } from '../../internal/cn';

/**
 * Modal dialog with overlay, focus trap, and PlayCanvas visibility sync
 * (COMPONENTS.md § Component: Modal). Uses Radix Dialog directly -- its own
 * internal focus-scope implementation IS the focus trap here; COMPONENTS.md names
 * `@radix-ui/react-focus-trap` as a dependency, but that package doesn't exist on the
 * npm registry (see docs/DEPENDENCIES.md's "Unresolvable dependency" entry), and
 * Radix Dialog's built-in trap already satisfies the documented behavior.
 */
export type ModalVariant =
  'standard' | 'full-screen' | 'slide-in' | 'center' | 'bottom-sheet' | 'drawer';
export type ModalCloseReason = 'overlay' | 'escape' | 'action';

export interface ModalProps {
  isOpen: boolean;
  onClose: (reason?: ModalCloseReason) => void;
  title?: string;
  description?: string;
  pcEntity?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  variant?: ModalVariant;
  children?: React.ReactNode;
  className?: string;
  onOpen?: (animation?: string) => void;
  onOpenChange?: (open: boolean) => void;
  onOverlayClick?: (e: React.MouseEvent) => void;
  onEscape?: (e: KeyboardEvent) => void;
  onFocusOutside?: (e: FocusEvent) => void;
  onAnimationEnd?: () => void;
  'aria-label'?: string;
  preventScroll?: boolean;
  portal?: boolean;
  overlayClassName?: string;
  /** `Confirm` needs `role="alertdialog"` instead of the default `role="dialog"`. */
  role?: 'dialog' | 'alertdialog';
}

const VARIANT_ANIMATION: Record<ModalVariant, string> = {
  standard: 'fade',
  center: 'fade',
  'full-screen': 'fade',
  'slide-in': 'slide',
  'bottom-sheet': 'slide',
  drawer: 'slide',
};

const CONTENT_CLASSES: Record<ModalVariant, string> = {
  standard: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-lg w-full',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-lg w-full',
  'full-screen': 'inset-0 w-full h-full rounded-none',
  'slide-in': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-lg w-full',
  'bottom-sheet': 'bottom-0 left-0 right-0 rounded-t-lg w-full',
  drawer: 'top-0 right-0 h-full w-80 rounded-none',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  pcEntity,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  variant = 'standard',
  children,
  className,
  onOpen,
  onOpenChange,
  onOverlayClick,
  onEscape,
  onFocusOutside,
  onAnimationEnd,
  'aria-label': ariaLabel,
  preventScroll = true,
  portal = true,
  overlayClassName,
  role = 'dialog',
}: ModalProps): React.JSX.Element {
  const sceneSync = useModalSync({ pcEntity });
  const effectiveOpen = pcEntity ? sceneSync.isOpen || isOpen : isOpen;

  const wasOpenRef = React.useRef(effectiveOpen);
  React.useEffect(() => {
    if (wasOpenRef.current === effectiveOpen) return;
    wasOpenRef.current = effectiveOpen;
    onOpenChange?.(effectiveOpen);
    if (effectiveOpen) onOpen?.(VARIANT_ANIMATION[variant]);
  }, [effectiveOpen, onOpenChange, onOpen, variant]);

  React.useEffect(() => {
    if (!preventScroll || typeof document === 'undefined') return;
    if (!effectiveOpen) return;
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalScrollY = window.scrollY;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = originalOverflow;
      window.scrollTo(0, originalScrollY);
    };
  }, [effectiveOpen, preventScroll]);

  // Radix's onEscapeKeyDown/onPointerDownOutside fire with the specific reason,
  // but Radix *also* calls onOpenChange(false) right after either one as part of its
  // own dismiss handling -- without this guard, a single Escape press or outside
  // click would call `onClose` twice (once with the reason, once with none).
  const closedWithReasonRef = React.useRef(false);

  const handleOpenChange = (next: boolean) => {
    if (next) return;
    if (closedWithReasonRef.current) {
      closedWithReasonRef.current = false;
      return;
    }
    onClose();
  };

  const content = (
    <RadixDialog.Content
      role={role}
      aria-label={ariaLabel}
      onEscapeKeyDown={(e) => {
        if (!closeOnEscape) {
          e.preventDefault();
          return;
        }
        onEscape?.(e as unknown as KeyboardEvent);
        closedWithReasonRef.current = true;
        onClose('escape');
      }}
      onPointerDownOutside={(e) => {
        if (!closeOnOverlayClick) {
          e.preventDefault();
          return;
        }
        onOverlayClick?.(e as unknown as React.MouseEvent);
        closedWithReasonRef.current = true;
        onClose('overlay');
      }}
      onFocusOutside={(e) => onFocusOutside?.(e as unknown as FocusEvent)}
      onAnimationEnd={onAnimationEnd}
      className={cn(
        'fixed bg-gray-800 rounded-lg shadow-xl p-6 z-50',
        CONTENT_CLASSES[variant],
        className,
      )}
    >
      {title && (
        <RadixDialog.Title className="text-lg font-semibold text-white">{title}</RadixDialog.Title>
      )}
      {description && (
        <RadixDialog.Description className="text-sm text-gray-400">
          {description}
        </RadixDialog.Description>
      )}
      {!title && <RadixDialog.Title className="sr-only">{ariaLabel ?? 'Dialog'}</RadixDialog.Title>}
      {children}
    </RadixDialog.Content>
  );

  return (
    <RadixDialog.Root open={effectiveOpen} onOpenChange={handleOpenChange}>
      {portal ? (
        <RadixDialog.Portal>
          <RadixDialog.Overlay
            className={cn('fixed inset-0 z-50 bg-black/50 backdrop-blur-sm', overlayClassName)}
          />
          {content}
        </RadixDialog.Portal>
      ) : (
        <>
          <RadixDialog.Overlay
            className={cn('fixed inset-0 z-50 bg-black/50 backdrop-blur-sm', overlayClassName)}
          />
          {content}
        </>
      )}
    </RadixDialog.Root>
  );
}

Modal.displayName = 'Modal';
