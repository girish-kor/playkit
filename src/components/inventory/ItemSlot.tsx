import * as React from 'react';
import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';

import { useSlotSync } from '../../hooks/useSlotSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import type { Item } from '../../types';

/** Single inventory slot with drag-drop support and PlayCanvas slot sync (COMPONENTS.md § Component: ItemSlot). */
export type ItemSlotSize = 'sm' | 'md' | 'lg';

export interface ItemSlotProps<T = unknown> {
  slotIndex: number;
  item?: Item<T>;
  selected?: boolean;
  pcEntity?: string;
  disabled?: boolean;
  className?: string;
  onSelect?: (slotIndex: number) => void;
  onClick?: (slotIndex: number) => void;
  onDoubleClick?: (slotIndex: number) => void;
  onUse?: (slotIndex: number) => void;
  onDragStart?: (slotIndex: number) => void;
  onDragEnd?: (slotIndex: number) => void;
  onDragEnter?: (slotIndex: number) => void;
  onDragLeave?: (slotIndex: number) => void;
  onDrop?: (from: number, to: number, dropEffect: 'move' | 'copy' | 'none') => void;
  onHover?: (slotIndex: number | null) => void;
  'aria-label'?: string;
  dragHandle?: boolean;
  size?: ItemSlotSize;
  quantity?: number;
  onContextMenu?: (e: React.MouseEvent, slotIndex: number) => void;
  showTooltip?: boolean;
  equipped?: boolean;
  rowIndex?: number;
  colIndex?: number;
}

const SIZE_CLASSES: Record<ItemSlotSize, string> = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

export function ItemSlot<T = unknown>({
  slotIndex,
  item: itemProp,
  selected = false,
  pcEntity,
  disabled = false,
  className,
  onSelect,
  onClick,
  onDoubleClick,
  onUse,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDragLeave,
  onDrop,
  onHover,
  'aria-label': ariaLabel,
  dragHandle = false,
  size = 'md',
  quantity,
  onContextMenu,
  equipped,
  rowIndex,
  colIndex,
}: ItemSlotProps<T>): React.JSX.Element {
  const synced = useSlotSync<T>({ slotIndex, pcEntity });
  const item = itemProp ?? (pcEntity ? (synced.item ?? undefined) : undefined);
  const hasItem = Boolean(item);

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: `slot-${slotIndex}`,
    data: { slotIndex, item },
    disabled: disabled || !hasItem,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `slot-${slotIndex}`,
    data: { slotIndex },
    disabled,
  });

  React.useEffect(() => {
    if (isDragging) onDragStart?.(slotIndex);
    return () => {
      if (isDragging) onDragEnd?.(slotIndex);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to isDragging transitions.
  }, [isDragging]);

  const wasOverRef = React.useRef(isOver);
  React.useEffect(() => {
    if (wasOverRef.current === isOver) return;
    wasOverRef.current = isOver;
    if (isOver) onDragEnter?.(slotIndex);
    else onDragLeave?.(slotIndex);
  }, [isOver, slotIndex, onDragEnter, onDragLeave]);

  // Resolves this slot's own `onDrop` when it's the active drop target at drag-end,
  // via dnd-kit's `useDndMonitor` -- works whether or not a parent (e.g. `Inventory`)
  // also listens on the shared `DndContext`.
  useDndMonitor({
    onDragEnd: (event) => {
      if (event.over?.id !== `slot-${slotIndex}`) return;
      const fromSlot = (event.active.data.current as { slotIndex?: number } | undefined)?.slotIndex;
      if (fromSlot === undefined) return;
      onDrop?.(fromSlot, slotIndex, 'move');
    },
  });

  const activate = () => {
    if (disabled) return;
    onSelect?.(slotIndex);
    onClick?.(slotIndex);
  };

  const label = ariaLabel ?? (item ? item.name : 'Empty slot');

  return (
    <Box
      {...(dragHandle ? attributes : { ...attributes, ...listeners })}
      ref={(node) => {
        setDragRef(node);
        setDropRef(node);
      }}
      role="gridcell"
      aria-selected={selected}
      aria-label={label}
      aria-rowindex={rowIndex !== undefined ? rowIndex + 1 : undefined}
      aria-colindex={colIndex !== undefined ? colIndex + 1 : undefined}
      tabIndex={disabled ? undefined : 0}
      className={cn(
        SIZE_CLASSES[size],
        'border-2 rounded-lg flex items-center justify-center relative transition-colors',
        selected ? 'border-blue-500' : 'border-gray-700',
        !disabled && 'hover:bg-gray-700',
        isOver && 'bg-gray-700 border-blue-400',
        disabled && 'opacity-50 cursor-not-allowed',
        isDragging && 'opacity-40',
        className,
      )}
      onClick={activate}
      onDoubleClick={() => {
        onDoubleClick?.(slotIndex);
        onUse?.(slotIndex);
      }}
      onMouseEnter={() => onHover?.(slotIndex)}
      onMouseLeave={() => onHover?.(null)}
      onContextMenu={(e) => onContextMenu?.(e, slotIndex)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      }}
    >
      {item && (
        <>
          {item.icon && <Icon name={item.icon} size={6} />}
          {(quantity ?? item.quantity) !== undefined && (quantity ?? item.quantity ?? 0) > 1 && (
            <Text size="xs" className="absolute bottom-0.5 right-1 text-white">
              {quantity ?? item.quantity}
            </Text>
          )}
          {(equipped ?? item.equipped) && (
            <span
              aria-hidden="true"
              className="absolute top-0.5 left-0.5 w-2 h-2 rounded-full bg-green-400"
            />
          )}
          {dragHandle && (
            <span
              {...listeners}
              aria-hidden="true"
              className="absolute top-0 left-0 w-3 h-3 cursor-grab"
            >
              ⋮⋮
            </span>
          )}
        </>
      )}
    </Box>
  );
}

ItemSlot.displayName = 'ItemSlot';
