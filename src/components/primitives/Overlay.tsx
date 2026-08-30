import * as React from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../internal/cn';
import { usePrefersReducedMotion } from '../../internal/usePrefersReducedMotion';

/** Semi-transparent overlay for modals and dialogs (COMPONENTS.md § Component: Overlay). */
export type OverlayVariant = 'dark' | 'blur' | 'transparent';

export interface OverlayProps {
  isOpen: boolean;
  onClick?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onOverlayClick?: (e: React.MouseEvent) => void;
  onEscape?: (e: KeyboardEvent) => void;
  className?: string;
  children?: React.ReactNode;
  variant?: OverlayVariant;
  zIndex?: number;
  transitionDuration?: number;
  'aria-label'?: string;
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
  portal?: boolean;
}

const VARIANT_CLASSES: Record<OverlayVariant, string> = {
  dark: 'bg-black/50',
  blur: 'bg-black/30 backdrop-blur-sm',
  transparent: 'bg-transparent',
};

export function Overlay({
  isOpen,
  onClick,
  onOpen,
  onClose,
  onOpenChange,
  onOverlayClick,
  onEscape,
  className,
  children,
  variant = 'dark',
  zIndex = 40,
  transitionDuration = 200,
  'aria-label': ariaLabel,
  onTransitionStart,
  onTransitionEnd,
  portal = true,
}: OverlayProps): React.ReactPortal | React.JSX.Element | null {
  const prefersReducedMotion = usePrefersReducedMotion();
  const wasOpenRef = React.useRef(isOpen);

  React.useEffect(() => {
    if (wasOpenRef.current === isOpen) return;
    wasOpenRef.current = isOpen;
    onOpenChange?.(isOpen);
    onTransitionStart?.();
    if (isOpen) onOpen?.();
    else onClose?.();
    const duration = prefersReducedMotion ? 0 : transitionDuration;
    const id = setTimeout(() => onTransitionEnd?.(), duration);
    return () => clearTimeout(id);
  }, [
    isOpen,
    onOpenChange,
    onOpen,
    onClose,
    onTransitionStart,
    onTransitionEnd,
    prefersReducedMotion,
    transitionDuration,
  ]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape?.(e);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onEscape]);

  const handleClick = (e: React.MouseEvent) => {
    onOverlayClick?.(e);
    onClick?.();
  };

  const node = (
    // The backdrop itself is a standard non-focusable click target (Escape, handled
    // above via a document listener, is the keyboard equivalent for closing) --
    // consistent with how Radix's own Dialog overlay is implemented.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cn(
        'fixed inset-0',
        VARIANT_CLASSES[variant],
        !prefersReducedMotion && 'transition-opacity',
        className,
      )}
      style={{
        zIndex,
        transitionDuration: prefersReducedMotion ? '0ms' : `${transitionDuration}ms`,
      }}
      aria-hidden={!isOpen}
      aria-modal={isOpen || undefined}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </div>
  );

  if (!isOpen && !children) return null;

  return portal && typeof document !== 'undefined' ? createPortal(node, document.body) : node;
}

Overlay.displayName = 'Overlay';
