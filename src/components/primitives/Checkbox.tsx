import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';

import { useSync } from '../../hooks/useSync';
import { cn } from '../../internal/cn';

/**
 * Accessible checkbox with indeterminate state and PlayCanvas sync (COMPONENTS.md §
 * Component: Checkbox). For a toggle switch, use `Toggle` instead. Uses Radix
 * Checkbox for keyboard/screen-reader support (docs/CODING-STANDARDS.md).
 */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  /** Alias for `onChange` (Radix naming convention); fires alongside `onChange`. */
  onCheckedChange?: (checked: boolean) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  pcEntity?: string;
  pcProperty?: string;
  label?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  name?: string;
  value?: string;
  form?: string;
  onIndeterminateChange?: (indeterminate: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  {
    checked,
    defaultChecked = false,
    indeterminate = false,
    onChange,
    onCheckedChange,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    required,
    pcEntity,
    pcProperty,
    label,
    className,
    onIndeterminateChange,
    ...rest
  },
  ref,
) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolled;

  const prevIndeterminateRef = React.useRef(indeterminate);
  React.useEffect(() => {
    if (prevIndeterminateRef.current !== indeterminate) {
      prevIndeterminateRef.current = indeterminate;
      onIndeterminateChange?.(indeterminate);
    }
  }, [indeterminate, onIndeterminateChange]);

  const { setValue: syncValue } = useSync({
    entityId: pcEntity ?? '',
    prop: pcProperty ?? '',
    localValue: isChecked,
  });

  const fire = (next: boolean) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
    onCheckedChange?.(next);
    if (pcEntity && pcProperty) syncValue(next);
  };

  const radixChecked: RadixCheckbox.CheckedState = indeterminate ? 'indeterminate' : isChecked;

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <RadixCheckbox.Root
        ref={ref}
        checked={radixChecked}
        onCheckedChange={(next) => fire(next === true)}
        disabled={disabled}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-readonly={readOnly}
        className={cn(
          'w-4 h-4 rounded border bg-gray-700 border-gray-600 flex items-center justify-center',
          'data-[state=checked]:bg-blue-600 data-[state=indeterminate]:bg-blue-600',
        )}
        {...rest}
      >
        <RadixCheckbox.Indicator className="text-white">
          {indeterminate ? <MinusGlyph /> : <CheckGlyph />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

function CheckGlyph(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 16 16"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M3 8l3 3 7-7" />
    </svg>
  );
}

function MinusGlyph(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 16 16"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M3 8h10" />
    </svg>
  );
}
