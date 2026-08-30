import * as React from 'react';
import { useButton, useHover } from 'react-aria';

import { useAction } from '../../hooks/useAction';
import { cn } from '../../internal/cn';
import { mergeRefs } from '../../internal/mergeRefs';
import { Box } from './Box';

/**
 * Accessible button with loading state and PlayCanvas action triggering
 * (COMPONENTS.md § Component: Button). Interaction behavior is delegated entirely to
 * react-aria's `useButton`/`useHover` — never a hand-rolled `<button>`
 * (docs/CODING-STANDARDS.md).
 */
export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'icon-only';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'onClick' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'
> {
  as?: React.ElementType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  pcAction?: string;
  pcEntity?: string;
  /** Preferred activation handler — use this instead of `onClick`. */
  onPress?: () => void;
  isSelected?: boolean;
  isPressed?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  role?: string;
  'aria-disabled'?: boolean;
  'aria-pressed'?: boolean;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  formAction?: string;
  formMethod?: 'get' | 'post';
  formTarget?: string;
  formEncType?: string;
  loadingText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  /** Discouraged — see docs/UI-UX.md. Fires a one-time dev warning; use `onPress`. */
  onClick?: (e: React.MouseEvent) => void;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'bg-gray-700 text-white hover:bg-gray-600',
  outline: 'bg-transparent text-white border border-gray-600 hover:bg-gray-800',
  ghost: 'bg-transparent text-white hover:bg-gray-800',
  destructive: 'bg-red-600 text-white hover:bg-red-500',
  'icon-only': 'bg-transparent text-white hover:bg-gray-800 p-2',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'text-sm px-2.5 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    as,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    autoFocus,
    tabIndex,
    pcAction,
    pcEntity,
    onPress,
    isSelected,
    isPressed: controlledPressed,
    href,
    target,
    rel,
    children,
    className,
    'aria-label': ariaLabel,
    role = 'button',
    'aria-disabled': ariaDisabled,
    'aria-pressed': ariaPressedProp,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    type = 'button',
    form,
    formAction,
    formMethod,
    formTarget,
    formEncType,
    loadingText,
    startIcon,
    endIcon,
    onHoverStart,
    onHoverEnd,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onClick,
    ...rest
  },
  forwardedRef,
) {
  if (process.env.NODE_ENV !== 'production' && variant === 'icon-only' && !ariaLabel) {
    console.error(
      'Button: `aria-label` is required when `variant="icon-only"` (no visible text to derive an accessible name from).',
    );
  }

  const warnedOnClickRef = React.useRef(false);
  const handleDeprecatedClick = React.useMemo(() => {
    if (!onClick) return undefined;
    return (e: React.MouseEvent) => {
      if (process.env.NODE_ENV !== 'production' && !warnedOnClickRef.current) {
        warnedOnClickRef.current = true;
        console.warn('Button: `onClick` is discouraged; use `onPress` for accessibility.');
      }
      onClick(e);
    };
  }, [onClick]);

  const { execute } = useAction({ pcEntity: pcEntity ?? '', method: pcAction ?? '' });

  const innerRef = React.useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const isDisabled = disabled || loading;

  const { buttonProps, isPressed: rendererPressed } = useButton(
    {
      elementType: (as ?? (href ? 'a' : 'button')) as React.ElementType,
      isDisabled,
      href,
      target,
      rel,
      type,
      onPress: () => {
        if (isDisabled) return;
        onPress?.();
        if (pcAction && pcEntity) execute();
      },
      'aria-label': loading && loadingText ? loadingText : ariaLabel,
      'aria-haspopup': undefined,
    },
    innerRef as React.RefObject<HTMLElement>,
  );

  const { hoverProps, isHovered } = useHover({
    isDisabled,
    onHoverStart: () => onHoverStart?.(),
    onHoverEnd: () => onHoverEnd?.(),
  });

  const isPressed = controlledPressed ?? rendererPressed;

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && 'w-full',
    loading && 'opacity-75 cursor-wait',
    isSelected && 'ring-2 ring-blue-400',
    className,
  );

  // react-aria's `buttonProps` owns onClick/onKeyDown/onKeyUp for press mechanics;
  // compose rather than let object-spread order silently drop one side's handler.
  const composedKeyDown = (e: React.KeyboardEvent) => {
    (buttonProps.onKeyDown as ((e: React.KeyboardEvent) => void) | undefined)?.(e);
    onKeyDown?.(e);
  };
  const composedKeyUp = (e: React.KeyboardEvent) => {
    (buttonProps.onKeyUp as ((e: React.KeyboardEvent) => void) | undefined)?.(e);
    onKeyUp?.(e);
  };
  const composedClick = (e: React.MouseEvent) => {
    (buttonProps.onClick as ((e: React.MouseEvent) => void) | undefined)?.(e);
    handleDeprecatedClick?.(e);
  };

  return (
    <Box
      {...buttonProps}
      {...hoverProps}
      {...rest}
      as={as ?? (href ? 'a' : 'button')}
      ref={mergeRefs(innerRef, forwardedRef)}
      className={classes}
      role={role}
      tabIndex={tabIndex}
      // eslint-disable-next-line jsx-a11y/no-autofocus -- `autoFocus` is a documented Button prop (COMPONENTS.md), caller-opted-in per instance.
      autoFocus={autoFocus}
      aria-disabled={ariaDisabled ?? isDisabled}
      aria-pressed={ariaPressedProp ?? (isSelected !== undefined ? isSelected : undefined)}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-busy={loading || undefined}
      form={form}
      formAction={formAction}
      formMethod={formMethod}
      formTarget={formTarget}
      formEncType={formEncType}
      onFocus={(e: React.FocusEvent) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e: React.FocusEvent) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      onKeyDown={composedKeyDown}
      onKeyUp={composedKeyUp}
      onClick={composedClick}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
    >
      {loading ? <span aria-hidden="true">⏳</span> : startIcon}
      {children}
      {!loading && endIcon}
    </Box>
  );
});

Button.displayName = 'Button';
