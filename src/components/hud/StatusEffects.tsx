import * as React from 'react';

import { useStatusEffectSync } from '../../hooks/useStatusEffectSync';
import { cn } from '../../internal/cn';
import { Badge } from '../primitives/Badge';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';
import type { StatusEffect } from '../../types';

/**
 * Row/list of active buff/debuff icons with remaining-duration timers
 * (COMPONENTS.md § Component: StatusEffects). COMPONENTS.md's Composition field names
 * `ItemTip` (Inventory module) for the hover description -- a HUD -> Inventory edge
 * that isn't in docs/MODULES.md's list of verified cross-module edges, and `ItemTip`
 * doesn't exist yet (Inventory lands in a later task). Uses a minimal self-contained
 * hover description here rather than introducing a different undocumented cross-module
 * edge (e.g. the Overlay module's `Tooltip`); revisit to match `ItemTip` exactly once
 * Inventory is implemented.
 */
export type StatusEffectsVariant = 'row' | 'grid' | 'compact';

export interface StatusEffectsProps {
  effects?: StatusEffect[];
  pcEntity?: string;
  variant?: StatusEffectsVariant;
  maxVisible?: number;
  className?: string;
  onEffectClick?: (id: string) => void;
  onEffectHover?: (id: string | null) => void;
  onEffectExpire?: (id: string) => void;
  'aria-label'?: string;
  showStacks?: boolean;
  sortOrder?: 'default' | 'remaining' | 'type';
}

const TYPE_BORDER: Record<StatusEffect['type'], string> = {
  buff: 'border-green-500',
  debuff: 'border-red-500',
  neutral: 'border-gray-500',
};

function sortEffects(
  effects: StatusEffect[],
  order: StatusEffectsProps['sortOrder'],
): StatusEffect[] {
  if (order === 'remaining')
    return [...effects].sort((a, b) => (a.remaining ?? Infinity) - (b.remaining ?? Infinity));
  if (order === 'type') return [...effects].sort((a, b) => a.type.localeCompare(b.type));
  return effects;
}

export function StatusEffects({
  effects: effectsProp,
  pcEntity,
  variant = 'row',
  maxVisible,
  className,
  onEffectClick,
  onEffectHover,
  onEffectExpire,
  'aria-label': ariaLabel,
  showStacks = true,
  sortOrder = 'default',
}: StatusEffectsProps): React.JSX.Element {
  const synced = useStatusEffectSync({ pcEntity });
  const effects = React.useMemo(
    () => effectsProp ?? (pcEntity ? synced.effects : []),
    [effectsProp, pcEntity, synced.effects],
  );

  const prevRemainingRef = React.useRef<Map<string, number>>(new Map());
  React.useEffect(() => {
    for (const effect of effects) {
      const prev = prevRemainingRef.current.get(effect.id);
      if (effect.remaining !== undefined) {
        if (prev !== undefined && prev > 0 && effect.remaining <= 0) onEffectExpire?.(effect.id);
        prevRemainingRef.current.set(effect.id, effect.remaining);
      }
    }
  }, [effects, onEffectExpire]);

  const sorted = sortEffects(effects, sortOrder);
  const visible = maxVisible ? sorted.slice(0, maxVisible) : sorted;
  const overflow = maxVisible && sorted.length > maxVisible ? sorted.length - maxVisible : 0;

  return (
    <Box
      role="list"
      aria-label={ariaLabel ?? 'Status effects'}
      className={cn(
        'flex gap-1',
        variant === 'grid' && 'flex-wrap',
        variant === 'compact' && 'gap-0.5',
        className,
      )}
    >
      {visible.map((effect) => {
        const description =
          effect.remaining !== undefined
            ? `${effect.name}, ${Math.ceil(effect.remaining)} seconds remaining`
            : effect.name;
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex --
           COMPONENTS.md documents this row as `role="listitem"` (not a button/interactive
           role) with an optional `onEffectClick`; changing the role would contradict the
           documented contract. */
        return (
          <div
            key={effect.id}
            role="listitem"
            aria-label={description}
            title={description}
            tabIndex={onEffectClick ? 0 : undefined}
            className={cn(
              'relative w-8 h-8 rounded border-2 flex items-center justify-center',
              TYPE_BORDER[effect.type],
              onEffectClick && 'cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400',
            )}
            onClick={() => onEffectClick?.(effect.id)}
            onKeyDown={(e) => {
              if (onEffectClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onEffectClick(effect.id);
              }
            }}
            onMouseEnter={() => onEffectHover?.(effect.id)}
            onMouseLeave={() => onEffectHover?.(null)}
            onFocus={() => onEffectHover?.(effect.id)}
            onBlur={() => onEffectHover?.(null)}
          >
            <Icon name={effect.icon} size={4} />
            {showStacks && effect.stacks !== undefined && effect.stacks > 1 && (
              <Badge content={effect.stacks} size="sm" placement="bottom-right" />
            )}
          </div>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
      })}
      {overflow > 0 && (
        <div className="w-8 h-8 rounded border-2 border-gray-600 flex items-center justify-center text-xs text-gray-300">
          +{overflow}
        </div>
      )}
    </Box>
  );
}

StatusEffects.displayName = 'StatusEffects';
