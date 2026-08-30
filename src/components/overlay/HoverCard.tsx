import * as React from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';

import { useHoverData } from '../../hooks/useHoverData';
import { cn } from '../../internal/cn';

/** Rich preview on hover with optional image and PlayCanvas data (COMPONENTS.md § Component: HoverCard). */
export type HoverCardVariant = 'standard' | 'with-image';

export interface HoverCardProps {
  content: React.ReactNode;
  children: React.ReactElement;
  openDelay?: number;
  closeDelay?: number;
  pcEntity?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
  variant?: HoverCardVariant;
  onOpen?: (e?: React.SyntheticEvent) => void;
  onClose?: (e?: React.SyntheticEvent) => void;
  onOpenChange?: (open: boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  showArrow?: boolean;
  'aria-label'?: string;
}

export function HoverCard({
  content,
  children,
  openDelay = 300,
  closeDelay = 0,
  pcEntity,
  side = 'top',
  align = 'center',
  className,
  onOpen,
  onClose,
  onOpenChange,
  onMouseEnter,
  onMouseLeave,
  showArrow = true,
  'aria-label': ariaLabel,
}: HoverCardProps): React.JSX.Element {
  const { data } = useHoverData({ pcEntity });
  const resolvedContent = pcEntity && data !== undefined ? (data as React.ReactNode) : content;

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    if (open) onOpen?.();
    else onClose?.();
  };

  return (
    <RadixHoverCard.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      onOpenChange={handleOpenChange}
    >
      <RadixHoverCard.Trigger asChild>
        {React.cloneElement(children, { onMouseEnter, onMouseLeave } as Record<string, unknown>)}
      </RadixHoverCard.Trigger>
      <RadixHoverCard.Portal>
        <RadixHoverCard.Content
          side={side}
          align={align}
          role="dialog"
          aria-label={ariaLabel ?? 'Item preview'}
          className={cn(
            'z-50 bg-gray-800 rounded-md shadow-xl p-4 max-w-xs border border-gray-700',
            className,
          )}
        >
          {resolvedContent}
          {showArrow && <RadixHoverCard.Arrow className="fill-gray-800" />}
        </RadixHoverCard.Content>
      </RadixHoverCard.Portal>
    </RadixHoverCard.Root>
  );
}

HoverCard.displayName = 'HoverCard';
