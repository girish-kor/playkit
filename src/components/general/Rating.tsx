import * as React from 'react';

import { useSettingSync } from '../../hooks/useSettingSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';

/** Star-based (or icon-based) input/output for reviews, feedback, or difficulty ratings (COMPONENTS.md § Component: Rating). */
export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  allowHalf?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  pcEntity?: string;
  size?: RatingSize;
  color?: string;
  className?: string;
  onHover?: (value: number | null) => void;
  'aria-label'?: string;
  label?: string;
  showValue?: boolean;
}

const SIZE_CLASSES: Record<RatingSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value,
    max = 5,
    onChange,
    readOnly,
    allowHalf = false,
    icon,
    emptyIcon,
    pcEntity,
    size = 'md',
    color = 'text-yellow-400',
    className,
    onHover,
    'aria-label': ariaLabel,
    label,
    showValue = false,
  },
  ref,
) {
  const isInteractive = !(readOnly ?? !onChange);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const { setValue: syncValue } = useSettingSync({ key: 'rating', pcEntity, defaultValue: value });

  const displayValue = hoverValue ?? value;

  const commit = (next: number) => {
    onChange?.(next);
    if (pcEntity) syncValue(next);
  };

  const handleHover = (next: number | null) => {
    setHoverValue(next);
    onHover?.(next);
  };

  const units = Array.from({ length: max }, (_, i) => i + 1);

  if (!isInteractive) {
    return (
      <Box ref={ref} className={cn('flex flex-col gap-1', className)}>
        {label && <Text size="sm">{label}</Text>}
        <Box
          role="img"
          aria-label={ariaLabel ?? `Rated ${value} out of ${max}`}
          className="flex gap-0.5"
        >
          {units.map((unit) => {
            const filled = unit <= value;
            const half = allowHalf && !filled && unit - 0.5 <= value;
            return (
              <Box key={unit} className={cn('relative', SIZE_CLASSES[size])}>
                <Box className={cn(SIZE_CLASSES[size], 'text-gray-600')}>
                  {emptyIcon ?? <Icon name="star" className={SIZE_CLASSES[size]} />}
                </Box>
                {(filled || half) && (
                  <Box
                    className={cn('absolute inset-0 overflow-hidden', color)}
                    style={half ? { width: '50%' } : undefined}
                  >
                    {icon ?? <Icon name="star" className={SIZE_CLASSES[size]} />}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
        {showValue && <Text size="sm">{value}</Text>}
      </Box>
    );
  }

  return (
    <Box ref={ref} className={cn('flex flex-col gap-1', className)}>
      {label && <Text size="sm">{label}</Text>}
      <Box
        role="radiogroup"
        aria-label={ariaLabel ?? label ?? 'Rating'}
        className="flex gap-0.5"
        onMouseLeave={() => handleHover(null)}
      >
        {units.map((unit) => {
          const checked = unit === Math.ceil(displayValue) && displayValue > unit - 1;
          const filled = unit <= displayValue;
          return (
            <Box
              key={unit}
              as="button"
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`${unit} star${unit === 1 ? '' : 's'}`}
              className={cn(SIZE_CLASSES[size], 'cursor-pointer', filled ? color : 'text-gray-600')}
              onMouseEnter={() => handleHover(unit)}
              onClick={() => commit(unit)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'ArrowRight' && unit === Math.round(displayValue)) {
                  commit(Math.min(max, unit + 1));
                } else if (e.key === 'ArrowLeft' && unit === Math.round(displayValue)) {
                  commit(Math.max(0, unit - 1));
                }
              }}
            >
              {filled
                ? (icon ?? <Icon name="star" className={SIZE_CLASSES[size]} />)
                : (emptyIcon ?? <Icon name="star" className={SIZE_CLASSES[size]} />)}
            </Box>
          );
        })}
      </Box>
      {showValue && <Text size="sm">{value}</Text>}
    </Box>
  );
});

Rating.displayName = 'Rating';
