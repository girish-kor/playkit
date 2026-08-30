import * as React from 'react';

import { useAmmoSync } from '../../hooks/useAmmoSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { Progress } from '../feedback/Progress';

/** Current weapon ammunition with icon and reload feedback (COMPONENTS.md § Component: AmmoIndicator). */
export type AmmoIndicatorVariant = 'numeric' | 'bar' | 'bullets';

export interface AmmoIndicatorProps {
  current: number;
  magazineSize: number;
  reserve?: number;
  pcEntity?: string;
  icon?: string;
  weaponType?: string;
  isReloading?: boolean;
  reloadProgress?: number;
  variant?: AmmoIndicatorVariant;
  className?: string;
  onEmpty?: () => void;
  onReloadStart?: () => void;
  onReloadComplete?: () => void;
  onLowAmmo?: () => void;
  lowAmmoThreshold?: number;
  'aria-label'?: string;
}

export function AmmoIndicator({
  current,
  magazineSize,
  reserve,
  pcEntity,
  icon,
  weaponType,
  isReloading: isReloadingProp,
  reloadProgress = 0,
  variant = 'numeric',
  className,
  onEmpty,
  onReloadStart,
  onReloadComplete,
  onLowAmmo,
  lowAmmoThreshold = 0.25,
  'aria-label': ariaLabel,
}: AmmoIndicatorProps): React.JSX.Element {
  const synced = useAmmoSync({ pcEntity });
  const isReloading = isReloadingProp ?? (pcEntity ? synced.isReloading : false);

  const wasEmptyRef = React.useRef(false);
  const wasLowRef = React.useRef(false);
  const wasReloadingRef = React.useRef(isReloading);

  React.useEffect(() => {
    const isEmpty = current <= 0;
    if (isEmpty !== wasEmptyRef.current) {
      wasEmptyRef.current = isEmpty;
      if (isEmpty) onEmpty?.();
    }
    const isLow = current <= magazineSize * lowAmmoThreshold;
    if (isLow !== wasLowRef.current) {
      wasLowRef.current = isLow;
      if (isLow) onLowAmmo?.();
    }
  }, [current, magazineSize, lowAmmoThreshold, onEmpty, onLowAmmo]);

  React.useEffect(() => {
    if (isReloading === wasReloadingRef.current) return;
    wasReloadingRef.current = isReloading;
    if (isReloading) onReloadStart?.();
    else onReloadComplete?.();
  }, [isReloading, onReloadStart, onReloadComplete]);

  const isLow = current <= magazineSize * lowAmmoThreshold;
  const label =
    ariaLabel ??
    `${current} of ${magazineSize} rounds${reserve !== undefined ? ` (+${reserve} reserve)` : ''}`;

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        'flex items-center gap-1 font-mono text-xl',
        isLow && 'text-red-500 animate-pulse',
        className,
      )}
    >
      <Icon name={icon ?? weaponIconFor(weaponType)} className="text-current" />
      {variant === 'numeric' && (
        <Text className="text-current">
          {current}
          {reserve !== undefined && <span className="text-gray-400"> / {reserve}</span>}
        </Text>
      )}
      {variant === 'bar' && <Progress value={current} max={magazineSize} className="w-24" />}
      {variant === 'bullets' && (
        <div className="flex gap-0.5">
          {Array.from({ length: magazineSize }, (_, i) => (
            <span
              key={i}
              className={cn('w-1.5 h-3 rounded-sm', i < current ? 'bg-current' : 'bg-gray-700')}
            />
          ))}
        </div>
      )}
      {isReloading && (
        <Progress value={reloadProgress} max={1} className="w-16" aria-label="Reloading" />
      )}
    </Box>
  );
}

AmmoIndicator.displayName = 'AmmoIndicator';

function weaponIconFor(weaponType?: string): string {
  switch (weaponType) {
    case 'rifle':
      return 'crosshair';
    case 'pistol':
      return 'crosshair';
    default:
      return 'crosshair';
  }
}
