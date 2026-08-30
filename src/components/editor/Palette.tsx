import * as React from 'react';
import { DndContext, PointerSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core';

import { usePrefabLibrary } from '../../hooks/usePrefabLibrary';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Grid } from '../primitives/Grid';
import { Input } from '../primitives/Input';
import type { Prefab } from '../../types';

/** Drag-drop prefab palette for editor with search and categories (COMPONENTS.md § Component: Palette, DevMode only). */
export type PaletteVariant = 'grid' | 'list' | 'compact';

export interface PaletteProps {
  prefabs?: Prefab[];
  categories?: string[];
  pcEntity?: string;
  pcApp?: unknown;
  variant?: PaletteVariant;
  onSelect: (prefab: Prefab) => void;
  onDragStart: (prefab: Prefab) => void;
  onSearch: (query: string) => void;
  className?: string;
  onCategoryChange?: (category: string) => void;
  'aria-label'?: string;
  onLoad?: () => void;
  recent?: string[];
}

function PrefabCard({
  prefab,
  onDragStart,
  onSelect,
}: {
  prefab: Prefab;
  onDragStart: (prefab: Prefab) => void;
  onSelect: (prefab: Prefab) => void;
}): React.JSX.Element {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `prefab-${prefab.id}`,
  });
  React.useEffect(() => {
    if (isDragging) onDragStart(prefab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);
  return (
    <button
      ref={setNodeRef}
      type="button"
      {...attributes}
      {...listeners}
      aria-label={prefab.name}
      onClick={() => onSelect(prefab)}
      className={cn(
        'flex flex-col items-center p-2 rounded border border-gray-700 hover:bg-gray-800 cursor-grab',
        isDragging && 'opacity-50',
      )}
    >
      {prefab.thumbnail && <img src={prefab.thumbnail} alt="" className="w-12 h-12 object-cover" />}
      <span className="text-xs text-white truncate w-full text-center">{prefab.name}</span>
    </button>
  );
}

export function Palette({
  prefabs: prefabsProp,
  categories,
  pcApp,
  variant = 'grid',
  onSelect,
  onDragStart,
  onSearch,
  className,
  onCategoryChange,
  'aria-label': ariaLabel = 'Object palette',
  onLoad,
  recent = [],
}: PaletteProps): React.JSX.Element {
  const synced = usePrefabLibrary({ pcApp });
  const prefabs = prefabsProp ?? synced.prefabs;
  const derivedCategories = categories ?? synced.categories;

  const [activeCategory, setActiveCategory] = React.useState<string | undefined>(undefined);
  const [query, setQuery] = React.useState('');
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  React.useEffect(() => {
    onLoad?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefabs.length]);

  const visible = prefabs
    .filter((p) => !activeCategory || p.category === activeCategory)
    .filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <DndContext sensors={sensors}>
      <Box role="grid" aria-label={ariaLabel} className={cn('p-2', className)}>
        <Input
          aria-label="Search prefabs"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="mb-2"
        />
        <div className="flex gap-1 mb-2">
          {derivedCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                onCategoryChange?.(category);
              }}
              className={cn(
                'text-xs px-2 py-1 rounded',
                activeCategory === category ? 'bg-blue-600 text-white' : 'text-gray-300',
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <Grid cols={variant === 'compact' ? 6 : 4} gap={2}>
          {visible.map((prefab) => (
            <div key={prefab.id}>
              <PrefabCard prefab={prefab} onDragStart={onDragStart} onSelect={onSelect} />
              {recent.includes(prefab.id) && (
                <span className="text-[10px] text-blue-400">Recent</span>
              )}
            </div>
          ))}
        </Grid>
      </Box>
    </DndContext>
  );
}

Palette.displayName = 'Palette';
