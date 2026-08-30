import * as React from 'react';

import { useDevAPI } from '../../hooks/useDevAPI';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';

/**
 * FPS, memory usage, and draw-call overlay for performance debugging
 * (COMPONENTS.md § Component: PerformanceMonitor, DevMode only). Never ship this
 * component in a production build (docs/LOGGING.md) -- enforced via the separate
 * `devtools` build entry (docs/BUILD.md), not by this component itself.
 */
export type PerformanceMetric = 'fps' | 'frameTime' | 'memory' | 'drawCalls' | 'triangles' | 'gpu';
export type PerformanceMonitorVariant = 'compact' | 'graph' | 'detailed';

export interface PerformanceMonitorProps {
  pcApp: unknown;
  metrics?: PerformanceMetric[];
  variant?: PerformanceMonitorVariant;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  updateInterval?: number;
  historyLength?: number;
  className?: string;
  onThresholdExceeded?: (metric: string, value: number) => void;
  thresholds?: Partial<Record<string, number>>;
  'aria-label'?: string;
  draggable?: boolean;
}

const POSITION_CLASSES: Record<NonNullable<PerformanceMonitorProps['position']>, string> = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
};

export function PerformanceMonitor({
  pcApp,
  metrics = ['fps', 'frameTime', 'drawCalls'],
  variant = 'compact',
  position = 'top-right',
  updateInterval = 500,
  historyLength = 60,
  className,
  onThresholdExceeded,
  thresholds = {},
  'aria-label': ariaLabel = 'Performance monitor',
}: PerformanceMonitorProps): React.JSX.Element {
  const { getScene } = useDevAPI({ pcApp });
  void getScene;
  const [values, setValues] = React.useState<Partial<Record<PerformanceMetric, number>>>({});
  const [history, setHistory] = React.useState<Partial<Record<PerformanceMetric, number[]>>>({});

  React.useEffect(() => {
    const app = pcApp as { stats?: Record<string, unknown> } | undefined;
    const id = setInterval(() => {
      const stats = app?.stats as
        | {
            fps?: number;
            frame?: { ms?: number };
            drawCalls?: { total?: number };
            vram?: { tex?: number };
            triangles?: number;
          }
        | undefined;
      const latestValues: Partial<Record<PerformanceMetric, number>> = {
        fps: stats?.fps,
        frameTime: stats?.frame?.ms,
        drawCalls: stats?.drawCalls?.total,
        memory: stats?.vram?.tex,
        triangles: stats?.triangles,
      };
      setValues(latestValues);
      for (const metric of metrics) {
        const value = latestValues[metric];
        const threshold = thresholds[metric];
        if (value !== undefined && threshold !== undefined && value < threshold) {
          onThresholdExceeded?.(metric, value);
        }
      }
      if (variant === 'graph') {
        setHistory((prev) => {
          const nextHistory = { ...prev };
          for (const metric of metrics) {
            const value = latestValues[metric];
            if (value === undefined) continue;
            nextHistory[metric] = [...(prev[metric] ?? []), value].slice(-historyLength);
          }
          return nextHistory;
        });
      }
    }, updateInterval);
    return () => clearInterval(id);
  }, [pcApp, metrics, thresholds, onThresholdExceeded, updateInterval, historyLength]);

  return (
    <Box
      role="status"
      aria-label={ariaLabel}
      className={cn(
        'fixed bg-black/80 text-green-400 font-mono text-xs p-2 rounded',
        POSITION_CLASSES[position],
        className,
      )}
    >
      {metrics.map((metric) => {
        const value = values[metric];
        const threshold = thresholds[metric];
        const exceeded = value !== undefined && threshold !== undefined && value < threshold;
        return (
          <Text key={metric} as="div" className={cn(exceeded && 'text-red-400')}>
            {metric}: {value !== undefined ? Math.round(value) : '–'}
            {variant === 'graph' && history[metric] && (
              <span className="ml-1 text-gray-500">[{history[metric]!.length}]</span>
            )}
          </Text>
        );
      })}
    </Box>
  );
}

PerformanceMonitor.displayName = 'PerformanceMonitor';
