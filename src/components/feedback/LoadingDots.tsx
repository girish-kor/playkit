import * as React from 'react';

import { useLoadingSync } from '../../hooks/useLoadingSync';
import { cn } from '../../internal/cn';

/** Minimal animated-ellipsis loading indicator (COMPONENTS.md § Component: LoadingDots). */
export interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  pcEntity?: string;
  count?: number;
  className?: string;
  speed?: number;
}

const DOT_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
};

export function LoadingDots({
  size = 'md',
  color = 'bg-white',
  label = 'Loading',
  pcEntity,
  count = 3,
  className,
  speed = 1000,
}: LoadingDotsProps): React.JSX.Element {
  useLoadingSync({ pcEntity });

  return (
    <span role="status" aria-label={label} aria-busy="true" className={cn('flex gap-1', className)}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn('rounded-full animate-bounce', DOT_SIZE[size], color)}
          style={{
            animationDelay: `${(i * speed) / (count * 2)}ms`,
            animationDuration: `${speed}ms`,
          }}
        />
      ))}
    </span>
  );
}

LoadingDots.displayName = 'LoadingDots';
