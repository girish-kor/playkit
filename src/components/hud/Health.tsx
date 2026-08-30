import * as React from 'react';

import { useAnimation } from '../../hooks/useAnimation';
import { useHealthSync } from '../../hooks/useHealthSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { Progress } from '../feedback/Progress';

/** Player health indicator with smooth animations and PlayCanvas sync (COMPONENTS.md § Component: Health). */
export type HealthVariant = 'horizontal' | 'vertical' | 'circular' | 'segmented';

export interface HealthProps {
  maxValue: number;
  currentValue: number;
  showText?: boolean;
  pcEntity?: string;
  color?: string;
  animated?: boolean;
  variant?: HealthVariant;
  segments?: number;
  lowThreshold?: number;
  animationDuration?: number;
  className?: string;
  onValueChange?: (value: number) => void;
  onMaxValueChange?: (maxValue: number) => void;
  onEmpty?: () => void;
  onMax?: () => void;
  'aria-label'?: string;
  onLow?: () => void;
  onLowThresholdChange?: (threshold: number) => void;
  onCritical?: () => void;
  onCriticalThresholdChange?: (threshold: number) => void;
  onHeal?: (amount: number) => void;
  onDamage?: (amount: number) => void;
  showIcon?: boolean;
  flashOnLow?: boolean;
}

const CRITICAL_FRACTION = 0.1;

export function Health({
  maxValue,
  currentValue,
  showText = false,
  pcEntity,
  color = 'bg-red-500',
  animated = true,
  variant = 'horizontal',
  segments = 10,
  lowThreshold = 0.25 * maxValue,
  animationDuration = 300,
  className,
  onValueChange,
  onMaxValueChange,
  onEmpty,
  onMax,
  'aria-label': ariaLabel,
  onLow,
  onLowThresholdChange,
  onCritical,
  onCriticalThresholdChange,
  onHeal,
  onDamage,
  showIcon = false,
  flashOnLow = true,
}: HealthProps): React.JSX.Element {
  const { setHealth } = useHealthSync({ pcEntity });

  const prevValueRef = React.useRef(currentValue);
  const prevMaxRef = React.useRef(maxValue);
  const prevLowRef = React.useRef(lowThreshold);
  const wasLowRef = React.useRef(false);
  const wasCriticalRef = React.useRef(false);

  const criticalThreshold = maxValue * CRITICAL_FRACTION;

  React.useEffect(() => {
    if (prevValueRef.current !== currentValue) {
      const delta = currentValue - prevValueRef.current;
      prevValueRef.current = currentValue;
      onValueChange?.(currentValue);
      if (pcEntity) setHealth(currentValue);
      if (delta > 0) onHeal?.(delta);
      if (delta < 0) onDamage?.(-delta);
      if (currentValue <= 0) onEmpty?.();
      if (currentValue >= maxValue) onMax?.();
    }
    if (prevMaxRef.current !== maxValue) {
      prevMaxRef.current = maxValue;
      onMaxValueChange?.(maxValue);
    }
    if (prevLowRef.current !== lowThreshold) {
      prevLowRef.current = lowThreshold;
      onLowThresholdChange?.(lowThreshold);
    }

    const isLow = currentValue < lowThreshold;
    if (isLow !== wasLowRef.current) {
      wasLowRef.current = isLow;
      if (isLow) onLow?.();
    }
    const isCritical = currentValue <= criticalThreshold;
    if (isCritical !== wasCriticalRef.current) {
      wasCriticalRef.current = isCritical;
      if (isCritical) onCritical?.();
      onCriticalThresholdChange?.(criticalThreshold);
    }
  }, [
    currentValue,
    maxValue,
    lowThreshold,
    criticalThreshold,
    pcEntity,
    setHealth,
    onValueChange,
    onMaxValueChange,
    onEmpty,
    onMax,
    onLow,
    onLowThresholdChange,
    onCritical,
    onCriticalThresholdChange,
    onHeal,
    onDamage,
  ]);

  // Tracks the value to animate FROM, using React's sanctioned "adjusting state
  // when a prop changes" pattern (react.dev) rather than reading a ref during render.
  const [trackedValue, setTrackedValue] = React.useState(currentValue);
  const [animFrom, setAnimFrom] = React.useState(currentValue);
  if (currentValue !== trackedValue) {
    setAnimFrom(trackedValue);
    setTrackedValue(currentValue);
  }

  const { value: animatedValue } = useAnimation({
    from: animFrom,
    to: currentValue,
    duration: animated ? animationDuration : 0,
  });
  const displayValue = animated ? animatedValue : currentValue;

  const isLow = currentValue < lowThreshold;
  const isCritical = currentValue <= criticalThreshold;

  return (
    <Box
      className={cn(
        variant === 'vertical' && 'h-32 w-4',
        flashOnLow && isLow && 'animate-pulse',
        className,
      )}
    >
      <Progress
        value={displayValue}
        max={maxValue}
        color={color}
        animated={animated}
        variant={variant === 'segmented' ? 'segmented' : 'determinate'}
        segments={segments}
        showValue={false}
        aria-label={ariaLabel ?? 'Health'}
      />
      {/* Progress above already carries the single role="progressbar" landmark
          (COMPONENTS.md's Progress accessibility contract); this is a supplementary
          sr-only *announcement* region, not a second progressbar, so it takes
          role="status" rather than duplicating role="progressbar" with the same
          value -- doing the latter would give assistive tech two progressbar
          landmarks reporting the same number (see the fix applied to Avatar for the
          same class of bug). */}
      <div role="status" aria-live={isCritical ? 'assertive' : 'polite'} className="sr-only">
        {ariaLabel ?? 'Health'}: {currentValue} of {maxValue}
      </div>
      {(showText || showIcon) && (
        <div className="flex items-center gap-1 mt-1">
          {showIcon && <Icon name="heart" className={color.replace('bg-', 'text-')} />}
          {showText && (
            <Text size="sm" className="text-white">
              {Math.round(currentValue)} / {maxValue}
            </Text>
          )}
        </div>
      )}
    </Box>
  );
}

Health.displayName = 'Health';
