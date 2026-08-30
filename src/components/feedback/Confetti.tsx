import * as React from 'react';
import confetti from 'canvas-confetti';

import { useAction } from '../../hooks/useAction';
import { usePrefersReducedMotion } from '../../internal/usePrefersReducedMotion';

/**
 * Animated particle celebration effect (COMPONENTS.md § Component: Confetti). Purely
 * decorative — never gate gameplay-critical feedback behind this alone
 * (docs/ACCESSIBILITY.md's reduced-motion rule).
 */
export type ConfettiVariant = 'confetti' | 'fireworks' | 'stars';

export interface ConfettiProps {
  active: boolean;
  pcEntity?: string;
  duration?: number;
  particleCount?: number;
  colors?: string[];
  origin?: { x: number; y: number } | 'center' | 'top';
  spread?: number;
  variant?: ConfettiVariant;
  className?: string;
  onComplete?: () => void;
  gravity?: number;
  reducedMotionFallback?: 'static-message' | 'none';
}

function resolveOrigin(origin: ConfettiProps['origin']): { x: number; y: number } {
  if (origin === 'center') return { x: 0.5, y: 0.5 };
  if (origin === 'top' || origin === undefined) return { x: 0.5, y: 0.1 };
  return origin;
}

export function Confetti({
  active,
  pcEntity,
  duration = 3000,
  particleCount = 150,
  colors,
  origin = 'top',
  spread = 70,
  variant = 'confetti',
  className,
  onComplete,
  gravity = 1,
  reducedMotionFallback = 'static-message',
}: ConfettiProps): React.JSX.Element | null {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const wasActiveRef = React.useRef(active);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { execute } = useAction({ pcEntity: pcEntity ?? '', method: 'playCelebration' });

  React.useEffect(() => {
    const risingEdge = !wasActiveRef.current && active;
    wasActiveRef.current = active;
    if (!risingEdge) return;

    setIsPlaying(true);
    if (pcEntity) execute();

    if (!prefersReducedMotion) {
      const finish = confetti.create(undefined, { resize: true, useWorker: true });
      void finish({
        particleCount,
        spread,
        colors,
        origin: resolveOrigin(origin),
        gravity,
        shapes: variant === 'stars' ? ['star'] : undefined,
      });
    }

    const id = setTimeout(() => {
      setIsPlaying(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(id);
  }, [
    active,
    pcEntity,
    execute,
    prefersReducedMotion,
    particleCount,
    spread,
    colors,
    origin,
    gravity,
    variant,
    duration,
    onComplete,
  ]);

  if (!isPlaying) return null;

  if (prefersReducedMotion) {
    if (reducedMotionFallback === 'none') return null;
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9998] flex items-center justify-center"
      >
        <span className="text-white text-lg font-semibold bg-gray-900/80 px-4 py-2 rounded">
          🎉 Success!
        </span>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={className ?? 'fixed inset-0 pointer-events-none z-[9998]'} />
  );
}

Confetti.displayName = 'Confetti';
