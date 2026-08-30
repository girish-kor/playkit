import * as React from 'react';

import { useViewportSync } from '../../hooks/useViewportSync';
import { cn } from '../../internal/cn';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';

/** Responsive wrapper that adapts to breakpoints and orientation (COMPONENTS.md § Component: Responsive). */
export type ResponsiveVariant = 'mobile' | 'tablet' | 'desktop';
export type ResponsiveBreakpoints = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
};
export interface ResponsiveContext {
  breakpoint: string;
  orientation: 'portrait' | 'landscape';
}

const DEFAULT_BREAKPOINTS: Required<ResponsiveBreakpoints> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export interface ResponsiveProps {
  breakpoints?: ResponsiveBreakpoints;
  pcEntity?: string;
  variant?: ResponsiveVariant;
  className?: string;
  children?: React.ReactNode | ((ctx: ResponsiveContext) => React.ReactNode);
  onMount?: () => void;
  onBreakpointChange?: (breakpoint: string) => void;
  onOrientationChange?: (orientation: 'portrait' | 'landscape') => void;
  'aria-label'?: string;
  onResize?: (size: { width: number; height: number }) => void;
}

function computeBreakpoint(width: number, breakpoints: Required<ResponsiveBreakpoints>): string {
  const order: (keyof ResponsiveBreakpoints)[] = ['2xl', 'xl', 'lg', 'md', 'sm'];
  for (const key of order) {
    if (width >= breakpoints[key]) return key;
  }
  return 'base';
}

export const Responsive = React.forwardRef<HTMLDivElement, ResponsiveProps>(function Responsive(
  {
    breakpoints,
    variant = 'desktop',
    className,
    children,
    onMount,
    onBreakpointChange,
    onOrientationChange,
    'aria-label': ariaLabel = 'Main layout',
    onResize,
  },
  ref,
) {
  const resolvedBreakpoints = { ...DEFAULT_BREAKPOINTS, ...breakpoints };
  const { width, height } = useViewportSync();

  const breakpoint = computeBreakpoint(width, resolvedBreakpoints);
  const orientation: 'portrait' | 'landscape' = height >= width ? 'portrait' : 'landscape';

  const prevBreakpointRef = React.useRef(breakpoint);
  const prevOrientationRef = React.useRef(orientation);
  const prevSizeRef = React.useRef({ width, height });
  const onMountRef = useLatest(onMount);

  React.useEffect(() => {
    onMountRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (prevBreakpointRef.current !== breakpoint) {
      prevBreakpointRef.current = breakpoint;
      onBreakpointChange?.(breakpoint);
    }
  }, [breakpoint, onBreakpointChange]);

  React.useEffect(() => {
    if (prevOrientationRef.current !== orientation) {
      prevOrientationRef.current = orientation;
      onOrientationChange?.(orientation);
    }
  }, [orientation, onOrientationChange]);

  React.useEffect(() => {
    if (prevSizeRef.current.width !== width || prevSizeRef.current.height !== height) {
      prevSizeRef.current = { width, height };
      onResize?.({ width, height });
    }
  }, [width, height, onResize]);

  const content = typeof children === 'function' ? children({ breakpoint, orientation }) : children;

  return (
    <Box
      ref={ref}
      role="region"
      aria-label={ariaLabel}
      data-variant={variant}
      data-breakpoint={breakpoint}
      data-orientation={orientation}
      className={cn(className)}
    >
      {content}
    </Box>
  );
});

Responsive.displayName = 'Responsive';
