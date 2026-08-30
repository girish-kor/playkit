import * as React from 'react';

import { cn } from '../../internal/cn';
import { Box, type BoxProps } from './Box';

/**
 * Layout primitive for flexbox with gap, alignment, and direction control
 * (COMPONENTS.md § Component: Flex). Inherits all `Box` props and events; typed
 * layout props generate only base (non-responsive) classes — pass breakpoint-prefixed
 * utilities directly via `className` for responsive behavior (docs/UI-UX.md).
 */
export interface FlexProps extends BoxProps {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  gap?: number | string;
  gapX?: number | string;
  gapY?: number | string;
  wrap?: boolean | 'wrap-reverse';
  flex?: string | number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  order?: number;
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around';
}

function spacingClass(prefix: string, value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${prefix}-${value}` : `${prefix}-${value}`;
}

export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(
  {
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    gap,
    gapX,
    gapY,
    wrap = false,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    order,
    alignSelf,
    justifySelf,
    alignContent,
    className,
    style,
    ...rest
  },
  ref,
) {
  const classes = cn(
    'flex',
    `flex-${direction}`,
    `items-${align}`,
    `justify-${justify}`,
    spacingClass('gap', gap),
    spacingClass('gap-x', gapX),
    spacingClass('gap-y', gapY),
    wrap === true && 'flex-wrap',
    wrap === 'wrap-reverse' && 'flex-wrap-reverse',
    flex !== undefined && `flex-${flex}`,
    alignSelf && `self-${alignSelf}`,
    justifySelf && `justify-self-${justifySelf}`,
    alignContent && `content-${alignContent}`,
    className,
  );

  const mergedStyle: React.CSSProperties | undefined =
    flexGrow !== undefined ||
    flexShrink !== undefined ||
    flexBasis !== undefined ||
    order !== undefined
      ? { flexGrow, flexShrink, flexBasis, order, ...style }
      : style;

  return <Box ref={ref} className={classes} style={mergedStyle} {...rest} />;
});

Flex.displayName = 'Flex';
