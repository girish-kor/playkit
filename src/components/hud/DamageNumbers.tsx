import * as React from 'react';

import { useCameraProjection } from '../../hooks/useCameraProjection';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';
import type { DamageNumberEvent } from '../../types';

/**
 * Floating combat-feedback text (COMPONENTS.md § Component: DamageNumbers). Purely
 * visual -- `aria-hidden`, since `Health`'s own `aria-live` region already announces
 * the underlying value change (docs/ACCESSIBILITY.md).
 */
export interface DamageNumbersProps {
  pcEntity?: string;
  events?: DamageNumberEvent[];
  duration?: number;
  direction?: 'up' | 'random-arc';
  stacking?: 'stack' | 'combine';
  combineWindow?: number;
  colorMap?: Partial<Record<DamageNumberEvent['type'], string>>;
  criticalScale?: number;
  className?: string;
  onEventComplete?: (id: string) => void;
  maxConcurrent?: number;
  'aria-label'?: string;
}

const DEFAULT_COLORS: Record<DamageNumberEvent['type'], string> = {
  damage: 'text-red-400',
  heal: 'text-green-400',
  critical: 'text-yellow-300',
  miss: 'text-gray-400',
};

interface ActiveNumber extends DamageNumberEvent {
  screen: { x: number; y: number };
  drift: number;
  startedAt: number;
}

export function DamageNumbers({
  pcEntity,
  events = [],
  duration = 800,
  direction = 'up',
  stacking = 'stack',
  combineWindow = 250,
  colorMap,
  criticalScale = 1.5,
  className,
  onEventComplete,
  maxConcurrent = 50,
}: DamageNumbersProps): React.JSX.Element {
  const { project } = useCameraProjection({ pcCamera: '' });
  const [active, setActive] = React.useState<ActiveNumber[]>([]);
  const seenIds = React.useRef(new Set<string>());
  const lastCombinedAt = React.useRef<Map<string, number>>(new Map());

  React.useEffect(() => {
    const now = Date.now();
    const additions: ActiveNumber[] = [];

    for (const event of events) {
      if (seenIds.current.has(event.id)) continue;
      seenIds.current.add(event.id);

      const worldPos = event.position;
      const screen = worldPos ? project(worldPos) : { x: 0, y: 0 };

      if (stacking === 'combine') {
        const combineKey = `${pcEntity ?? 'default'}:${event.type}`;
        const lastAt = lastCombinedAt.current.get(combineKey) ?? 0;
        if (now - lastAt < combineWindow) {
          setActive((prev) =>
            prev.map((n) =>
              n.type === event.type && now - n.startedAt < combineWindow
                ? { ...n, amount: n.amount + event.amount }
                : n,
            ),
          );
          lastCombinedAt.current.set(combineKey, now);
          continue;
        }
        lastCombinedAt.current.set(combineKey, now);
      }

      additions.push({
        ...event,
        screen,
        drift: direction === 'random-arc' ? (Math.random() - 0.5) * 60 : 0,
        startedAt: now,
      });
    }

    if (additions.length > 0) {
      setActive((prev) => {
        const next = [...prev, ...additions];
        return next.length > maxConcurrent ? next.slice(next.length - maxConcurrent) : next;
      });
    }
  }, [events, project, direction, stacking, combineWindow, maxConcurrent, pcEntity]);

  React.useEffect(() => {
    if (active.length === 0) return;
    const timers = active.map((n) =>
      setTimeout(() => {
        setActive((prev) => prev.filter((x) => x.id !== n.id));
        onEventComplete?.(n.id);
      }, duration),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-arm timers for newly added numbers.
  }, [active.length]);

  return (
    <Box aria-hidden="true" className={cn('absolute inset-0 pointer-events-none', className)}>
      {active.map((n) => (
        <Text
          key={n.id}
          weight="bold"
          className={cn(
            'absolute select-none animate-[rise_var(--pk-dn-duration)_ease-out_forwards]',
            colorMap?.[n.type] ?? DEFAULT_COLORS[n.type],
          )}
          style={{
            left: `calc(50% + ${n.screen.x + n.drift}px)`,
            top: `calc(50% + ${n.screen.y}px)`,
            fontSize: n.type === 'critical' ? `${criticalScale}rem` : undefined,
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            ['--pk-dn-duration' as string]: `${duration}ms`,
          }}
        >
          {n.type === 'miss' ? 'Miss' : n.amount}
        </Text>
      ))}
    </Box>
  );
}

DamageNumbers.displayName = 'DamageNumbers';
