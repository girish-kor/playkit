import * as React from 'react';

import { cn } from '../../internal/cn';
import { Box, type BoxProps } from './Box';

/** Container with background, rounded corners, and shadow (COMPONENTS.md § Component: Card). */
export type CardVariant = 'default' | 'outline' | 'elevated' | 'hoverable';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends Omit<BoxProps, 'variant'> {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Adds hover effects, cursor pointer, keyboard focus, and enables `onClick`. */
  clickable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  elevation?: number;
  borderColor?: string;
  radius?: CardRadius;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: 'bg-gray-800',
  outline: 'bg-transparent border border-gray-700',
  elevated: 'bg-gray-800 shadow-lg',
  hoverable: 'bg-gray-800 hover:shadow-lg transition-shadow',
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

const RADIUS_CLASSES: Record<CardRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = 'default',
    padding = 'md',
    clickable = false,
    header,
    footer,
    actions,
    loading = false,
    elevation,
    borderColor,
    radius = 'md',
    onClick,
    role,
    className,
    children,
    tabIndex,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e);
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      (onClick as unknown as ((e: unknown) => void) | undefined)?.(e);
    }
  };

  return (
    <Box
      ref={ref}
      role={role ?? (header ? 'region' : undefined)}
      className={cn(
        VARIANT_CLASSES[variant],
        elevation !== undefined && `shadow-${elevation}`,
        borderColor,
        RADIUS_CLASSES[radius],
        clickable && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500',
        loading && 'animate-pulse',
        className,
      )}
      tabIndex={clickable ? (tabIndex ?? 0) : tabIndex}
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      {...rest}
    >
      {header && (
        <div className={cn('border-b border-gray-700', PADDING_CLASSES[padding])}>{header}</div>
      )}
      <div className={cn(PADDING_CLASSES[padding], 'flex-1')}>{children}</div>
      {actions && (
        <div className={cn('flex justify-end gap-2', PADDING_CLASSES[padding])}>{actions}</div>
      )}
      {footer && (
        <div className={cn('border-t border-gray-700', PADDING_CLASSES[padding])}>{footer}</div>
      )}
    </Box>
  );
});

Card.displayName = 'Card';
