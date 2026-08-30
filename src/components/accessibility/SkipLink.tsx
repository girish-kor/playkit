import * as React from 'react';

import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';

/** Skip to main content link for keyboard users, visible on focus (COMPONENTS.md § Component: SkipLink). */
export type SkipLinkVariant = 'standard' | 'minimal';

export interface SkipLinkProps {
  targetId: string;
  label?: string;
  offset?: number;
  variant?: SkipLinkVariant;
  className?: string;
  onSkip?: (data: { targetId: string }) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  'aria-label'?: string;
}

export const SkipLink = React.forwardRef<HTMLElement, SkipLinkProps>(function SkipLink(
  {
    targetId,
    label = 'Skip to main content',
    offset = 0,
    variant = 'standard',
    className,
    onSkip,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Button
      ref={ref}
      as="a"
      href={`#${targetId}`}
      role="link"
      aria-label={ariaLabel ?? label}
      variant="secondary"
      className={cn(
        'fixed top-0 left-0 z-[9999] bg-white text-black p-2 -translate-y-full focus:translate-y-0 transition-transform',
        variant === 'minimal' && 'p-1 text-sm',
        className,
      )}
      style={{ top: offset }}
      onPress={() => onSkip?.({ targetId })}
      onFocus={(e: React.FocusEvent) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e: React.FocusEvent) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      data-visible={isFocused || undefined}
    >
      {label}
    </Button>
  );
});

SkipLink.displayName = 'SkipLink';
