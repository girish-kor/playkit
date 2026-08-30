import * as React from 'react';

import { useLootSync } from '../../hooks/useLootSync';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';
import { Modal } from '../modal/Modal';
import { Inventory } from './Inventory';
import type { Item } from '../../types';

/**
 * Secondary inventory grid for a chest/corpse/container, with item-transfer support
 * to the player's `Inventory` (COMPONENTS.md § Component: LootContainer).
 */
export type LootContainerVariant = 'loot' | 'storage';

export interface LootContainerProps<T = unknown> {
  isOpen: boolean;
  items: Item<T>[];
  containerName?: string;
  pcEntity?: string;
  onClose: () => void;
  onTake: (itemId: string, quantity?: number) => void;
  onTakeAll?: () => void;
  onDeposit?: (itemId: string, quantity?: number) => void;
  variant?: LootContainerVariant;
  className?: string;
  onItemHover?: (itemId: string | null) => void;
  onEmpty?: () => void;
  'aria-label'?: string;
  autoCloseOnEmpty?: boolean;
  weightLimit?: number;
  playerItems?: Item<T>[];
}

export function LootContainer<T = unknown>({
  isOpen,
  items: itemsProp,
  containerName,
  pcEntity,
  onClose,
  onTake,
  onTakeAll,
  onDeposit,
  variant = 'loot',
  className,
  onItemHover,
  onEmpty,
  'aria-label': ariaLabel,
  autoCloseOnEmpty = false,
  playerItems = [],
}: LootContainerProps<T>): React.JSX.Element {
  const synced = useLootSync<T>({ pcEntity });
  const items = pcEntity ? synced.items : itemsProp;

  const wasEmptyRef = React.useRef(items.length === 0);
  React.useEffect(() => {
    const isEmpty = items.length === 0;
    if (isEmpty && !wasEmptyRef.current) {
      onEmpty?.();
      if (autoCloseOnEmpty) onClose();
    }
    wasEmptyRef.current = isEmpty;
  }, [items.length, onEmpty, autoCloseOnEmpty, onClose]);

  const take = (slotIndex: number) => {
    const item = items[slotIndex];
    if (!item) return;
    onTake(item.id);
    if (pcEntity) synced.take(item.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
      title={containerName ?? 'Container'}
      aria-label={ariaLabel ?? containerName ?? 'Container'}
      className={className}
      variant="center"
    >
      <div className="flex gap-4">
        <div>
          <Text weight="semibold" className="text-white mb-2">
            {containerName ?? 'Container'}
          </Text>
          <Inventory
            slots={items.length}
            items={items}
            onItemDoubleClick={(slotIndex) => take(slotIndex)}
            onHover={(slotIndex) =>
              onItemHover?.(slotIndex !== null ? (items[slotIndex]?.id ?? null) : null)
            }
          />
          {onTakeAll && (
            <Button className="mt-2" onPress={onTakeAll}>
              Take All
            </Button>
          )}
        </div>
        {variant === 'storage' && onDeposit && (
          <div>
            <Text weight="semibold" className="text-white mb-2">
              Inventory
            </Text>
            <Inventory
              slots={playerItems.length}
              items={playerItems}
              onItemDoubleClick={(slotIndex) => {
                const item = playerItems[slotIndex];
                if (item) onDeposit(item.id);
              }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

LootContainer.displayName = 'LootContainer';
