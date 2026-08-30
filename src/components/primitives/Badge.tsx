import * as React from 'react';

import { useBadgeSync } from '../../hooks/useBadgeSync';
import { cn } from '../../internal/cn';
import { Text } from './Text';

/**
 * Small numeric/status indicator overlaid on icons or content (COMPONENTS.md §
 * Component: Badge).
 */
export type BadgeVariant = 'solid' | 'outline' | 'dot';
export type BadgeColor = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  content?: string | number;
  max?: number;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: 'sm' | 'md' | 'lg';
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
  children?: React.ReactNode;
  pcEntity?: string;
  className?: string;
  'aria-label'?: string;
  showZero?: boolean;
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  default: 'bg-gray-600',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const PLACEMENT_CLASSES: Record<Exclude<BadgeProps['placement'], undefined>, string> = {
  'top-right': 'absolute -top-1 -right-1',
  'top-left': 'absolute -top-1 -left-1',
  'bottom-right': 'absolute -bottom-1 -right-1',
  'bottom-left': 'absolute -bottom-1 -left-1',
  inline: 'relative inline-flex',
};

export function Badge({
  content,
  max,
  variant = 'solid',
  color = 'default',
  size = 'md',
  placement = 'top-right',
  children,
  pcEntity,
  className,
  'aria-label': ariaLabel,
  showZero = false,
}: BadgeProps): React.JSX.Element {
  const { content: syncedContent } = useBadgeSync({ pcEntity });
  const resolvedContent = pcEntity ? syncedContent : content;

  const numeric = typeof resolvedContent === 'number';
  const displayContent =
    numeric && max !== undefined && (resolvedContent as number) > max ? `${max}+` : resolvedContent;

  const isVisible =
    variant === 'dot' || (resolvedContent !== undefined && (resolvedContent !== 0 || showZero));

  const badgeNode = isVisible && (
    <span
      className={cn(
        placement !== 'inline' && PLACEMENT_CLASSES[placement],
        'rounded-full text-white flex items-center justify-center',
        COLOR_CLASSES[color],
        variant === 'outline' && 'bg-transparent border-2',
        variant === 'dot'
          ? 'w-2 h-2 p-0'
          : cn(
              'min-w-[1.25rem] px-1.5',
              size === 'sm' && 'text-[10px] h-4',
              size === 'md' && 'text-xs h-5',
              size === 'lg' && 'text-sm h-6',
            ),
        className,
      )}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    >
      {variant !== 'dot' && (
        <Text as="span" size="xs" className="text-white">
          {displayContent}
        </Text>
      )}
    </span>
  );

  if (!children) return <>{badgeNode}</>;

  return (
    <span className="relative inline-flex">
      {children}
      {badgeNode}
    </span>
  );
}

Badge.displayName = 'Badge';
