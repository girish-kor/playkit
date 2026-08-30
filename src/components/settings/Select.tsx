import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';

import { useSettingSync } from '../../hooks/useSettingSync';
import { cn } from '../../internal/cn';
import { Icon } from '../primitives/Icon';

/** Dropdown for choosing among options (COMPONENTS.md § Component: Select). */
export type SettingsSelectVariant = 'dropdown' | 'button-group';

export interface SettingsSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SettingsSelectProps {
  label: string;
  value: string | number | null;
  options: SettingsSelectOption[];
  pcEntity?: string;
  placeholder?: string;
  variant?: SettingsSelectVariant;
  onChange: (value: string | number | null) => void;
  onSelect?: (value: string | number | null) => void;
  disabled?: boolean;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  'aria-label'?: string;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  filter?: (option: SettingsSelectOption, query: string) => boolean;
}

export function Select({
  label,
  value,
  options,
  pcEntity,
  placeholder,
  variant = 'dropdown',
  onChange,
  onSelect,
  disabled = false,
  className,
  onOpen,
  onClose,
  onOpenChange,
  'aria-label': ariaLabel,
  searchable = false,
  onSearch,
  filter,
}: SettingsSelectProps): React.JSX.Element {
  const { setValue: syncValue } = useSettingSync({ key: label, pcEntity, defaultValue: value });
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const fire = (next: string | number | null) => {
    onChange(next);
    onSelect?.(next);
    if (pcEntity) syncValue(next);
  };

  const visibleOptions = query
    ? options.filter((o) =>
        filter ? filter(o, query) : o.label.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  if (variant === 'button-group') {
    return (
      <div
        role="group"
        aria-label={ariaLabel ?? label}
        className={cn('flex gap-1 flex-wrap', className)}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled || disabled}
            aria-pressed={value === option.value}
            onClick={() => fire(option.value)}
            className={cn(
              'px-3 py-1.5 rounded border',
              value === option.value
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'border-gray-600 text-gray-300',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <RadixSelect.Root
      value={value === null ? undefined : String(value)}
      onValueChange={(v) => {
        const original = options.find((o) => String(o.value) === v)?.value ?? v;
        fire(original);
      }}
      disabled={disabled}
      onOpenChange={(open) => {
        setIsOpen(open);
        onOpenChange?.(open);
        if (open) onOpen?.();
        else onClose?.();
      }}
    >
      <RadixSelect.Trigger
        aria-label={ariaLabel ?? label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'w-full px-3 py-2 bg-gray-700 rounded-md border hover:bg-gray-600 flex justify-between items-center',
          className,
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <Icon name="chevron-down" size={4} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="bg-gray-800 border rounded-md shadow-lg">
          {searchable && (
            <input
              type="search"
              aria-label="Search options"
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="w-full px-2 py-1 bg-gray-900 text-white text-sm"
            />
          )}
          <RadixSelect.Viewport className="p-1">
            {visibleOptions.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={String(option.value)}
                disabled={option.disabled}
                className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

Select.displayName = 'Select';
