import * as React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

import { useSettingSync } from '../../hooks/useSettingSync';
import { cn } from '../../internal/cn';

/**
 * Group of mutually exclusive options, distinct from `Select`'s dropdown and
 * `Toggle`'s binary switch (COMPONENTS.md § Component: RadioGroup). Uses Radix
 * RadioGroup for roving-tabindex keyboard behavior.
 */
export type RadioGroupVariant = 'default' | 'button-group' | 'card';

export interface RadioGroupOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  name?: string;
  /** PlayCanvas setting key. */
  pcEntity?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: RadioGroupVariant;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

function itemClasses(variant: RadioGroupVariant, checked: boolean): string {
  if (variant === 'button-group') {
    return cn(
      'px-3 py-1.5 rounded border',
      checked ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-600 text-gray-300',
    );
  }
  if (variant === 'card') {
    return cn('p-3 rounded-lg border', checked ? 'border-blue-500 bg-gray-800' : 'border-gray-700');
  }
  return 'w-4 h-4 rounded-full border-2 border-gray-600 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500';
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  pcEntity,
  orientation = 'vertical',
  variant = 'default',
  disabled = false,
  className,
  'aria-label': ariaLabel,
  onFocus,
  onBlur,
}: RadioGroupProps): React.JSX.Element {
  const { setValue: syncValue } = useSettingSync({
    key: name ?? 'radioGroup',
    pcEntity,
    defaultValue: value,
  });

  const handleChange = (next: string) => {
    const original = options.find((o) => String(o.value) === next)?.value ?? next;
    onChange(original);
    syncValue(original);
  };

  return (
    <RadixRadioGroup.Root
      value={value === null ? undefined : String(value)}
      onValueChange={handleChange}
      name={name}
      disabled={disabled}
      aria-label={ariaLabel}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        'flex gap-2',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className,
      )}
    >
      {options.map((option) => {
        const checked = value !== null && String(value) === String(option.value);
        return (
          <label
            key={String(option.value)}
            className={cn(
              'inline-flex items-center gap-2',
              option.disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            <RadixRadioGroup.Item
              value={String(option.value)}
              disabled={option.disabled}
              className={itemClasses(variant, checked)}
            >
              {variant === 'default' && (
                <RadixRadioGroup.Indicator className="flex items-center justify-center w-full h-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </RadixRadioGroup.Indicator>
              )}
            </RadixRadioGroup.Item>
            {option.label}
          </label>
        );
      })}
    </RadixRadioGroup.Root>
  );
}

RadioGroup.displayName = 'RadioGroup';
