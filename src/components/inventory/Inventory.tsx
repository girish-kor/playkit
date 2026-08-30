import * as React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';

import { useInventorySync } from '../../hooks/useInventorySync';
import { cn } from '../../internal/cn';
import { Grid } from '../primitives/Grid';
import { ItemSlot } from './ItemSlot';
import type { Item } from '../../types';

/** Grid-based inventory display with slot management and PlayCanvas sync (COMPONENTS.md § Component: Inventory). */
export type InventoryVariant = 'fixed-grid' | 'scrollable' | 'paginated';

export interface InventoryProps<T = unknown> {
  slots: number;
  items?: Array<Item<T> | null | undefined>;
  columns?: number;
  pcEntity?: string;
  className?: string;
  virtualization?: boolean;
  virtualizationThreshold?: number;
  variant?: InventoryVariant;
  onSelect?: (slotIndex: number) => void;
  onUse?: (slotIndex: number) => void;
  onItemClick?: (slotIndex: number, item: Item<T>) => void;
  onItemDoubleClick?: (slotIndex: number, item: Item<T>) => void;
  onDragStart?: (slotIndex: number) => void;
  onDragEnd?: (slotIndex: number) => void;
  onDrop?: (from: number, to: number) => void;
  onHover?: (slotIndex: number | null) => void;
  'aria-label'?: string;
  emptySlotRender?: (slotIndex: number) => React.ReactNode;
  sortable?: boolean;
  maxStack?: number;
  onSort?: (newOrder: number[]) => void;
  onFilter?: (filter: string) => void;
  showEmptySlots?: boolean;
  dropEffect?: 'move' | 'copy' | 'none';
  onOpen?: () => void;
  onClose?: () => void;
  selectedSlot?: number;
}

export function Inventory<T = unknown>({
  slots,
  items: itemsProp,
  columns = 4,
  pcEntity,
  className,
  virtualization,
  virtualizationThreshold = 100,
  onSelect,
  onUse,
  onItemClick,
  onItemDoubleClick,
  onDragStart,
  onDragEnd,
  onDrop,
  onHover,
  'aria-label': ariaLabel = 'Inventory',
  emptySlotRender,
  showEmptySlots = true,
  onSort,
}: InventoryProps<T>): React.JSX.Element {
  const synced = useInventorySync<T>({ pcEntity });
  const items = itemsProp ?? (pcEntity ? synced.items : []);

  const [selectedSlot, setSelectedSlot] = React.useState<number | undefined>(undefined);
  const shouldVirtualize = virtualization ?? slots > virtualizationThreshold;

  // docs/PERFORMANCE.md: an activation constraint is required so ordinary clicks
  // aren't misread as drag starts.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;
    const from = (event.active.data.current as { slotIndex?: number } | undefined)?.slotIndex;
    const to = (event.over.data.current as { slotIndex?: number } | undefined)?.slotIndex;
    if (from === undefined || to === undefined || from === to) return;
    onDrop?.(from, to);
    if (onSort) {
      const order = Array.from({ length: slots }, (_, i) => i);
      const [moved] = order.splice(from, 1);
      order.splice(to, 0, moved!);
      onSort(order);
    }
  };

  const select = (slotIndex: number) => {
    setSelectedSlot(slotIndex);
    onSelect?.(slotIndex);
    const item = items[slotIndex];
    if (item) onItemClick?.(slotIndex, item);
  };

  const slotIndices = React.useMemo(() => Array.from({ length: slots }, (_, i) => i), [slots]);
  const visibleIndices = shouldVirtualize
    ? slotIndices.slice(0, virtualizationThreshold)
    : slotIndices;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Grid
        role="grid"
        aria-label={ariaLabel}
        cols={columns}
        gap={2}
        className={cn('p-2 overflow-auto', className)}
      >
        {visibleIndices.map((slotIndex) => {
          const item = items[slotIndex] ?? undefined;
          if (!item && !showEmptySlots) return null;
          return emptySlotRender && !item ? (
            <React.Fragment key={slotIndex}>{emptySlotRender(slotIndex)}</React.Fragment>
          ) : (
            <ItemSlot
              key={slotIndex}
              slotIndex={slotIndex}
              item={item}
              selected={selectedSlot === slotIndex}
              rowIndex={Math.floor(slotIndex / columns)}
              colIndex={slotIndex % columns}
              onSelect={select}
              onDoubleClick={() => item && onItemDoubleClick?.(slotIndex, item)}
              onUse={onUse}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onHover={onHover}
            />
          );
        })}
      </Grid>
    </DndContext>
  );
}

Inventory.displayName = 'Inventory';
