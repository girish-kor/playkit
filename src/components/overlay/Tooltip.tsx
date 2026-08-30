import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { useTooltipSync } from '../../hooks/useTooltipSync';
import { cn } from '../../internal/cn';

/** Hover/focus tooltip with placement and delay (COMPONENTS.md § Component: Tooltip). */
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  openDelay?: number;
  closeDelay?: number;
  pcEntity?: string;
  side?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  align?: 'start' | 'center' | 'end' | 'auto';
  className?: string;
  onOpen?: (e?: React.SyntheticEvent) => void;
  onClose?: (e?: React.SyntheticEvent) => void;
  onOpenChange?: (open: boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  skipDelay?: boolean;
  maxWidth?: number | string;
}

export function Tooltip({
  content: contentProp,
  children,
  openDelay = 200,
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
  skipDelay = false,
  maxWidth = 'xs',
}: TooltipProps): React.JSX.Element {
  const synced = useTooltipSync({ pcEntity });
  const content = pcEntity && synced.content !== undefined ? synced.content : contentProp;

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    if (open) onOpen?.();
    else onClose?.();
  };

  return (
    <RadixTooltip.Provider delayDuration={skipDelay ? 0 : openDelay} skipDelayDuration={closeDelay}>
      <RadixTooltip.Root onOpenChange={handleOpenChange}>
        <RadixTooltip.Trigger asChild>
          {React.cloneElement(children, { onMouseEnter, onMouseLeave } as Record<string, unknown>)}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side === 'auto' ? undefined : side}
            align={align === 'auto' ? undefined : align}
            className={cn(
              'z-50 bg-gray-900 text-white px-2 py-1 rounded text-sm shadow',
              typeof maxWidth === 'string' && `max-w-${maxWidth}`,
              className,
            )}
            style={typeof maxWidth === 'number' ? { maxWidth } : undefined}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

Tooltip.displayName = 'Tooltip';
