import * as React from 'react';

import { useSettingSync } from '../../hooks/useSettingSync';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Label } from '../primitives/Label';
import { Text } from '../primitives/Text';
import { Slider } from './Slider';

/**
 * Dedicated control for accessibility-scale settings (text size, UI scale,
 * contrast/motion intensity), kept separate from general-purpose `Slider` usage
 * specifically to force a preview-first UX (COMPONENTS.md § Component:
 * AccessibilitySlider).
 */
export interface AccessibilitySliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  presetLabels?: string[];
  pcEntity?: string;
  previewText?: string;
  className?: string;
  onChange: (value: number) => void;
  onCommit?: (value: number) => void;
  'aria-label'?: string;
  'aria-valuetext'?: string;
  resettable?: boolean;
  defaultValue?: number;
}

export function AccessibilitySlider({
  label,
  value,
  min,
  max,
  step = 1,
  presetLabels,
  pcEntity,
  previewText = 'The quick brown fox',
  className,
  onChange,
  onCommit,
  'aria-label': ariaLabel,
  'aria-valuetext': ariaValueTextProp,
  resettable = true,
  defaultValue,
}: AccessibilitySliderProps): React.JSX.Element {
  useSettingSync({ key: label, pcEntity, defaultValue: value });

  const stepIndex = Math.round((value - min) / (step || 1));
  const ariaValueText = ariaValueTextProp ?? presetLabels?.[stepIndex];
  const scale = max > min ? 0.75 + ((value - min) / (max - min)) * 0.75 : 1;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label>{label}</Label>
      <Slider
        label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel ?? label}
        aria-valuetext={ariaValueText}
        format={(v) =>
          presetLabels
            ? (presetLabels[Math.round((v - min) / (step || 1))] ?? String(v))
            : String(v)
        }
        onChange={onChange}
        onCommit={onCommit}
      />
      <Text aria-hidden="true" style={{ fontSize: `${scale}rem` }} className="text-gray-300">
        {previewText}
      </Text>
      {resettable && defaultValue !== undefined && (
        <Button size="sm" variant="ghost" onPress={() => onChange(defaultValue)}>
          Reset
        </Button>
      )}
    </div>
  );
}

AccessibilitySlider.displayName = 'AccessibilitySlider';
