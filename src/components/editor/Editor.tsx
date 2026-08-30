import * as React from 'react';

import { useEditorBridge } from '../../hooks/useEditorBridge';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import { Icon } from '../primitives/Icon';
import { Palette } from './Palette';
import type { Prefab } from '../../types';

/**
 * In-game editor for placing, moving, rotating, scaling objects (COMPONENTS.md §
 * Component: Editor, DevMode only). Internally uses "Gizmo" controls for 3D
 * manipulation, not separately documented as a public component
 * (docs/REBUILD-GUIDE.md) -- represented here as toolbar tool selection driving
 * `useEditorBridge`'s `transform` calls, since no separate Gizmo contract exists to
 * implement against.
 */
export type EditorVariant = '2d' | '3d' | 'snap-grid' | 'none';
export type EditorTool = 'select' | 'move' | 'rotate' | 'scale' | 'place';

export interface EditorProps {
  palette: Prefab[];
  pcEntity?: string;
  pcScene?: unknown;
  variant?: EditorVariant;
  onPlace: (prefab: Prefab) => void;
  onDelete: (entity: unknown) => void;
  onTransform: (
    transform: { position: unknown; rotation: unknown; scale: unknown },
    oldTransform: unknown,
  ) => void;
  className?: string;
  onUndo?: () => void;
  onRedo?: () => void;
  'aria-label'?: string;
  snapSize?: number;
  snapRotation?: number;
  showGrid?: boolean;
  showSnap?: boolean;
  onToolChange?: (tool: string) => void;
  onSelect?: (entity: unknown) => void;
  onDeselect?: () => void;
}

const TOOLS: { id: EditorTool; icon: string; label: string }[] = [
  { id: 'select', icon: 'mouse-pointer', label: 'Select' },
  { id: 'move', icon: 'move', label: 'Move' },
  { id: 'rotate', icon: 'rotate-cw', label: 'Rotate' },
  { id: 'scale', icon: 'maximize', label: 'Scale' },
  { id: 'place', icon: 'plus-square', label: 'Place' },
];

export function Editor({
  palette,
  pcScene,
  variant = '3d',
  onPlace,
  onDelete,
  onTransform,
  className,
  onUndo,
  onRedo,
  'aria-label': ariaLabel = 'Editor tools',
  showGrid = true,
  onToolChange,
  onSelect,
  onDeselect,
}: EditorProps): React.JSX.Element {
  const { place, delete: deleteEntity, transform } = useEditorBridge({ pcScene });
  const [tool, setTool] = React.useState<EditorTool>('select');
  const [selectedObject, setSelectedObject] = React.useState<unknown>(null);
  const [history, setHistory] = React.useState<
    Array<{ position: unknown; rotation: unknown; scale: unknown }>
  >([]);

  const selectTool = (next: EditorTool) => {
    setTool(next);
    onToolChange?.(next);
  };

  const placePrefab = (prefab: Prefab) => {
    const placed = place(prefab, { x: 0, y: 0, z: 0 });
    onPlace(prefab);
    if (placed) {
      setSelectedObject(placed);
      onSelect?.(placed);
    }
  };

  const deleteSelected = () => {
    if (!selectedObject) return;
    deleteEntity(selectedObject);
    onDelete(selectedObject);
    setSelectedObject(null);
    onDeselect?.();
  };

  const applyTransform = (next: { position: unknown; rotation: unknown; scale: unknown }) => {
    if (!selectedObject) return;
    const old = history[history.length - 1] ?? next;
    transform(selectedObject, next);
    setHistory((prev) => [...prev, next]);
    onTransform(next, old);
  };

  // No pointer-drag Gizmo viewport exists here (see the class comment above) -- these
  // nudge buttons are the keyboard/click-accessible way to actually trigger
  // useEditorBridge's transform() and the documented onTransform callback while a
  // real 3D drag-gizmo isn't implemented.
  const nudge = (axis: 'x' | 'y' | 'z', delta: number) => {
    if (tool !== 'move') return;
    applyTransform({ position: { x: 0, y: 0, z: 0, [axis]: delta }, rotation: null, scale: null });
  };

  return (
    <Box
      role="toolbar"
      aria-label={ariaLabel}
      className={cn('fixed bottom-4 right-4 z-50 bg-gray-800 rounded-lg shadow-xl p-2', className)}
    >
      {variant !== 'none' && showGrid && (
        <div className="text-[10px] text-gray-500 mb-1">Grid: on</div>
      )}
      <Flex gap={1}>
        {TOOLS.map((t) => (
          <Button
            key={t.id}
            variant={tool === t.id ? 'secondary' : 'ghost'}
            size="sm"
            aria-label={t.label}
            onPress={() => selectTool(t.id)}
          >
            <Icon name={t.icon} size={4} />
          </Button>
        ))}
        <Button variant="ghost" size="sm" aria-label="Undo" onPress={onUndo}>
          <Icon name="undo" size={4} />
        </Button>
        <Button variant="ghost" size="sm" aria-label="Redo" onPress={onRedo}>
          <Icon name="redo" size={4} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Delete"
          onPress={deleteSelected}
          disabled={!selectedObject}
        >
          <Icon name="trash" size={4} />
        </Button>
      </Flex>
      {tool === 'move' && Boolean(selectedObject) && (
        <Flex gap={1} className="mt-1">
          <Button size="sm" variant="ghost" aria-label="Nudge +X" onPress={() => nudge('x', 1)}>
            +X
          </Button>
          <Button size="sm" variant="ghost" aria-label="Nudge +Y" onPress={() => nudge('y', 1)}>
            +Y
          </Button>
          <Button size="sm" variant="ghost" aria-label="Nudge +Z" onPress={() => nudge('z', 1)}>
            +Z
          </Button>
        </Flex>
      )}
      <Palette
        prefabs={palette}
        onSelect={placePrefab}
        onDragStart={() => {}}
        onSearch={() => {}}
      />
    </Box>
  );
}

Editor.displayName = 'Editor';
