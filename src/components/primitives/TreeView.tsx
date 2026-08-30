import * as React from 'react';

import { cn } from '../../internal/cn';
import type { TreeNode } from '../../types';

/**
 * Hierarchical tree view with expand/collapse (COMPONENTS.md § Component: TreeView).
 * Virtualization defaults to `true` above 1000 nodes (docs/PERFORMANCE.md).
 */
export type TreeViewVariant = 'default' | 'compact' | 'with-icons';

export interface TreeViewProps<T = unknown> {
  data: TreeNode<T>[];
  expanded?: string[];
  defaultExpanded?: string[];
  onToggle?: (id: string) => void;
  onSelect?: (id: string) => void;
  onItemClick?: (id: string, node: TreeNode<T>) => void;
  onItemDoubleClick?: (id: string, node: TreeNode<T>) => void;
  onItemContextMenu?: (e: React.MouseEvent, id: string, node: TreeNode<T>) => void;
  selected?: string;
  className?: string;
  variant?: TreeViewVariant;
  'aria-label'?: string;
  virtualization?: boolean;
  onExpand?: (id: string) => void;
  onCollapse?: (id: string) => void;
  multiSelect?: boolean;
  renderItem?: (
    node: TreeNode<T>,
    props: { depth: number; expanded: boolean; selected: boolean },
  ) => React.ReactNode;
  onDragDrop?: (sourceId: string, targetId: string) => void;
  filter?: string;
  loadChildren?: (id: string) => Promise<TreeNode<T>[]>;
  onLoadChildren?: (id: string, children: TreeNode<T>[]) => void;
}

interface FlatRow<T> {
  node: TreeNode<T>;
  depth: number;
  parentPath: string[];
}

const VIRTUALIZATION_THRESHOLD = 1000;
const ROW_HEIGHT_PX = 28;

function flatten<T>(
  nodes: TreeNode<T>[],
  expanded: Set<string>,
  depth = 0,
  parentPath: string[] = [],
): FlatRow<T>[] {
  const rows: FlatRow<T>[] = [];
  for (const node of nodes) {
    rows.push({ node, depth, parentPath });
    if (node.children && expanded.has(node.id)) {
      rows.push(...flatten(node.children, expanded, depth + 1, [...parentPath, node.id]));
    }
  }
  return rows;
}

function countNodes<T>(nodes: TreeNode<T>[]): number {
  return nodes.reduce((n, node) => n + 1 + (node.children ? countNodes(node.children) : 0), 0);
}

