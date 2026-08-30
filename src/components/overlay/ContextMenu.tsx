import * as React from 'react';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

import { useContextMenu } from '../../hooks/useContextMenu';
import { cn } from '../../internal/cn';
import type { ContextMenuItem as ContextMenuItemData } from '../../types';

/** Right-click context menu with nested items and PlayCanvas integration (COMPONENTS.md § Component: ContextMenu). */
export type ContextMenuVariant = 'standard' | 'nested';

export interface ContextMenuProps {
  items: ContextMenuItemData[];
  pcEntity?: string;
  trigger: React.ReactElement;
  className?: string;
  variant?: ContextMenuVariant;
  renderItem?: (item: ContextMenuItemData) => React.ReactNode;
  onOpen?: (position: { x: number; y: number }) => void;
  onClose?: (reason?: 'select' | 'escape' | 'outside') => void;
  onSelect?: (id: string, item: ContextMenuItemData) => void;
  onItemHover?: (id: string | null) => void;
  'aria-label'?: string;
  virtualize?: boolean;
  maxItems?: number;
  onOpenChange?: (open: boolean) => void;
  preventScroll?: boolean;
}

function renderItems(
  items: ContextMenuItemData[],
  onSelect: (item: ContextMenuItemData) => void,
  onItemHover: ((id: string | null) => void) | undefined,
  renderItem: ((item: ContextMenuItemData) => React.ReactNode) | undefined,
): React.ReactNode {
  return items.map((item) => {
    if (item.separator)
      return <RadixContextMenu.Separator key={item.id} className="my-1 border-t border-gray-700" />;

    if (item.children && item.children.length > 0) {
      return (
        <RadixContextMenu.Sub key={item.id}>
          <RadixContextMenu.SubTrigger
            disabled={item.disabled}
            className="px-4 py-2 hover:bg-gray-700 flex justify-between"
            onMouseEnter={() => onItemHover?.(item.id)}
          >
            {renderItem ? renderItem(item) : item.label}
          </RadixContextMenu.SubTrigger>
          <RadixContextMenu.Portal>
            <RadixContextMenu.SubContent className="bg-gray-800 border rounded-md shadow-lg min-w-48">
              {renderItems(item.children, onSelect, onItemHover, renderItem)}
            </RadixContextMenu.SubContent>
          </RadixContextMenu.Portal>
        </RadixContextMenu.Sub>
      );
    }

    return (
      <RadixContextMenu.Item
        key={item.id}
        disabled={item.disabled}
        onSelect={() => onSelect(item)}
        onMouseEnter={() => onItemHover?.(item.id)}
        onMouseLeave={() => onItemHover?.(null)}
        className="px-4 py-2 hover:bg-gray-700 flex justify-between gap-4"
      >
        {renderItem ? (
          renderItem(item)
        ) : (
          <>
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
            {item.shortcut && <span className="text-gray-500 text-xs">{item.shortcut}</span>}
          </>
        )}
      </RadixContextMenu.Item>
    );
  });
}

export function ContextMenu({
  items,
  pcEntity,
  trigger,
  className,
  renderItem,
  onOpen,
  onClose,
  onSelect,
  onItemHover,
  'aria-label': ariaLabel = 'Context menu',
  onOpenChange,
}: ContextMenuProps): React.JSX.Element {
  const { select } = useContextMenu({ pcEntity });

  const handleOpenChange = (open: boolean, e?: React.MouseEvent) => {
    onOpenChange?.(open);
    if (open) onOpen?.({ x: e?.clientX ?? 0, y: e?.clientY ?? 0 });
  };

  const handleSelect = (item: ContextMenuItemData) => {
    onSelect?.(item.id, item);
    select(item);
    onClose?.('select');
  };

  return (
    <RadixContextMenu.Root onOpenChange={(open) => handleOpenChange(open)}>
      <RadixContextMenu.Trigger asChild onContextMenu={(e) => handleOpenChange(true, e)}>
        {trigger}
      </RadixContextMenu.Trigger>
      <RadixContextMenu.Portal>
        <RadixContextMenu.Content
          aria-label={ariaLabel}
          className={cn('fixed z-50 bg-gray-800 border rounded-md shadow-lg min-w-48', className)}
          onEscapeKeyDown={() => onClose?.('escape')}
          onPointerDownOutside={() => onClose?.('outside')}
        >
          {renderItems(items, handleSelect, onItemHover, renderItem)}
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
}

ContextMenu.displayName = 'ContextMenu';
