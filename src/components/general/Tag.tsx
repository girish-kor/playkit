import * as React from 'react';

import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';

/** Small label chip with optional removal (COMPONENTS.md § Component: Tag). */
export type TagVariant = 'solid' | 'outline' | 'subtle';
export type TagColor = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  label: string;
  icon?: React.ReactNode;
  variant?: TagVariant;
  color?: TagColor;
  size?: TagSize;
  removable?: boolean;
  onRemove?: () => void;
  pcEntity?: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  'aria-label'?: string;
  disabled?: boolean;
}

const COLOR_CLASSES: Record<TagVariant, Record<TagColor, string>> = {
  solid: {
    default: 'bg-gray-600 text-white',
    primary: 'bg-blue-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  },
  outline: {
    default: 'border border-gray-500 text-gray-300',
    primary: 'border border-blue-500 text-blue-300',
    success: 'border border-green-500 text-green-300',
    warning: 'border border-yellow-500 text-yellow-300',
    error: 'border border-red-500 text-red-300',
  },
  subtle: {
    default: 'bg-gray-700/50 text-gray-300',
    primary: 'bg-blue-900/40 text-blue-300',
    success: 'bg-green-900/40 text-green-300',
    warning: 'bg-yellow-900/40 text-yellow-300',
    error: 'bg-red-900/40 text-red-300',
  },
};

const SIZE_CLASSES: Record<TagSize, string> = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-0.5',
};

export const Tag = React.forwardRef<HTMLElement, TagProps>(function Tag(
  {
    label,
    icon,
    variant = 'subtle',
    color = 'default',
    size = 'md',
    removable = false,
    onRemove,
    onClick,
    selected,
    className,
    'aria-label': ariaLabel,
    disabled = false,
  },
  ref,
) {
  if (process.env.NODE_ENV !== 'production' && removable && !onRemove) {
    console.error('Tag: `onRemove` is required when `removable` is true.');
  }

  const isToggle = Boolean(onClick);
  const rootClassName = cn(
    'inline-flex items-center gap-1 rounded-full',
    COLOR_CLASSES[variant][color],
    SIZE_CLASSES[size],
    disabled && 'opacity-50 pointer-events-none',
    className,
  );

  const content = (
    <>
      {icon}
      <Text as="span" size={size === 'sm' ? 'xs' : 'sm'}>
        {label}
      </Text>
      {removable && (
        <Button
          as="span"
          variant="icon-only"
          size="sm"
          aria-label={`Remove ${label}`}
          className="hover:bg-black/20 rounded-full p-0.5 -mr-0.5"
          onPress={() => onRemove?.()}
        >
          <Icon name="x" size={12} aria-hidden="true" />
        </Button>
      )}
    </>
  );

  if (isToggle) {
    return (
      <Button
        ref={ref}
        variant="ghost"
        role="button"
        aria-pressed={selected}
        aria-label={ariaLabel ?? label}
        disabled={disabled}
        onPress={onClick}
        className={rootClassName}
      >
        {content}
      </Button>
    );
  }

  return (
    <Box ref={ref} role="status" aria-label={ariaLabel} className={rootClassName}>
      {content}
    </Box>
  );
});

Tag.displayName = 'Tag';
