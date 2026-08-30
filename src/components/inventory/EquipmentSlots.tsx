import * as React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';

import { useEquipmentSync } from '../../hooks/useEquipmentSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';
import { ItemSlot } from './ItemSlot';
import type { Item } from '../../types';

/**
 * Fixed slots for equipped items by body/gear location, distinct from `Inventory`'s
 * uniform grid (COMPONENTS.md § Component: EquipmentSlots). `slotType` compatibility
 * is validated by the consumer (via `onEquip`/`onInvalidDrop`), never by this
 * component itself.
 */
export type EquipmentLayout = 'paperdoll' | 'list' | 'grid';

export interface EquipmentSlotDef<T = unknown> {
  id: string;
  label: string;
  slotType: string;
  item?: Item<T>;
  position?: { x: number; y: number };
}

export interface EquipmentSlotsProps<T = unknown> {
  slots: EquipmentSlotDef<T>[];
  pcEntity?: string;
  layout?: EquipmentLayout;
  className?: string;
  onEquip?: (slotId: string, item: Item<T>) => void;
  onUnequip?: (slotId: string) => void;
  onSlotClick?: (slotId: string) => void;
  onSlotHover?: (slotId: string | null) => void;
  onInvalidDrop?: (slotId: string, item: Item<T>) => void;
  'aria-label'?: string;
  showEmptySlotIcon?: boolean;
}

export function EquipmentSlots<T = unknown>({
  slots,
  pcEntity,
  layout = 'paperdoll',
  className,
  onEquip,
  onUnequip,
  onSlotClick,
  onSlotHover,
  onInvalidDrop,
  'aria-label': ariaLabel = 'Equipment',
  showEmptySlotIcon = true,
}: EquipmentSlotsProps<T>): React.JSX.Element {
  useEquipmentSync<T>({ pcEntity });
  // `onInvalidDrop` is surfaced for the CONSUMER to call from their own slotType
  // validation (docs/VALIDATION.md: "validated by the consumer via onEquip's
  // acceptance or onInvalidDrop's rejection path") -- never invoked internally here.
  void onInvalidDrop;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;
    const item = (event.active.data.current as { item?: Item<T> } | undefined)?.item;
    const targetSlotId = event.over.id as string;
    const slot = slots.find((s) => s.id === targetSlotId);
    if (!slot || !item) return;
    // slotType compatibility is validated by the consumer, per docs/VALIDATION.md.
    onEquip?.(slot.id, item);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Box
        role={layout === 'list' ? 'list' : 'grid'}
        aria-label={ariaLabel}
        className={cn(
          layout === 'paperdoll' && 'relative w-64 h-80',
          layout === 'grid' && 'grid grid-cols-3 gap-2',
          layout === 'list' && 'flex flex-col gap-2',
          className,
        )}
      >
        {slots.map((slot) => (
          <div
            key={slot.id}
            style={
              layout === 'paperdoll' && slot.position
                ? { position: 'absolute', left: slot.position.x, top: slot.position.y }
                : undefined
            }
          >
            <ItemSlot
              slotIndex={0}
              item={slot.item}
              aria-label={slot.item ? `${slot.label}: ${slot.item.name}` : `${slot.label}, empty`}
              onSelect={() => onSlotClick?.(slot.id)}
              onHover={(idx) => onSlotHover?.(idx === null ? null : slot.id)}
              onDrop={() => {
                if (slot.item) onUnequip?.(slot.id);
              }}
            />
            {!slot.item && showEmptySlotIcon && (
              <Icon
                name="package"
                className="absolute inset-0 m-auto text-gray-600 pointer-events-none"
              />
            )}
          </div>
        ))}
      </Box>
    </DndContext>
  );
}

EquipmentSlots.displayName = 'EquipmentSlots';
