import * as React from 'react';

import { useEnergySync } from '../../hooks/useEnergySync';
import { Progress } from '../feedback/Progress';
import { Text } from '../primitives/Text';

/**
 * Secondary resource indicator (stamina, mana, etc.) (COMPONENTS.md § Component:
 * Energy). Extends `Progress` directly (not `Health`) to avoid duplication.
 */
export type EnergyVariant = 'horizontal' | 'vertical' | 'circular' | 'segmented';

export interface EnergyProps {
  maxValue: number;
  currentValue: number;
  showText?: boolean;
  pcEntity?: string;
  color?: string;
  animated?: boolean;
  variant?: EnergyVariant;
  segments?: number;
  animationDuration?: number;
  className?: string;
  onValueChange?: (value: number) => void;
  onEmpty?: () => void;
  onMax?: () => void;
  onDeplete?: (amount: number) => void;
  'aria-label'?: string;
  onRegen?: (value: number) => void;
  onRegenStart?: () => void;
  onRegenStop?: () => void;
  regenRate?: number;
}

const REGEN_RESUME_DELAY_MS = 1500;

export function Energy({
  maxValue,
  currentValue,
  showText = false,
  pcEntity,
  color = 'bg-blue-500',
  animated = true,
  variant = 'horizontal',
  segments = 10,
  animationDuration = 300,
  className,
  onValueChange,
  onEmpty,
  onMax,
  onDeplete,
  'aria-label': ariaLabel,
  onRegen,
  onRegenStart,
  onRegenStop,
  regenRate,
}: EnergyProps): React.JSX.Element {
  const { setEnergy } = useEnergySync({ pcEntity });

  const prevValueRef = React.useRef(currentValue);
  const isRegeneratingRef = React.useRef(false);
  const lastDepletedAtRef = React.useRef(0);

  React.useEffect(() => {
    if (prevValueRef.current === currentValue) return;
    const delta = currentValue - prevValueRef.current;
    prevValueRef.current = currentValue;
    onValueChange?.(currentValue);
    if (pcEntity) setEnergy(currentValue);
    if (delta < 0) {
      onDeplete?.(-delta);
      lastDepletedAtRef.current = Date.now();
    }
    if (currentValue <= 0) onEmpty?.();
    if (currentValue >= maxValue) onMax?.();
  }, [currentValue, maxValue, pcEntity, setEnergy, onValueChange, onDeplete, onEmpty, onMax]);

  React.useEffect(() => {
    if (!regenRate || regenRate <= 0) return;
    const id = setInterval(() => {
      const sinceDepleted = Date.now() - lastDepletedAtRef.current;
      if (sinceDepleted < REGEN_RESUME_DELAY_MS) return;
      if (prevValueRef.current >= maxValue) {
        if (isRegeneratingRef.current) {
          isRegeneratingRef.current = false;
          onRegenStop?.();
        }
        return;
      }
      if (!isRegeneratingRef.current) {
        isRegeneratingRef.current = true;
        onRegenStart?.();
      }
      const next = Math.min(maxValue, prevValueRef.current + regenRate / 10);
      prevValueRef.current = next;
      onRegen?.(next);
      onValueChange?.(next);
      if (pcEntity) setEnergy(next);
      if (next >= maxValue) {
        isRegeneratingRef.current = false;
        onRegenStop?.();
        onMax?.();
      }
    }, 100);
    return () => clearInterval(id);
  }, [
    regenRate,
    maxValue,
    pcEntity,
    setEnergy,
    onRegen,
    onRegenStart,
    onRegenStop,
    onValueChange,
    onMax,
  ]);

  return (
    <div
      style={
        animated
          ? ({
              ['--pk-transition-duration' as string]: `${animationDuration}ms`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <Progress
        value={currentValue}
        max={maxValue}
        color={color}
        animated={animated}
        variant={variant === 'segmented' ? 'segmented' : 'determinate'}
        segments={segments}
        className={className}
        aria-label={ariaLabel ?? 'Energy'}
        height={variant === 'vertical' ? undefined : 8}
      />
      {showText && (
        <Text size="sm" className="text-white mt-1">
          {Math.round(currentValue)} / {maxValue}
        </Text>
      )}
    </div>
  );
}

Energy.displayName = 'Energy';
