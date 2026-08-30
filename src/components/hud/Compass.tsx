import * as React from 'react';

import { usePlayerRotation } from '../../hooks/usePlayerRotation';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';

/** Direction indicator with objective markers and player heading (COMPONENTS.md § Component: Compass). */
export type CompassVariant = 'circular' | 'horizontal' | 'minimal';

export interface CompassMarker {
  id: string;
  label: string;
  position: { x: number; y: number; z: number };
}

export interface CompassProps {
  pcEntity?: string;
  markers?: CompassMarker[];
  headingOffset?: number;
  className?: string;
  variant?: CompassVariant;
  onMarkerSelect?: (id: string) => void;
  onMarkerClick?: (id: string) => void;
  onMarkerHover?: (id: string) => void;
  onMarkerLeave?: (id: string) => void;
  onHeadingChange?: (heading: number) => void;
  onNorthClick?: () => void;
  onHeadingLock?: (locked: boolean) => void;
  'aria-label'?: string;
  showLabels?: boolean;
  showDistance?: boolean;
  onHeadingStart?: () => void;
  onHeadingEnd?: () => void;
  showNorthIndicator?: boolean;
  customNorthIcon?: React.ReactNode;
}

function markerBearing(heading: number, markerAngle: number): number {
  return ((markerAngle - heading + 540) % 360) - 180;
}

export function Compass({
  pcEntity,
  markers = [],
  headingOffset = 0,
  className,
  variant = 'horizontal',
  onMarkerSelect,
  onMarkerClick,
  onMarkerHover,
  onMarkerLeave,
  onHeadingChange,
  onNorthClick,
  onHeadingLock,
  'aria-label': ariaLabel = 'Compass',
  showLabels = true,
  showNorthIndicator = true,
  customNorthIcon,
}: CompassProps): React.JSX.Element {
  const { heading: rawHeading } = usePlayerRotation({ pcEntity });
  const heading = (rawHeading + headingOffset + 360) % 360;
  const [locked, setLocked] = React.useState(false);

  const prevHeadingRef = React.useRef(heading);
  React.useEffect(() => {
    if (prevHeadingRef.current !== heading) {
      prevHeadingRef.current = heading;
      onHeadingChange?.(heading);
    }
  }, [heading, onHeadingChange]);

  const markerAngles = React.useMemo(
    () =>
      markers.map((marker) => ({
        marker,
        angle: (Math.atan2(marker.position.x, marker.position.z) * 180) / Math.PI,
      })),
    [markers],
  );

  const select = (id: string) => {
    onMarkerSelect?.(id);
    onMarkerClick?.(id);
  };

  return (
    <Box
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'relative',
        variant === 'circular'
          ? 'rounded-full border-2 shadow-lg w-32 h-32'
          : 'w-64 h-10 overflow-hidden',
        className,
      )}
    >
      {variant !== 'minimal' && (
        <div
          className="relative w-full h-full"
          style={variant === 'circular' ? { transform: `rotate(${-heading}deg)` } : undefined}
        >
          {showNorthIndicator && (
            <button
              type="button"
              aria-label="North"
              onClick={onNorthClick}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-white"
              style={variant === 'horizontal' ? { left: `${50 - heading / 3.6}%` } : undefined}
            >
              {customNorthIcon ?? 'N'}
            </button>
          )}
          {markerAngles.map(({ marker, angle }) => {
            const bearing = markerBearing(heading, angle);
            if (variant === 'horizontal' && Math.abs(bearing) > 90) return null;
            return (
              <button
                key={marker.id}
                type="button"
                aria-label={marker.label}
                onClick={() => select(marker.id)}
                onFocus={() => onMarkerHover?.(marker.id)}
                onBlur={() => onMarkerLeave?.(marker.id)}
                onMouseEnter={() => onMarkerHover?.(marker.id)}
                onMouseLeave={() => onMarkerLeave?.(marker.id)}
                className="absolute top-1/2 -translate-y-1/2 text-white"
                style={
                  variant === 'horizontal'
                    ? { left: `${50 + bearing / 1.8}%` }
                    : {
                        left: `${50 + 40 * Math.sin((bearing * Math.PI) / 180)}%`,
                        top: `${50 - 40 * Math.cos((bearing * Math.PI) / 180)}%`,
                      }
                }
              >
                {showLabels ? marker.label : '•'}
              </button>
            );
          })}
        </div>
      )}
      {variant === 'minimal' && (
        <Text className="text-white" size="sm">
          {Math.round(heading)}°
        </Text>
      )}
      <button
        type="button"
        aria-pressed={locked}
        aria-label={locked ? 'Unlock heading' : 'Lock heading'}
        className="sr-only"
        onClick={() => {
          const next = !locked;
          setLocked(next);
          onHeadingLock?.(next);
        }}
      >
        Lock
      </button>
    </Box>
  );
}

Compass.displayName = 'Compass';
