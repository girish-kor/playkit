import * as React from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

import { useContextMenu } from '../../hooks/useContextMenu';
import { cn } from '../../internal/cn';
import type { ContextMenuItem as ContextMenuItemData } from '../../types';

/**
 * Generic click-triggered action menu anchored below a button, as opposed to
 * `ContextMenu`'s right-click trigger or `Select`'s value-selection semantics
 * (COMPONENTS.md § Component: DropdownMenu). Uses Radix DropdownMenu -- a distinct
 * primitive from `ContextMenu`'s Radix ContextMenu, per docs/DEPENDENCIES.md.
 */
export interface DropdownMenuProps {
  items: ContextMenuItemData[];
  trigger: React.ReactElement;
  pcEntity?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  onSelect?: (id: string, item: ContextMenuItemData) => void;
  onOpen?: () => void;
  onClose?: (reason?: 'select' | 'escape' | 'outside') => void;
  renderItem?: (item: ContextMenuItemData) => React.ReactNode;
  'aria-label'?: string;
  closeOnSelect?: boolean;
}

function renderItems(
  items: ContextMenuItemData[],
  onSelect: (item: ContextMenuItemData) => void,
  renderItem: ((item: ContextMenuItemData) => React.ReactNode) | undefined,
  closeOnSelect: boolean,
): React.ReactNode {
  return items.map((item) => {
    if (item.separator)
      return (
        <RadixDropdownMenu.Separator key={item.id} className="my-1 border-t border-gray-700" />
      );

    if (item.children && item.children.length > 0) {
      return (
        <RadixDropdownMenu.Sub key={item.id}>
          <RadixDropdownMenu.SubTrigger
            disabled={item.disabled}
            className="px-4 py-2 hover:bg-gray-700 flex justify-between"
          >
            {renderItem ? renderItem(item) : item.label}
          </RadixDropdownMenu.SubTrigger>
          <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.SubContent className="bg-gray-800 border rounded-md shadow-lg min-w-48">
              {renderItems(item.children, onSelect, renderItem, closeOnSelect)}
            </RadixDropdownMenu.SubContent>
          </RadixDropdownMenu.Portal>
        </RadixDropdownMenu.Sub>
      );
    }

    return (
      <RadixDropdownMenu.Item
        key={item.id}
        disabled={item.disabled}
        onSelect={(e) => {
          // Radix's Item closes the menu on select by default, regardless of our own
          // `closeOnSelect` prop -- preventDefault() is Radix's own documented escape
          // hatch to keep it open (COMPONENTS.md: "closeOnSelect?: boolean -- Close
          // after an item is selected (default: true)").
          if (!closeOnSelect) e.preventDefault();
          onSelect(item);
        }}
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
      </RadixDropdownMenu.Item>
    );
  });
}

export function DropdownMenu({
  items,
  trigger,
  pcEntity,
  side = 'bottom',
  align = 'start',
  isOpen,
  onOpenChange,
  className,
  onSelect,
  onOpen,
  onClose,
  renderItem,
  'aria-label': ariaLabel = 'Menu',
  closeOnSelect = true,
}: DropdownMenuProps): React.JSX.Element {
  const { select } = useContextMenu({ pcEntity });
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = isOpen ?? uncontrolledOpen;

  const handleOpenChange = (next: boolean) => {
    if (isOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
    if (next) onOpen?.();
  };

  const handleSelect = (item: ContextMenuItemData) => {
    onSelect?.(item.id, item);
    select(item);
    if (closeOnSelect) {
      handleOpenChange(false);
      onClose?.('select');
    }
  };

  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
      <RadixDropdownMenu.Trigger asChild aria-haspopup="menu" aria-expanded={open}>
        {trigger}
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          side={side}
          align={align}
          aria-label={ariaLabel}
          className={cn('z-50 bg-gray-800 border rounded-md shadow-lg min-w-48', className)}
          onEscapeKeyDown={() => onClose?.('escape')}
          onPointerDownOutside={() => onClose?.('outside')}
        >
          {renderItems(items, handleSelect, renderItem, closeOnSelect)}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}

DropdownMenu.displayName = 'DropdownMenu';
