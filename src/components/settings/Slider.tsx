import * as React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

import { useSettingSync } from '../../hooks/useSettingSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Input } from '../primitives/Input';
import { Text } from '../primitives/Text';

/** Numeric setting with slider and optional input (COMPONENTS.md § Component: Slider). */
export type SettingsSliderVariant = 'horizontal' | 'vertical' | 'with-input';

export interface SettingsSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  pcEntity?: string;
  format?: (value: number) => string;
  showInput?: boolean;
  variant?: SettingsSliderVariant;
  onChange: (value: number) => void;
  onValueChange?: (value: number) => void;
  className?: string;
  onCommit?: (value: number) => void;
  onValueCommit?: (value: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  'aria-label'?: string;
  'aria-valuetext'?: string;
  marks?: number[];
  tooltip?: boolean;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  pcEntity,
  format = String,
  showInput = false,
  variant = 'horizontal',
  onChange,
  onValueChange,
  className,
  onCommit,
  onValueCommit,
  onDragStart,
  onDragEnd,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-valuetext': ariaValueText,
  marks,
  tooltip = true,
}: SettingsSliderProps): React.JSX.Element {
  const { setValue: syncValue } = useSettingSync({ key: label, pcEntity, defaultValue: value });
  const [isDragging, setIsDragging] = React.useState(false);

  const fireChange = (next: number) => {
    onChange(next);
    onValueChange?.(next);
    if (pcEntity) syncValue(next);
  };
  const fireCommit = (next: number) => {
    onCommit?.(next);
    onValueCommit?.(next);
    onDragEnd?.();
    setIsDragging(false);
  };

  return (
    <Box className={cn('w-full', className)}>
      <div className="flex justify-between mb-1">
        <Text className="text-white">{label}</Text>
        {tooltip && (
          <Text size="sm" className="text-gray-400">
            {format(value)}
          </Text>
        )}
      </div>
      <div className={cn('flex items-center gap-2', variant === 'with-input' && 'flex-row')}>
        <RadixSlider.Root
          value={[value]}
          min={min}
          max={max}
          step={step}
          orientation={variant === 'vertical' ? 'vertical' : 'horizontal'}
          onValueChange={([next]) => fireChange(next!)}
          onValueCommit={([next]) => fireCommit(next!)}
          onPointerDown={() => {
            setIsDragging(true);
            onDragStart?.();
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          data-dragging={isDragging || undefined}
          className={cn(
            'relative flex items-center',
            variant === 'vertical' ? 'flex-col h-32 w-4' : 'w-full h-2',
          )}
        >
          <RadixSlider.Track className="bg-gray-700 rounded-full relative grow h-2">
            <RadixSlider.Range className="absolute bg-blue-500 rounded-full h-full" />
          </RadixSlider.Track>
          {/* aria-label/aria-valuetext must go on Thumb, not Root -- Root has no ARIA
              role of its own, and Radix does not forward these down to the thumb
              (which IS the real role="slider" element a slider can have more than
              one of, each needing its own accessible name). Putting them on Root
              left the actual interactive slider with no accessible name at all. */}
          <RadixSlider.Thumb
            aria-label={ariaLabel ?? label}
            aria-valuetext={ariaValueText}
            className="block w-4 h-4 rounded-full bg-blue-500"
          />
        </RadixSlider.Root>
        {(showInput || variant === 'with-input') && (
          <Input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            aria-label={`${label} numeric input`}
            className="w-16"
            onChange={(e) => fireChange(Number(e.target.value))}
          />
        )}
      </div>
      {marks && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {marks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      )}
    </Box>
  );
}

Slider.displayName = 'Slider';
