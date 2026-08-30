import * as React from 'react';
import { useDrag } from '@use-gesture/react';

import { useEditorBridge } from '../../hooks/useEditorBridge';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import { Grid } from '../primitives/Grid';
import { Slider } from '../settings/Slider';

/**
 * Brush-based terrain texture/height editing tool for the in-game `Editor`
 * (COMPONENTS.md § Component: TerrainPainter, DevMode only). Paint interaction is
 * pointer-only by design (docs/ACCESSIBILITY.md), consistent with other
 * direct-manipulation Editor tools; mode/brush controls remain keyboard accessible.
 */
export type TerrainPaintMode = 'height' | 'texture' | 'smooth';
export type TerrainBrushFalloff = 'linear' | 'smooth' | 'constant';

export interface TerrainTexture {
  id: string;
  thumbnail: string;
  name: string;
}

export interface TerrainPainterProps {
  pcEntity?: string;
  pcScene?: unknown;
  mode: TerrainPaintMode;
  brushSize?: number;
  brushStrength?: number;
  brushFalloff?: TerrainBrushFalloff;
  textures?: TerrainTexture[];
  activeTexture?: string;
  className?: string;
  onPaint?: (position: { x: number; y: number; z: number }, strength: number) => void;
  onStrokeStart?: () => void;
  onStrokeEnd?: () => void;
  onModeChange?: (mode: TerrainPaintMode) => void;
  onTextureSelect?: (textureId: string) => void;
  'aria-label'?: string;
  showBrushOutline?: boolean;
}

export function TerrainPainter({
  pcScene,
  mode,
  brushSize = 5,
  brushStrength = 0.5,
  brushFalloff = 'smooth',
  textures = [],
  activeTexture,
  className,
  onPaint,
  onStrokeStart,
  onStrokeEnd,
  onModeChange,
  onTextureSelect,
  'aria-label': ariaLabel = 'Terrain painter',
  showBrushOutline = true,
}: TerrainPainterProps): React.JSX.Element {
  useEditorBridge({ pcScene });
  const [isPainting, setIsPainting] = React.useState(false);
  const [size, setSize] = React.useState(brushSize);
  const [strength, setStrength] = React.useState(brushStrength);
  const surfaceRef = React.useRef<HTMLDivElement>(null);

  const bind = useDrag(({ first, last, xy }) => {
    if (first) {
      setIsPainting(true);
      onStrokeStart?.();
    }
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (rect) {
      const worldPos = { x: xy[0] - rect.left, y: 0, z: xy[1] - rect.top };
      onPaint?.(worldPos, strength);
    }
    if (last) {
      setIsPainting(false);
      onStrokeEnd?.();
    }
  });

  return (
    <div
      role="toolbar"
      aria-label={ariaLabel}
      className={cn('flex gap-2 p-2 bg-gray-800 rounded-lg', className)}
    >
      <Flex gap={1}>
        {(['height', 'texture', 'smooth'] as const).map((m) => (
          <Button
            key={m}
            size="sm"
            variant={mode === m ? 'secondary' : 'ghost'}
            onPress={() => onModeChange?.(m)}
          >
            {m}
          </Button>
        ))}
      </Flex>
      <Slider label="Brush size" value={size} min={1} max={50} onChange={setSize} />
      <Slider
        label="Brush strength"
        value={strength}
        min={0}
        max={1}
        step={0.05}
        onChange={setStrength}
      />
      <span className="text-xs text-gray-400">Falloff: {brushFalloff}</span>
      {mode === 'texture' && (
        <Grid cols={4} gap={1}>
          {textures.map((texture) => (
            <button
              key={texture.id}
              type="button"
              aria-label={texture.name}
              aria-pressed={activeTexture === texture.id}
              onClick={() => onTextureSelect?.(texture.id)}
              className={cn(
                'border-2 rounded',
                activeTexture === texture.id ? 'border-blue-500' : 'border-transparent',
              )}
            >
              <img src={texture.thumbnail} alt="" className="w-8 h-8" />
            </button>
          ))}
        </Grid>
      )}
      <div
        ref={surfaceRef}
        {...bind()}
        role="presentation"
        aria-hidden="true"
        className={cn(
          'relative w-32 h-32 bg-gray-900 touch-none',
          isPainting && 'ring-2 ring-blue-400',
        )}
      >
        {showBrushOutline && (
          <div
            aria-hidden="true"
            className="absolute rounded-full border border-white/40 pointer-events-none"
            style={{ width: size * 2, height: size * 2 }}
          />
        )}
      </div>
    </div>
  );
}

TerrainPainter.displayName = 'TerrainPainter';
