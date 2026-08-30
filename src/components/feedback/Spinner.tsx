import * as React from 'react';

import { useLoadingProgress } from '../../hooks/useLoadingProgress';
import { useLoadingSync } from '../../hooks/useLoadingSync';
import { cn } from '../../internal/cn';
import { Text } from '../primitives/Text';

/** Loading indicator with optional progress and PlayCanvas sync (COMPONENTS.md § Component: Spinner). */
export type SpinnerVariant = 'circular' | 'dots' | 'pulse';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  label?: string;
  pcEntity?: string;
  showProgress?: boolean;
  variant?: SpinnerVariant;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  progress?: number;
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function Spinner({
  size = 'md',
  color = 'text-blue-500',
  label = 'Loading',
  pcEntity,
  showProgress = false,
  variant = 'circular',
  className,
  onLoad,
  onError,
  onComplete,
  onProgress,
  progress: progressProp,
}: SpinnerProps): React.JSX.Element {
  const synced = useLoadingSync({ pcEntity });
  const { progress: pcProgress, error } = useLoadingProgress({ pcApp: null });
  const progress = progressProp ?? (pcEntity ? synced.progress : pcProgress);

  const prevProgressRef = React.useRef(progress);
  React.useEffect(() => {
    if (prevProgressRef.current === progress) return;
    prevProgressRef.current = progress;
    onProgress?.(progress);
    if (progress >= 1) {
      onLoad?.();
      onComplete?.();
    }
  }, [progress, onProgress, onLoad, onComplete]);

  React.useEffect(() => {
    if (error) onError?.(error);
  }, [error, onError]);

  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : undefined;
  const sizeClass = typeof size === 'number' ? undefined : SIZE_CLASSES[size];

  return (
    <span
      role="status"
      aria-label={label}
      aria-busy="true"
      aria-live="polite"
      className="inline-flex items-center gap-2"
    >
      {variant === 'circular' && (
        <span
          className={cn(
            'animate-spin rounded-full border-2 border-current border-t-transparent',
            color,
            sizeClass,
            className,
          )}
          style={sizeStyle}
          aria-valuenow={showProgress ? Math.round(progress * 100) : undefined}
        />
      )}
      {variant === 'pulse' && (
        <span
          className={cn(
            'animate-pulse rounded-full',
            color.replace('text-', 'bg-'),
            sizeClass,
            className,
          )}
          style={sizeStyle}
        />
      )}
      {variant === 'dots' && (
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'w-1.5 h-1.5 rounded-full animate-bounce',
                color.replace('text-', 'bg-'),
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </span>
      )}
      {showProgress && <Text size="xs">{Math.round(progress * 100)}%</Text>}
    </span>
  );
}

Spinner.displayName = 'Spinner';
