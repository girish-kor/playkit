import * as React from 'react';

import { useMinimapSync } from '../../hooks/useMinimapSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';

/**
 * 2D overhead view of the player's surroundings, distinct from `Compass`
 * (COMPONENTS.md § Component: Minimap).
 */
export type MinimapVariant = 'corner' | 'fullscreen' | 'minimal';

export interface MinimapMarker {
  id: string;
  label?: string;
  position: { x: number; y: number; z: number };
  icon?: React.ReactNode;
  color?: string;
}

export interface MinimapProps {
  pcEntity?: string;
  pcCamera?: string;
  markers?: MinimapMarker[];
  zoom?: number;
  rotateWithPlayer?: boolean;
  shape?: 'square' | 'circle';
  size?: number;
  variant?: MinimapVariant;
  className?: string;
  onMarkerClick?: (id: string) => void;
  onMarkerHover?: (id: string | null) => void;
  onZoomChange?: (zoom: number) => void;
  onToggleFullscreen?: () => void;
  'aria-label'?: string;
  showPlayerHeading?: boolean;
  fogOfWar?: boolean;
}

export function Minimap({
  pcEntity,
  pcCamera,
  markers = [],
  zoom: zoomProp = 1,
  shape = 'circle',
  size = 160,
  variant = 'corner',
  className,
  onMarkerClick,
  onMarkerHover,
  onZoomChange,
  onToggleFullscreen,
  'aria-label': ariaLabel = 'Minimap',
  showPlayerHeading = true,
}: MinimapProps): React.JSX.Element {
  const { textureUrl, projectMarker } = useMinimapSync({ pcCamera, pcEntity });
  const [zoom, setZoom] = React.useState(zoomProp);
  const [isFullscreen, setIsFullscreen] = React.useState(variant === 'fullscreen');

  React.useEffect(() => setZoom(zoomProp), [zoomProp]);

  const changeZoom = (next: number) => {
    setZoom(next);
    onZoomChange?.(next);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    onToggleFullscreen?.();
  };

  const displaySize = isFullscreen
    ? Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.8 : 480, 480)
    : size;

  return (
    <Box
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'relative overflow-hidden bg-black/60 border-2 border-gray-700',
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      style={{
        width: displaySize,
        height: displaySize,
        backgroundImage: textureUrl ? `url(${textureUrl})` : undefined,
        backgroundSize: `${100 * zoom}%`,
      }}
    >
      {variant !== 'minimal' &&
        markers.map((marker) => {
          const screenPos = projectMarker(marker.position);
          return (
            <button
              key={marker.id}
              type="button"
              aria-label={marker.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + screenPos.x * zoom}%`,
                top: `${50 + screenPos.y * zoom}%`,
                color: marker.color,
              }}
              onClick={() => onMarkerClick?.(marker.id)}
              onMouseEnter={() => onMarkerHover?.(marker.id)}
              onMouseLeave={() => onMarkerHover?.(null)}
            >
              {marker.icon ?? '•'}
            </button>
          );
        })}
      {showPlayerHeading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400" />
      )}
      {variant === 'corner' && (
        <Button
          variant="icon-only"
          size="sm"
          aria-label="Expand minimap"
          className="absolute bottom-1 right-1"
          onPress={toggleFullscreen}
        >
          ⤢
        </Button>
      )}
      {/* sr-only means "visible to screen readers, hidden visually" -- pairing it with
          aria-hidden="true" would remove this whole control from the accessibility
          tree too, leaving an invisible, keyboard-and-screen-reader-unreachable
          button that only a sighted mouse user could ever trigger (and even then
          couldn't see). Drop aria-hidden so these stay reachable. */}
      <div className="sr-only">
        <button type="button" onClick={() => changeZoom(zoom * 1.1)}>
          Zoom in
        </button>
        <button type="button" onClick={() => changeZoom(zoom / 1.1)}>
          Zoom out
        </button>
      </div>
    </Box>
  );
}

Minimap.displayName = 'Minimap';
