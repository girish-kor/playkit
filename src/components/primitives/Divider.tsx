import * as React from 'react';

import { cn } from '../../internal/cn';

/** Horizontal or vertical separator line, with an optional inline label
 * (COMPONENTS.md § Component: Divider). */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
  labelPosition?: 'start' | 'center' | 'end';
  variant?: DividerVariant;
  color?: string;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
  role?: string;
  'aria-orientation'?: 'horizontal' | 'vertical';
}

const BORDER_STYLE_CLASSES: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const SPACING_CLASSES = { sm: 2, md: 4, lg: 8 } as const;

export function Divider({
  orientation = 'horizontal',
  label,
  labelPosition = 'center',
  variant = 'solid',
  color = 'border-gray-700',
  spacing = 'md',
  className,
  role = 'separator',
  'aria-orientation': ariaOrientation,
}: DividerProps): React.JSX.Element {
  const spacingValue = SPACING_CLASSES[spacing];
  const isVertical = orientation === 'vertical';

  if (label) {
    return (
      <div
        role={role}
        aria-orientation={ariaOrientation ?? orientation}
        className={cn('flex items-center', isVertical ? 'flex-col' : 'flex-row', className)}
        style={
          isVertical
            ? { marginLeft: spacingValue * 4, marginRight: spacingValue * 4 }
            : { marginTop: spacingValue * 4, marginBottom: spacingValue * 4 }
        }
      >
        {labelPosition !== 'start' && (
          <span className={cn('flex-1 border-t', BORDER_STYLE_CLASSES[variant], color)} />
        )}
        <span className="px-2 text-sm text-gray-400">{label}</span>
        {labelPosition !== 'end' && (
          <span className={cn('flex-1 border-t', BORDER_STYLE_CLASSES[variant], color)} />
        )}
      </div>
    );
  }

  return (
    <div
      role={role}
      aria-orientation={ariaOrientation ?? orientation}
      className={cn(
        isVertical ? `border-l h-full mx-${spacingValue}` : `border-t w-full my-${spacingValue}`,
        BORDER_STYLE_CLASSES[variant],
        color,
        className,
      )}
    />
  );
}

Divider.displayName = 'Divider';
