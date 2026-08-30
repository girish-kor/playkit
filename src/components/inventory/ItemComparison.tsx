import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { useItemData } from '../../hooks/useItemData';
import { cn } from '../../internal/cn';
import { Text } from '../primitives/Text';
import { renderStatRows } from './ItemTip';
import type { Item } from '../../types';

/**
 * Side-by-side tooltip comparing two items, extending `ItemTip`'s single-item display
 * (COMPONENTS.md § Component: ItemComparison). Reuses `ItemTip`'s stat-row rendering
 * (`renderStatRows`) rather than duplicating it (docs/CODING-STANDARDS.md's DRY rule).
 */
export type ItemComparisonPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type ItemComparisonVariant = 'side-by-side' | 'diff-only';

export interface ItemComparisonProps<T = unknown> {
  primary: Item<T>;
  comparison: Item<T>;
  statKeys?: string[];
  position?: ItemComparisonPosition;
  pcEntity?: string;
  variant?: ItemComparisonVariant;
  className?: string;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  'aria-label'?: string;
}

const SIDE_MAP: Record<
  Exclude<ItemComparisonPosition, 'auto'>,
  'top' | 'bottom' | 'left' | 'right'
> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

export function ItemComparison<T = unknown>({
  primary: primaryProp,
  comparison: comparisonProp,
  statKeys,
  position = 'right',
  pcEntity,
  variant = 'side-by-side',
  className,
  children,
  onOpen,
  onClose,
  'aria-label': ariaLabel,
}: ItemComparisonProps<T>): React.JSX.Element {
  const { item: syncedPrimary } = useItemData<T>({ itemId: primaryProp.id, pcEntity });
  const { item: syncedComparison } = useItemData<T>({ itemId: comparisonProp.id, pcEntity });
  const primary = pcEntity ? (syncedPrimary ?? primaryProp) : primaryProp;
  const comparison = pcEntity ? (syncedComparison ?? comparisonProp) : comparisonProp;

  const [open, setOpen] = React.useState(false);

  const keys =
    statKeys ??
    Array.from(
      new Set([
        ...renderStatRows(primary.data).map((s) => s.key),
        ...renderStatRows(comparison.data).map((s) => s.key),
      ]),
    );

  const valueOf = (item: Item<T>, key: string) => {
    const data = item.data as Record<string, unknown> | undefined;
    const value = data?.[key];
    return typeof value === 'number' ? value : undefined;
  };

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) onOpen?.();
          else onClose?.();
        }}
      >
        <RadixTooltip.Trigger asChild>
          <span>{children}</span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={position === 'auto' ? undefined : SIDE_MAP[position]}
            aria-label={ariaLabel}
            className={cn(
              'z-50 bg-gray-900 rounded-md shadow-lg p-3',
              variant === 'side-by-side' && 'grid grid-cols-2 gap-4',
              className,
            )}
          >
            {variant === 'side-by-side' ? (
              <>
                <div>
                  <Text weight="semibold">{primary.name}</Text>
                  {keys.map((key) => (
                    <div key={key} className="flex justify-between text-xs text-white">
                      <span>{key}</span>
                      <span>{valueOf(primary, key) ?? '—'}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <Text weight="semibold">{comparison.name}</Text>
                  {keys.map((key) => (
                    <div key={key} className="flex justify-between text-xs text-white">
                      <span>{key}</span>
                      <span>{valueOf(comparison, key) ?? '—'}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <Text weight="semibold">{primary.name}</Text>
                {keys.map((key) => {
                  const a = valueOf(primary, key);
                  const b = valueOf(comparison, key);
                  const delta = a !== undefined && b !== undefined ? a - b : undefined;
                  return (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-white">{key}</span>
                      <span
                        className={cn(
                          delta !== undefined &&
                            (delta > 0
                              ? 'text-green-400'
                              : delta < 0
                                ? 'text-red-400'
                                : 'text-white'),
                        )}
                      >
                        {a ?? '—'} {delta !== undefined && `(${delta > 0 ? '+' : ''}${delta})`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

ItemComparison.displayName = 'ItemComparison';
