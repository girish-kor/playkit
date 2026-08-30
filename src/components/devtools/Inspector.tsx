import * as React from 'react';

import { useSceneInspector } from '../../hooks/useSceneInspector';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Input } from '../primitives/Input';
import { TreeView } from '../primitives/TreeView';
import type { TreeNode } from '../../types';
import { Property } from './Property';

/** PlayCanvas entity tree inspector with search and property display (COMPONENTS.md § Component: Inspector, DevMode only). */
export type InspectorVariant = 'tree' | 'flat';

interface PcEntityLike {
  name?: string;
  getGuid?: () => string;
  enabled?: boolean;
  children?: PcEntityLike[];
}

export interface InspectorProps {
  pcScene: unknown;
  pcEntity?: string;
  filter?: string;
  variant?: InspectorVariant;
  className?: string;
  onSelect?: (entity: unknown) => void;
  onEntityClick?: (entity: unknown) => void;
  onUpdate?: (entity: unknown, diff: unknown) => void;
  onRefresh?: () => void;
  onSearch?: (query: string) => void;
  'aria-label'?: string;
  onDoubleClick?: (entity: unknown) => void;
  onEntityDoubleClick?: (entity: unknown) => void;
  onEntityHover?: (entity: unknown | null) => void;
  onEntityFocus?: (entity: unknown) => void;
  showHidden?: boolean;
}

function toTreeNodes(
  entities: PcEntityLike[],
  showHidden: boolean,
  filter: string,
): TreeNode<PcEntityLike>[] {
  return entities
    .filter((e) => showHidden || e.enabled !== false)
    .filter((e) => !filter || (e.name ?? '').toLowerCase().includes(filter.toLowerCase()))
    .map((e) => ({
      id: e.getGuid?.() ?? e.name ?? Math.random().toString(36),
      label: e.name ?? 'Entity',
      children: e.children ? toTreeNodes(e.children, showHidden, filter) : undefined,
      data: e,
    }));
}

export function Inspector({
  pcScene,
  pcEntity,
  filter = '',
  variant = 'tree',
  className,
  onSelect,
  onEntityClick,
  onRefresh,
  onSearch,
  'aria-label': ariaLabel = 'Scene inspector',
  showHidden = false,
}: InspectorProps): React.JSX.Element {
  void pcEntity;
  const { entities, refresh } = useSceneInspector({ pcScene });
  const [selectedEntity, setSelectedEntity] = React.useState<PcEntityLike | null>(null);
  const [query, setQuery] = React.useState(filter);

  const nodes = React.useMemo(
    () => toTreeNodes(entities as PcEntityLike[], showHidden, variant === 'flat' ? '' : query),
    [entities, showHidden, query, variant],
  );

  const select = (id: string) => {
    const found = findNode(nodes, id);
    if (found?.data) {
      setSelectedEntity(found.data);
      onSelect?.(found.data);
      onEntityClick?.(found.data);
    }
  };

  return (
    <Box
      role="tree"
      aria-label={ariaLabel}
      className={cn('overflow-auto font-mono text-sm p-2', className)}
    >
      <div className="flex gap-2 mb-2">
        <Input
          aria-label="Filter entities"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            refresh();
            onRefresh?.();
          }}
          className="text-blue-400 text-xs"
        >
          Refresh
        </button>
      </div>
      <TreeView
        data={nodes}
        onSelect={select}
        selected={selectedEntity ? (selectedEntity.getGuid?.() ?? selectedEntity.name) : undefined}
      />
      {selectedEntity && (
        <Property
          entity={selectedEntity}
          properties={[
            { key: 'name', label: 'Name', type: 'string' },
            { key: 'enabled', label: 'Enabled', type: 'boolean' },
          ]}
          onChange={() => {}}
          onApply={() => {}}
          onRevert={() => {}}
        />
      )}
    </Box>
  );
}

Inspector.displayName = 'Inspector';

function findNode(nodes: TreeNode<PcEntityLike>[], id: string): TreeNode<PcEntityLike> | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}
