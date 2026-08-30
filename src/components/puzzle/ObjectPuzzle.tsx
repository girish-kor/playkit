import * as React from 'react';

import { useStableId } from '../../internal/useStableId';
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

import { useObjectPuzzleSync } from '../../hooks/useObjectPuzzleSync';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Puzzle } from './Puzzle';
import type { ObjectPuzzleObject, ObjectPuzzleSlot } from '../../types';

/** Find/pick/place objects in correct positions (COMPONENTS.md § Component: ObjectPuzzle). */
export type ObjectPuzzleVariant = 'drag-drop' | 'click-select' | 'auto-detect';

export interface ObjectPuzzleProps {
  objects: ObjectPuzzleObject[];
  pcEntity?: string;
  slots: ObjectPuzzleSlot[];
  className?: string;
  variant?: ObjectPuzzleVariant;
  onSelect?: (id: string) => void;
  onPlace?: (objectId: string, slotId: string) => void;
  onObjectDrop?: (objectId: string, slotId: string | null) => void;
  onPick?: (objectId: string) => void;
  onObjectDragStart?: (objectId: string) => void;
  onObjectDragEnd?: (objectId: string) => void;
  onSlotHover?: (slotId: string) => void;
  onSlotLeave?: (slotId: string) => void;
  onComplete?: () => void;
  'aria-label'?: string;
  allowMultiplePerSlot?: boolean;
  onObjectHover?: (objectId: string | null) => void;
  onObjectSelect?: (objectId: string) => void;
  highlightSlots?: boolean;
}

function DraggableObject({
  object,
  onDragStart,
  onDragEnd,
}: {
  object: ObjectPuzzleObject;
  onDragStart?: (id: string) => void;
  onDragEnd?: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `object-${object.id}`,
    data: { objectId: object.id },
  });
  React.useEffect(() => {
    if (isDragging) onDragStart?.(object.id);
    return () => {
      if (isDragging) onDragEnd?.(object.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);
  return (
    <button
      ref={setNodeRef}
      type="button"
      aria-label={object.name}
      className={cn('p-2 rounded border bg-gray-800 text-white', isDragging && 'opacity-40')}
      {...attributes}
      {...listeners}
    >
      {object.name}
    </button>
  );
}

function DroppableSlot({
  slot,
  occupant,
  highlight,
}: {
  slot: ObjectPuzzleSlot;
  occupant?: ObjectPuzzleObject;
  highlight?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${slot.id}`, data: { slotId: slot.id } });
  return (
    <div
      ref={setNodeRef}
      role="gridcell"
      aria-label={slot.label ?? slot.id}
      className={cn(
        'w-16 h-16 border-2 rounded flex items-center justify-center text-xs text-white',
        highlight && 'border-blue-400',
        isOver && 'bg-gray-700',
        occupant ? 'border-green-500' : 'border-gray-600',
      )}
    >
      {occupant?.name}
    </div>
  );
}

export function ObjectPuzzle({
  objects,
  pcEntity,
  slots,
  className,
  onSelect,
  onPlace,
  onObjectDrop,
  onPick,
  onObjectDragStart,
  onObjectDragEnd,
  onComplete,
  'aria-label': ariaLabel = 'Object puzzle',
  onObjectHover,
  onObjectSelect,
  highlightSlots = true,
}: ObjectPuzzleProps): React.JSX.Element {
  const puzzleId = useStableId('object-puzzle');
  const synced = useObjectPuzzleSync({ pcEntity });
  const [placed, setPlaced] = React.useState<Record<string, string>>({});
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const objectId = (event.active.data.current as { objectId?: string } | undefined)?.objectId;
    const slotId = (event.over?.data.current as { slotId?: string } | undefined)?.slotId ?? null;
    if (!objectId) return;
    onObjectDrop?.(objectId, slotId);
    if (slotId) {
      setPlaced((prev) => {
        const next = { ...prev, [objectId]: slotId };
        if (Object.keys(next).length === objects.length) onComplete?.();
        return next;
      });
      if (pcEntity) synced.place(objectId, slotId);
      onPlace?.(objectId, slotId);
    }
  };

  const placedObjectFor = (slotId: string) => {
    const objectId = Object.entries(placed).find(([, s]) => s === slotId)?.[0];
    return objects.find((o) => o.id === objectId);
  };

  const availableObjects = objects.filter((o) => !placed[o.id]);

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="logic"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            {availableObjects.map((object) => (
              <div
                key={object.id}
                onMouseEnter={() => onObjectHover?.(object.id)}
                onMouseLeave={() => onObjectHover?.(null)}
              >
                <DraggableObject
                  object={object}
                  onDragStart={(id) => {
                    onObjectDragStart?.(id);
                    onPick?.(id);
                  }}
                  onDragEnd={onObjectDragEnd}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    onSelect?.(object.id);
                    onObjectSelect?.(object.id);
                  }}
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
          <div role="grid" aria-label="Slots" className="grid grid-cols-4 gap-2">
            {slots.map((slot) => (
              <DroppableSlot
                key={slot.id}
                slot={slot}
                occupant={placedObjectFor(slot.id)}
                highlight={highlightSlots}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Puzzle>
  );
}

ObjectPuzzle.displayName = 'ObjectPuzzle';
