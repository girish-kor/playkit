import * as React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';

import { useSettingSync } from '../../hooks/useSettingSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';

/** Boolean setting with switch/checkbox and PlayCanvas sync (COMPONENTS.md § Component: Toggle). */
export type ToggleVariant = 'switch' | 'button-toggle';

export interface ToggleProps {
  label: string;
  value: boolean;
  pcEntity?: string;
  description?: string;
  disabled?: boolean;
  variant?: ToggleVariant;
  onChange: (value: boolean) => void;
  onToggle?: (value: boolean) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  className?: string;
  'aria-label'?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
};

export function Toggle({
  label,
  value,
  pcEntity,
  description,
  disabled = false,
  variant = 'switch',
  onChange,
  onToggle,
  onFocus,
  onBlur,
  className,
  'aria-label': ariaLabel,
  size = 'md',
}: ToggleProps): React.JSX.Element {
  const { setValue: syncValue } = useSettingSync({ key: label, pcEntity, defaultValue: value });

  const fire = (next: boolean) => {
    onChange(next);
    onToggle?.(next);
    if (pcEntity) syncValue(next);
  };

  if (variant === 'button-toggle') {
    return (
      <Box className={cn('flex items-center justify-between', className)}>
        <div>
          <Text className="text-white">{label}</Text>
          {description && (
            <Text size="sm" className="text-gray-400">
              {description}
            </Text>
          )}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          aria-label={ariaLabel ?? label}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={() => fire(!value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cn(
            'px-3 py-1 rounded',
            value ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300',
          )}
        >
          {value ? 'On' : 'Off'}
        </button>
      </Box>
    );
  }

  return (
    <Box className={cn('flex items-center justify-between', className)}>
      <div>
        <Text className="text-white">{label}</Text>
        {description && (
          <Text size="sm" className="text-gray-400">
            {description}
          </Text>
        )}
      </div>
      <RadixSwitch.Root
        checked={value}
        onCheckedChange={fire}
        disabled={disabled}
        aria-label={ariaLabel ?? label}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          'relative inline-flex rounded-full transition-colors',
          SIZE_CLASSES[size],
          value ? 'bg-blue-600' : 'bg-gray-600',
        )}
      >
        <RadixSwitch.Thumb className="block w-4 h-4 bg-white rounded-full translate-x-1 data-[state=checked]:translate-x-6 transition-transform" />
      </RadixSwitch.Root>
    </Box>
  );
}

Toggle.displayName = 'Toggle';
