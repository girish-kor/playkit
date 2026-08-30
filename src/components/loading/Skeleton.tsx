import * as React from 'react';

import { useSkeleton } from '../../hooks/useSkeleton';
import { cn } from '../../internal/cn';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';

/** Loading placeholder for content with animated pulse (COMPONENTS.md § Component: Skeleton). */
export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animate?: boolean;
  className?: string;
  'aria-label'?: string;
  count?: number;
  gap?: number;
  onLoad?: () => void;
  onError?: () => void;
  children?: React.ReactNode;
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'rounded h-4 w-full',
  rect: 'rounded-md',
  circle: 'rounded-full',
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    variant = 'rect',
    width,
    height,
    animate = true,
    className,
    'aria-label': ariaLabel,
    count = 1,
    gap,
    onLoad,
    onError: _onError,
    children,
  },
  ref,
) {
  const { style } = useSkeleton({ width, height });

  const onLoadRef = useLatest(onLoad);
  React.useEffect(() => {
    onLoadRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (children) {
    return (
      <Box ref={ref} aria-hidden="true" className={className}>
        {children}
      </Box>
    );
  }

  const unitClassName = cn(
    'bg-gray-700',
    animate && 'animate-pulse',
    VARIANT_CLASSES[variant],
    className,
  );
  const safeCount = Math.max(1, count);

  if (safeCount === 1) {
    return (
      <Box
        ref={ref}
        aria-hidden="true"
        aria-label={ariaLabel}
        className={unitClassName}
        style={style}
      />
    );
  }

  return (
    <Box ref={ref} className="flex flex-col" style={gap !== undefined ? { gap } : undefined}>
      {Array.from({ length: safeCount }, (_, i) => (
        <Box
          key={i}
          aria-hidden="true"
          aria-label={ariaLabel}
          className={unitClassName}
          style={style}
        />
      ))}
    </Box>
  );
});

Skeleton.displayName = 'Skeleton';
