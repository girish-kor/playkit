import * as React from 'react';

import { usePropertyEditor } from '../../hooks/usePropertyEditor';
import { cn } from '../../internal/cn';
import { Label } from '../primitives/Label';
import { ColorPicker } from '../settings/ColorPicker';
import { Slider } from '../settings/Slider';
import { Toggle } from '../settings/Toggle';

/**
 * Adjust ambient and directional light properties within the in-game `Editor`
 * (COMPONENTS.md § Component: LightingControls, DevMode only). Reuses
 * `usePropertyEditor` unmodified -- the same hook `Property` uses -- effectively a
 * `Property`-style form specialized for light components.
 */
export type LightType = 'directional' | 'point' | 'spot' | 'ambient';

export interface LightingControlsProps {
  pcEntity?: string;
  lightEntity?: unknown;
  lightType: LightType;
  color: string;
  intensity: number;
  direction?: { x: number; y: number; z: number };
  range?: number;
  castShadows?: boolean;
  shadowResolution?: 512 | 1024 | 2048 | 4096;
  className?: string;
  onChange?: (property: string, value: unknown) => void;
  onColorChange?: (color: string) => void;
  onIntensityChange?: (intensity: number) => void;
  onDirectionChange?: (direction: { x: number; y: number; z: number }) => void;
  onShadowToggle?: (enabled: boolean) => void;
  'aria-label'?: string;
}

export function LightingControls({
  lightEntity,
  lightType,
  color,
  intensity,
  direction,
  range,
  castShadows = false,
  shadowResolution = 1024,
  className,
  onChange,
  onColorChange,
  onIntensityChange,
  onDirectionChange,
  onShadowToggle,
  'aria-label': ariaLabel = 'Lighting controls',
}: LightingControlsProps): React.JSX.Element {
  const { set } = usePropertyEditor({ entity: lightEntity });

  const change = (property: string, value: unknown) => {
    set(property, value);
    onChange?.(property, value);
  };

  return (
    <div role="form" aria-label={ariaLabel} className={cn('grid grid-cols-2 gap-2 p-2', className)}>
      <div className="flex flex-col gap-1">
        <Label>Color</Label>
        <ColorPicker
          value={color}
          onChange={(next) => {
            change('color', next);
            onColorChange?.(next);
          }}
        />
      </div>
      <Slider
        label="Intensity"
        value={intensity}
        min={0}
        max={10}
        step={0.1}
        onChange={(next) => {
          change('intensity', next);
          onIntensityChange?.(next);
        }}
      />
      {(lightType === 'directional' || lightType === 'spot') && direction && (
        <div className="col-span-2 flex gap-2">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <Slider
              key={axis}
              label={axis.toUpperCase()}
              value={direction[axis]}
              min={-1}
              max={1}
              step={0.01}
              onChange={(next) => {
                const nextDirection = { ...direction, [axis]: next };
                change('direction', nextDirection);
                onDirectionChange?.(nextDirection);
              }}
            />
          ))}
        </div>
      )}
      {(lightType === 'point' || lightType === 'spot') && range !== undefined && (
        <Slider
          label="Range"
          value={range}
          min={0}
          max={100}
          onChange={(next) => change('range', next)}
        />
      )}
      <Toggle
        label="Cast Shadows"
        value={castShadows}
        onChange={(next) => {
          change('castShadows', next);
          onShadowToggle?.(next);
        }}
      />
      {castShadows && (
        <div className="flex flex-col gap-1">
          <Label>Shadow Resolution</Label>
          <select
            aria-label="Shadow resolution"
            value={shadowResolution}
            onChange={(e) => change('shadowResolution', Number(e.target.value))}
            className="bg-gray-800 text-white rounded px-2 py-1"
          >
            {[512, 1024, 2048, 4096].map((res) => (
              <option key={res} value={res}>
                {res}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

LightingControls.displayName = 'LightingControls';
