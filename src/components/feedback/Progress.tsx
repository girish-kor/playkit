import * as React from 'react';

import { useProgressSync } from '../../hooks/useProgressSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';

/** Generic progress indicator used by `Health`, `Energy`, etc. (COMPONENTS.md § Component: Progress). */
export type ProgressVariant = 'determinate' | 'indeterminate' | 'segmented';

export interface ProgressProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  animated?: boolean;
  indeterminate?: boolean;
  variant?: ProgressVariant;
  className?: string;
  onComplete?: () => void;
  onChange?: (value: number) => void;
  onValueChange?: (value: number) => void;
  onMaxReached?: () => void;
  onMinReached?: () => void;
  'aria-label'?: string;
  height?: number;
  segments?: number;
  showValue?: boolean;
  pcEntity?: string;
}

export function Progress({
  value,
  max,
  label,
  color = 'bg-blue-500',
  animated = true,
  indeterminate = false,
  variant = 'determinate',
  className,
  onComplete,
  onChange,
  onValueChange,
  onMaxReached,
  onMinReached,
  'aria-label': ariaLabelProp,
  height = 8,
  segments = 10,
  showValue = false,
  pcEntity,
}: ProgressProps): React.JSX.Element {
  useProgressSync({ pcEntity });

  const prevValueRef = React.useRef(value);
  React.useEffect(() => {
    if (prevValueRef.current === value) return;
    prevValueRef.current = value;
    onChange?.(value);
    onValueChange?.(value);
    if (value >= max) {
      onMaxReached?.();
      onComplete?.();
    }
    if (value <= 0) onMinReached?.();
  }, [value, max, onChange, onValueChange, onMaxReached, onMinReached, onComplete]);

  const isIndeterminate = indeterminate || variant === 'indeterminate';
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  const ariaLabel = ariaLabelProp ?? (label ? `${label}: ${value} of ${max}` : undefined);

  return (
    <Box
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={cn('w-full bg-gray-700 rounded-full overflow-hidden relative', className)}
      style={{ height }}
    >
      {variant === 'segmented' ? (
        <div className="flex gap-0.5 h-full">
          {Array.from({ length: segments }, (_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 rounded-sm',
                i / segments < percent / 100 ? color : 'bg-transparent',
              )}
            />
          ))}
        </div>
      ) : (
        <div
          className={cn(
            'h-full rounded-full',
            color,
            animated && 'transition-all duration-300',
            isIndeterminate && 'animate-pulse w-1/3',
          )}
          style={isIndeterminate ? undefined : { width: `${percent}%` }}
        />
      )}
      {showValue && (
        <Text size="xs" className="absolute inset-0 flex items-center justify-center text-white">
          {Math.round(percent)}%
        </Text>
      )}
    </Box>
  );
}

Progress.displayName = 'Progress';
