import * as React from 'react';

import { useSync } from '../../hooks/useSync';
import { cn } from '../../internal/cn';
import { Box } from './Box';

/**
 * Accessible input field with PlayCanvas value sync (COMPONENTS.md § Component:
 * Input). Supports both controlled and uncontrolled usage.
 */
export type InputVariant = 'default' | 'outline' | 'ghost' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'type' | 'prefix' | 'suffix'
> {
  value?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Convenience change handler receiving the new value directly; fires alongside
   * `onChange`. */
  onValueChange?: (value: string) => void;
  type?: 'text' | 'number' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'date' | 'file';
  htmlSize?: number;
  pcEntity?: string;
  pcProperty?: string;
  variant?: InputVariant;
  size?: InputSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** When set, automatically applies `aria-invalid="true"` and error styling. */
  error?: string;
}

const VARIANT_CLASSES: Record<InputVariant, string> = {
  default: 'bg-gray-800 border border-gray-700',
  outline: 'bg-transparent border border-gray-600',
  ghost: 'bg-transparent border border-transparent',
  filled: 'bg-gray-700 border border-transparent',
};

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'text-sm px-2 py-1',
  md: 'text-sm px-3 py-2',
  lg: 'text-base px-4 py-2.5',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    value,
    onChange,
    onValueChange,
    type = 'text',
    htmlSize,
    pcEntity,
    pcProperty,
    variant = 'default',
    size = 'md',
    prefix,
    suffix,
    error,
    className,
    'aria-invalid': ariaInvalidProp,
    ...rest
  },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | number | readonly string[]
  >(value ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  // useSync's debounce (default 100ms) must stay enabled for every-keystroke writes,
  // per docs/PERFORMANCE.md -- do not pass `debounce: 0` here.
  const { setValue: syncValue } = useSync({
    entityId: pcEntity ?? '',
    prop: pcProperty ?? '',
    localValue: currentValue,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
    onValueChange?.(e.target.value);
    if (pcEntity && pcProperty) syncValue(e.target.value);
  };

  const ariaInvalid = ariaInvalidProp ?? (error ? true : undefined);

  return (
    <Box as="span" className="inline-flex items-center gap-2">
      {prefix}
      <input
        ref={ref}
        type={type}
        size={htmlSize}
        value={currentValue as string | number | readonly string[]}
        onChange={handleChange}
        aria-invalid={ariaInvalid}
        className={cn(
          'rounded outline-none focus:ring-2 focus:ring-blue-500',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          ariaInvalid && 'border-red-500 focus:ring-red-500',
          className,
        )}
        {...rest}
      />
      {suffix}
    </Box>
  );
});

Input.displayName = 'Input';