export function TreeView<T = unknown>({
  data,
  expanded: controlledExpanded,
  defaultExpanded = [],
  onToggle,
  onSelect,
  onItemClick,
  onItemDoubleClick,
  onItemContextMenu,
  selected,
  className,
  variant = 'default',
  'aria-label': ariaLabel,
  virtualization,
  onExpand,
  onCollapse,
  renderItem,
  filter,
  loadChildren,
  onLoadChildren,
}: TreeViewProps<T>): React.JSX.Element {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState<Set<string>>(
    new Set(defaultExpanded),
  );
  const isControlled = controlledExpanded !== undefined;
  const controlledExpandedSet = React.useMemo(
    () => new Set(controlledExpanded),
    [controlledExpanded],
  );
  const expandedSet = isControlled ? controlledExpandedSet : uncontrolledExpanded;

  const totalNodes = React.useMemo(() => countNodes(data), [data]);
  const shouldVirtualize = virtualization ?? totalNodes > VIRTUALIZATION_THRESHOLD;

  const rows = React.useMemo(() => flatten(data, expandedSet), [data, expandedSet]);

  const containerRef = React.useRef<HTMLUListElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(400);

  React.useEffect(() => {
    if (!shouldVirtualize || !containerRef.current) return;
    setViewportHeight(containerRef.current.clientHeight || 400);
  }, [shouldVirtualize]);

  const toggle = (id: string) => {
    const next = new Set(expandedSet);
    const willExpand = !next.has(id);
    if (willExpand) {
      next.add(id);
      onExpand?.(id);
      const node = rows.find((r) => r.node.id === id)?.node;
      if (loadChildren && node && !node.children) {
        void loadChildren(id).then((children) => onLoadChildren?.(id, children));
      }
    } else {
      next.delete(id);
      onCollapse?.(id);
    }
    if (!isControlled) setUncontrolledExpanded(next);
    onToggle?.(id);
  };

  const matchesFilter = (node: TreeNode<T>) =>
    !filter || node.label.toLowerCase().includes(filter.toLowerCase());

  const startIndex = shouldVirtualize ? Math.max(0, Math.floor(scrollTop / ROW_HEIGHT_PX) - 5) : 0;
  const endIndex = shouldVirtualize
    ? Math.min(rows.length, Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT_PX) + 5)
    : rows.length;
  const visibleRows = shouldVirtualize ? rows.slice(startIndex, endIndex) : rows;

  return (
    <ul
      ref={containerRef}
      role="tree"
      aria-label={ariaLabel}
      className={cn('overflow-auto', variant === 'compact' && 'text-sm', className)}
      style={
        shouldVirtualize
          ? { position: 'relative', height: viewportHeight, overflowY: 'auto' }
          : undefined
      }
      onScroll={shouldVirtualize ? (e) => setScrollTop(e.currentTarget.scrollTop) : undefined}
    >
      <div
        style={
          shouldVirtualize
            ? { height: rows.length * ROW_HEIGHT_PX, position: 'relative' }
            : undefined
        }
      >
        {visibleRows.map((row, i) => {
          const isExpanded = expandedSet.has(row.node.id);
          const isSelected = selected === row.node.id;
          const visible = matchesFilter(row.node);
          const activate = () => {
            onItemClick?.(row.node.id, row.node);
            onSelect?.(row.node.id);
          };

          // Roving tabindex (docs/ACCESSIBILITY.md's keyboard-navigation requirement
          // for TreeView): only the selected row (or the first row, if nothing is
          // selected yet) is a tab stop; arrow keys move focus between rows.
          const isTabbable = selected ? isSelected : i === 0;

          const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              activate();
              return;
            }
            if (e.key === 'ArrowRight' && row.node.children) {
              if (!isExpanded) toggle(row.node.id);
              return;
            }
            if (e.key === 'ArrowLeft' && row.node.children && isExpanded) {
              toggle(row.node.id);
              return;
            }
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              const currentIndex = rows.indexOf(row);
              const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
              const nextRow = rows[nextIndex];
              if (nextRow) {
                const li = e.currentTarget.parentElement?.querySelector<HTMLLIElement>(
                  `[data-node-id="${nextRow.node.id}"]`,
                );
                li?.focus();
              }
            }
          };

          return (
            <li
              key={row.node.id}
              data-node-id={row.node.id}
              role="treeitem"
              tabIndex={isTabbable ? 0 : -1}
              aria-level={row.depth + 1}
              aria-expanded={row.node.children ? isExpanded : undefined}
              aria-selected={isSelected}
              style={
                shouldVirtualize
                  ? {
                      position: 'absolute',
                      top: (startIndex + i) * ROW_HEIGHT_PX,
                      left: 0,
                      right: 0,
                      height: ROW_HEIGHT_PX,
                    }
                  : undefined
              }
              className={cn(
                'pl-4 border-l border-transparent hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500',
                isSelected && 'bg-gray-700',
                !visible && 'opacity-40',
              )}
              onClick={activate}
              onKeyDown={handleKeyDown}
              onDoubleClick={() => onItemDoubleClick?.(row.node.id, row.node)}
              onContextMenu={(e) => onItemContextMenu?.(e, row.node.id, row.node)}
            >
              {renderItem ? (
                renderItem(row.node, {
                  depth: row.depth,
                  expanded: isExpanded,
                  selected: isSelected,
                })
              ) : (
                <span style={{ paddingLeft: row.depth * 12 }} className="flex items-center gap-1">
                  {row.node.children && (
                    <button
                      type="button"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(row.node.id);
                      }}
                    >
                      {isExpanded ? '▾' : '▸'}
                    </button>
                  )}
                  {row.node.icon}
                  {row.node.label}
                  {row.node.isLoading && <span aria-hidden="true"> …</span>}
                </span>
              )}
            </li>
          );
        })}
      </div>
    </ul>
  );
}

TreeView.displayName = 'TreeView';
