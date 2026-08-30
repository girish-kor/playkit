import * as React from 'react';

import { useViewportSync } from '../../hooks/useViewportSync';
import { cn } from '../../internal/cn';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';

/** Forces (or reacts to) a required device orientation (COMPONENTS.md § Component: OrientationLock). */
export type RequiredOrientation = 'portrait' | 'landscape';

export interface OrientationLockProps {
  required: RequiredOrientation;
  children: React.ReactNode;
  pcEntity?: string;
  fallback?: React.ReactNode;
  attemptLock?: boolean;
  className?: string;
  onOrientationMismatch?: () => void;
  onOrientationMatch?: () => void;
  onLockFailed?: (error: Error) => void;
  'aria-label'?: string;
}

export const OrientationLock = React.forwardRef<HTMLDivElement, OrientationLockProps>(
  function OrientationLock(
    {
      required,
      children,
      fallback,
      attemptLock = false,
      className,
      onOrientationMismatch,
      onOrientationMatch,
      onLockFailed,
      'aria-label': ariaLabel,
    },
    ref,
  ) {
    const { width, height } = useViewportSync();
    const currentOrientation: 'portrait' | 'landscape' = height >= width ? 'portrait' : 'landscape';
    const isMatching = currentOrientation === required;

    const onMismatchRef = useLatest(onOrientationMismatch);
    const onMatchRef = useLatest(onOrientationMatch);
    const onLockFailedRef = useLatest(onLockFailed);
    const prevMatchingRef = React.useRef<boolean | null>(null);

    React.useEffect(() => {
      if (prevMatchingRef.current === isMatching) return;
      prevMatchingRef.current = isMatching;
      if (isMatching) onMatchRef.current?.();
      else onMismatchRef.current?.();
    }, [isMatching, onMatchRef, onMismatchRef]);

    React.useEffect(() => {
      if (!attemptLock || typeof screen === 'undefined' || !('orientation' in screen)) return;
      const orientationApi = (
        screen as unknown as { orientation?: { lock?: (o: string) => Promise<void> } }
      ).orientation;
      orientationApi?.lock?.(required)?.catch((err: unknown) => {
        onLockFailedRef.current?.(err instanceof Error ? err : new Error(String(err)));
      });
    }, [attemptLock, required, onLockFailedRef]);

    if (isMatching) {
      return <>{children}</>;
    }

    return (
      <Box
        ref={ref}
        role="alert"
        aria-live="assertive"
        aria-label={ariaLabel}
        className={cn(
          'fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-4 text-white text-center p-6',
          className,
        )}
      >
        {fallback ?? (
          <>
            <Icon name="rotate-cw" size={48} className="animate-spin-slow" aria-hidden="true" />
            <Text as="p">Please rotate your device to {required} mode to continue.</Text>
          </>
        )}
      </Box>
    );
  },
);

OrientationLock.displayName = 'OrientationLock';
