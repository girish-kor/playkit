import * as React from 'react';

import { useDevAPI } from '../../hooks/useDevAPI';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';

/** List of loaded PlayCanvas assets, for debugging asset usage (COMPONENTS.md § Component: AssetViewer, DevMode only). */
export type AssetViewerFilter = 'all' | 'texture' | 'model' | 'audio' | 'script' | 'material';
export type AssetViewerSortBy = 'name' | 'size' | 'type' | 'loadTime';

interface PcAsset {
  id: string;
  name: string;
  type: string;
  size?: number;
  loadTime?: number;
  refCount?: number;
}

export interface AssetViewerProps {
  pcApp: unknown;
  filter?: AssetViewerFilter;
  sortBy?: AssetViewerSortBy;
  className?: string;
  onSelect?: (asset: PcAsset) => void;
  onPreview?: (asset: PcAsset) => void;
  onUnload?: (asset: PcAsset) => void;
  'aria-label'?: string;
  showUnusedOnly?: boolean;
  groupBy?: 'type' | 'none';
}

export function AssetViewer({
  pcApp,
  filter = 'all',
  sortBy = 'size',
  className,
  onSelect,
  onPreview,
  onUnload,
  'aria-label': ariaLabel = 'Asset viewer',
  showUnusedOnly = false,
  groupBy = 'type',
}: AssetViewerProps): React.JSX.Element {
  useDevAPI({ pcApp });
  const [selected, setSelected] = React.useState<PcAsset | null>(null);

  const assets = React.useMemo<PcAsset[]>(() => {
    const app = pcApp as { assets?: { list?: () => unknown[] } } | undefined;
    const list = (app?.assets?.list?.() ?? []) as Array<Record<string, unknown>>;
    return list.map((a) => ({
      id: String(a.id),
      name: String(a.name ?? ''),
      type: String(a.type ?? 'unknown'),
      size: typeof a.size === 'number' ? a.size : undefined,
      loadTime: typeof a.loadTime === 'number' ? a.loadTime : undefined,
      refCount: typeof a.refCount === 'number' ? a.refCount : a.registry ? undefined : 0,
    }));
  }, [pcApp]);

  const filtered = assets
    .filter((a) => filter === 'all' || a.type === filter)
    .filter((a) => !showUnusedOnly || a.refCount === 0)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      if (sortBy === 'loadTime') return (b.loadTime ?? 0) - (a.loadTime ?? 0);
      return (b.size ?? 0) - (a.size ?? 0);
    });

  const totalSize = filtered.reduce((sum, a) => sum + (a.size ?? 0), 0);

  const groups: Record<string, PcAsset[]> =
    groupBy === 'type'
      ? filtered.reduce<Record<string, PcAsset[]>>((acc, asset) => {
          (acc[asset.type] ??= []).push(asset);
          return acc;
        }, {})
      : { all: filtered };

  return (
    <Box
      role={groupBy === 'type' ? 'tree' : 'table'}
      aria-label={ariaLabel}
      className={cn('overflow-auto font-mono text-sm', className)}
    >
      <Text weight="semibold" className="px-2 py-1">
        Total: {(totalSize / 1024).toFixed(1)} KB ({filtered.length} assets)
      </Text>
      {Object.entries(groups).map(([group, groupAssets]) => (
        <div key={group}>
          {groupBy === 'type' && (
            <Text size="xs" className="px-2 text-gray-500">
              {group}
            </Text>
          )}
          {(groupAssets ?? []).map((asset) => (
            <div
              key={asset.id}
              role="row"
              tabIndex={0}
              aria-selected={selected?.id === asset.id}
              className={cn(
                'flex justify-between px-2 py-1 border-b border-gray-800 hover:bg-gray-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400',
                selected?.id === asset.id && 'bg-gray-800',
              )}
              onClick={() => {
                setSelected(asset);
                onSelect?.(asset);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(asset);
                  onSelect?.(asset);
                }
              }}
              onDoubleClick={() => onPreview?.(asset)}
            >
              <span>{asset.name}</span>
              <span className="flex gap-2 text-gray-400">
                <span>
                  {asset.size !== undefined ? `${(asset.size / 1024).toFixed(1)} KB` : '—'}
                </span>
                <Button size="sm" variant="ghost" onPress={() => onUnload?.(asset)}>
                  Unload
                </Button>
              </span>
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
}

AssetViewer.displayName = 'AssetViewer';
