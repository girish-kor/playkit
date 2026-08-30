import * as React from 'react';

import { useSettingSync } from '../../hooks/useSettingSync';
import { cn } from '../../internal/cn';
import { Input } from '../primitives/Input';
import { Label } from '../primitives/Label';
import { Popover } from '../primitives/Popover';
import { Slider } from './Slider';

/**
 * User-facing color selection control, distinct from `Property`'s internal color
 * editor for dev-only entity editing (COMPONENTS.md § Component: ColorPicker).
 */
export type ColorPickerVariant = 'swatch' | 'wheel' | 'sliders';
export type ColorPickerFormat = 'hex' | 'rgb' | 'hsl';

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  pcEntity?: string;
  presets?: string[];
  allowAlpha?: boolean;
  format?: ColorPickerFormat;
  variant?: ColorPickerVariant;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  'aria-label'?: string;
  label?: string;
  disabled?: boolean;
}

function parseRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const bigint = parseInt(
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean,
    16,
  );
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function toHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, '0')).join('')}`;
}

export function ColorPicker({
  value,
  onChange,
  pcEntity,
  presets = [],
  variant = 'swatch',
  className,
  onOpen,
  onClose,
  'aria-label': ariaLabel,
  label,
  disabled = false,
}: ColorPickerProps): React.JSX.Element {
  const { setValue: syncValue } = useSettingSync({
    key: label ?? 'color',
    pcEntity,
    defaultValue: value,
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const fire = (next: string) => {
    onChange(next);
    if (pcEntity) syncValue(next);
  };

  const rgb = value.startsWith('#') ? parseRgb(value) : { r: 0, g: 0, b: 0 };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <Label>{label}</Label>}
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) onOpen?.();
          else onClose?.();
        }}
        content={
          <div className="bg-gray-800 rounded-lg shadow-xl p-3 w-56">
            {presets.length > 0 && (
              <div className="grid grid-cols-8 gap-1 mb-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    aria-label={preset}
                    className="w-5 h-5 rounded border border-gray-600"
                    style={{ backgroundColor: preset }}
                    onClick={() => fire(preset)}
                  />
                ))}
              </div>
            )}
            {variant === 'sliders' ? (
              <div className="flex flex-col gap-2">
                <Slider
                  label="R"
                  value={rgb.r}
                  min={0}
                  max={255}
                  onChange={(r) => fire(toHex(r, rgb.g, rgb.b))}
                />
                <Slider
                  label="G"
                  value={rgb.g}
                  min={0}
                  max={255}
                  onChange={(g) => fire(toHex(rgb.r, g, rgb.b))}
                />
                <Slider
                  label="B"
                  value={rgb.b}
                  min={0}
                  max={255}
                  onChange={(b) => fire(toHex(rgb.r, rgb.g, b))}
                />
              </div>
            ) : (
              <input
                type="color"
                value={value}
                disabled={disabled}
                onChange={(e) => fire(e.target.value)}
                className="w-full h-24"
              />
            )}
            <Input
              value={value}
              aria-label="Color value"
              className="mt-2"
              onChange={(e) => fire(e.target.value)}
            />
          </div>
        }
      >
        <button
          type="button"
          aria-label={ariaLabel ?? `Color: ${value}`}
          disabled={disabled}
          className="w-8 h-8 rounded border-2 border-gray-600"
          style={{ backgroundColor: value }}
        />
      </Popover>
    </div>
  );
}

ColorPicker.displayName = 'ColorPicker';
