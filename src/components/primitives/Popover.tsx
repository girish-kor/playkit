import * as React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';

import { useModalSync } from '../../hooks/useModalSync';
import { cn } from '../../internal/cn';

/**
 * Floating panel triggered by click (as opposed to `Tooltip`/`HoverCard`'s hover-only
 * triggering) for menus, quick actions, or info panels (COMPONENTS.md § Component:
 * Popover). Distinct from `ContextMenu` (right-click) and `Tooltip`/`HoverCard`
 * (hover) — docs/UI-UX.md's three trigger models.
 */
export interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactElement;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  /** `'manual'` disables the built-in click-to-toggle and relies entirely on
   * `isOpen`/`onOpenChange`. */
  trigger?: 'click' | 'manual';
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  pcEntity?: string;
  modal?: boolean;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  'aria-label'?: string;
  showArrow?: boolean;
}

export function Popover({
  content,
  children,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'center',
  trigger = 'click',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  pcEntity,
  modal = false,
  className,
  onOpen,
  onClose,
  'aria-label': ariaLabel,
  showArrow = true,
}: PopoverProps): React.JSX.Element {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const sceneSync = useModalSync({ pcEntity });
  const effectiveOpen = pcEntity ? sceneSync.isOpen || isOpen : isOpen;

  const handleOpenChange = (next: boolean) => {
    if (trigger === 'manual') return;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
    if (next) onOpen?.();
    else onClose?.();
  };

  return (
    <RadixPopover.Root open={effectiveOpen} onOpenChange={handleOpenChange} modal={modal}>
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          onEscapeKeyDown={(e) => {
            if (!closeOnEscape) e.preventDefault();
          }}
          onPointerDownOutside={(e) => {
            if (!closeOnOutsideClick) e.preventDefault();
          }}
          aria-label={ariaLabel}
          className={cn(
            'z-50 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4',
            className,
          )}
        >
          {content}
          {showArrow && <RadixPopover.Arrow className="fill-gray-800" />}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

Popover.displayName = 'Popover';
