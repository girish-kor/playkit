import * as React from 'react';

import { cn } from '../../internal/cn';
import { Box, type BoxProps } from './Box';

/**
 * Primitive for CSS grid with column/row definitions (COMPONENTS.md § Component:
 * Grid). `role` defaults to `'none'` since Grid is layout-only by default — set
 * `role="grid"` explicitly only when interactively navigable (docs/ACCESSIBILITY.md).
 */
export interface GridProps extends BoxProps {
  cols?: number | string;
  rows?: number | string;
  gap?: number | string;
  autoColumns?: string;
  autoRows?: string;
  flow?: 'row' | 'col' | 'row-dense' | 'col-dense';
  placeItems?: 'start' | 'end' | 'center' | 'stretch';
  placeContent?:
    'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  /** Applied to a `Grid` child to span multiple columns. */
  colSpan?: number | 'full';
  /** Applied to a `Grid` child to span multiple rows. */
  rowSpan?: number | 'full';
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
  {
    cols,
    rows,
    gap,
    autoColumns,
    autoRows,
    flow,
    placeItems,
    placeContent,
    justifyItems,
    colSpan,
    rowSpan,
    role = 'none',
    className,
    ...rest
  },
  ref,
) {
  const classes = cn(
    'grid',
    cols !== undefined && `grid-cols-${cols}`,
    rows !== undefined && `grid-rows-${rows}`,
    gap !== undefined && `gap-${gap}`,
    autoColumns && `auto-cols-${autoColumns}`,
    autoRows && `auto-rows-${autoRows}`,
    flow && `grid-flow-${flow}`,
    placeItems && `place-items-${placeItems}`,
    placeContent && `place-content-${placeContent}`,
    justifyItems && `justify-items-${justifyItems}`,
    colSpan !== undefined && (colSpan === 'full' ? 'col-span-full' : `col-span-${colSpan}`),
    rowSpan !== undefined && (rowSpan === 'full' ? 'row-span-full' : `row-span-${rowSpan}`),
    className,
  );

  return <Box ref={ref} role={role} className={classes} {...rest} />;
});

Grid.displayName = 'Grid';
