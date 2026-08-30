import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { useItemData } from '../../hooks/useItemData';
import { cn } from '../../internal/cn';
import { Text } from '../primitives/Text';
import type { Item } from '../../types';

/**
 * Hover tooltip showing item details with optional pinning (COMPONENTS.md §
 * Component: ItemTip). Radix Tooltip already opens immediately on keyboard focus
 * (no `delay`), satisfying the WCAG 2.1.1 requirement docs/ACCESSIBILITY.md documents
 * for this component.
 */
export type ItemTipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type ItemTipVariant = 'compact' | 'detailed' | 'with-image';

export interface ItemTipProps<T = unknown> {
  item: Item<T>;
  position?: ItemTipPosition;
  delay?: number;
  children: React.ReactNode;
  pcEntity?: string;
  variant?: ItemTipVariant;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (open: boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onPin?: (pinned: boolean) => void;
  pinnable?: boolean;
  isOpen?: boolean;
  closeDelay?: number;
  maxWidth?: number | string;
  showArrow?: boolean;
}

/** Renders `Item.data`'s numeric fields as stat rows, reused by `ItemComparison`. */
export function renderStatRows<T>(data: T | undefined): Array<{ key: string; value: number }> {
  if (!data || typeof data !== 'object') return [];
  return Object.entries(data as Record<string, unknown>)
    .filter((entry): entry is [string, number] => typeof entry[1] === 'number')
    .map(([key, value]) => ({ key, value }));
}

const SIDE_MAP: Record<Exclude<ItemTipPosition, 'auto'>, 'top' | 'bottom' | 'left' | 'right'> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

export function ItemTip<T = unknown>({
  item: itemProp,
  position = 'top',
  delay = 300,
  children,
  pcEntity,
  variant = 'detailed',
  onOpen,
  onClose,
  onToggle,
  onPin,
  pinnable = false,
  isOpen: controlledOpen,
  maxWidth = 'xs',
  showArrow = true,
}: ItemTipProps<T>): React.JSX.Element {
  const { item: syncedItem } = useItemData<T>({ itemId: itemProp.id, pcEntity });
  const item = pcEntity ? (syncedItem ?? itemProp) : itemProp;

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [isPinned, setIsPinned] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen || isPinned;

  const handleOpenChange = (next: boolean) => {
    if (isPinned && !next) return;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
    if (next) onOpen?.();
    else onClose?.();
  };

  const stats = renderStatRows(item.data);
  const maxWidthStyle = typeof maxWidth === 'number' ? `${maxWidth}px` : undefined;

  return (
    <RadixTooltip.Provider delayDuration={delay}>
      <RadixTooltip.Root open={open} onOpenChange={handleOpenChange}>
        <RadixTooltip.Trigger asChild>
          <span
            onDoubleClick={
              pinnable
                ? () => {
                    const next = !isPinned;
                    setIsPinned(next);
                    onPin?.(next);
                  }
                : undefined
            }
          >
            {children}
          </span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={position === 'auto' ? undefined : SIDE_MAP[position]}
            className={cn(
              'z-50 bg-gray-900 text-white rounded-md shadow-lg p-2',
              typeof maxWidth === 'string' && `max-w-${maxWidth}`,
            )}
            style={maxWidthStyle ? { maxWidth: maxWidthStyle } : undefined}
          >
            <Text weight="semibold">{item.name}</Text>
            {variant !== 'compact' && item.description && <Text size="sm">{item.description}</Text>}
            {variant !== 'compact' &&
              stats.map((stat) => (
                <div key={stat.key} className="flex justify-between gap-4 text-xs">
                  <span>{stat.key}</span>
                  <span>{stat.value}</span>
                </div>
              ))}
            {showArrow && <RadixTooltip.Arrow className="fill-gray-900" />}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

ItemTip.displayName = 'ItemTip';
