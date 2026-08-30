import * as React from 'react';

import { usePropertyEditor } from '../../hooks/usePropertyEditor';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import type { PropertyDef, VectorValue } from '../../types';

/** Edit PlayCanvas entity properties with appropriate inputs (COMPONENTS.md § Component: Property, DevMode only). */
export type PropertyVariant = 'form' | 'grid' | 'compact';

export interface PropertyProps {
  entity: unknown;
  properties: PropertyDef[];
  pcEntity?: string;
  variant?: PropertyVariant;
  onChange: (key: string, value: unknown, property: PropertyDef) => void;
  onApply: (property?: PropertyDef) => void;
  onRevert: (property?: PropertyDef) => void;
  className?: string;
  onReset?: (property?: PropertyDef) => void;
  'aria-label'?: string;
  showReset?: boolean;
}

function vectorComponents(value: unknown): Array<keyof VectorValue> {
  const v = value as Partial<VectorValue> | undefined;
  return (['x', 'y', 'z', 'w'] as const).filter((k) => v?.[k] !== undefined);
}

export function Property({
  entity,
  properties,
  pcEntity,
  variant = 'form',
  onChange,
  onApply,
  onRevert,
  className,
  onReset,
  'aria-label': ariaLabel = 'Property editor',
  showReset = true,
}: PropertyProps): React.JSX.Element {
  void pcEntity;
  const { get, set } = usePropertyEditor({ entity });
  const [isDirty, setIsDirty] = React.useState(false);
  const initialValues = React.useRef(new Map(properties.map((p) => [p.key, get(p.key)])));

  const handleChange = (property: PropertyDef, value: unknown) => {
    set(property.key, value);
    setIsDirty(true);
    onChange(property.key, value, property);
  };

  const apply = (property?: PropertyDef) => {
    setIsDirty(false);
    onApply(property);
  };

  const revert = (property?: PropertyDef) => {
    if (property) {
      set(property.key, initialValues.current.get(property.key));
    } else {
      for (const [key, value] of initialValues.current) set(key, value);
    }
    setIsDirty(false);
    onRevert(property);
  };

  const reset = (property?: PropertyDef) => {
    onReset?.(property);
  };

  return (
    <Box
      role="form"
      aria-label={ariaLabel}
      className={cn(
        'grid grid-cols-2 gap-2 p-2',
        variant === 'compact' && 'gap-1 text-sm',
        className,
      )}
    >
      {properties.map((property) => {
        const value = get(property.key);
        return (
          <div key={property.key} className="flex flex-col gap-1">
            <label className="text-xs text-gray-400" htmlFor={`prop-${property.key}`}>
              {property.label}
            </label>
            {property.type === 'boolean' && (
              <input
                id={`prop-${property.key}`}
                type="checkbox"
                aria-label={property.label}
                checked={Boolean(value)}
                onChange={(e) => handleChange(property, e.target.checked)}
              />
            )}
            {property.type === 'number' && (
              <Input
                id={`prop-${property.key}`}
                type="number"
                aria-label={property.label}
                value={Number(value ?? 0)}
                min={property.min}
                max={property.max}
                step={property.step}
                onChange={(e) => handleChange(property, Number(e.target.value))}
              />
            )}
            {property.type === 'string' && (
              <Input
                id={`prop-${property.key}`}
                aria-label={property.label}
                value={String(value ?? '')}
                onChange={(e) => handleChange(property, e.target.value)}
              />
            )}
            {property.type === 'color' && (
              <input
                id={`prop-${property.key}`}
                type="color"
                aria-label={property.label}
                value={String(value ?? '#ffffff')}
                onChange={(e) => handleChange(property, e.target.value)}
              />
            )}
            {property.type === 'vector' && (
              <div className="flex gap-1">
                {vectorComponents(value).map((component) => (
                  <Input
                    key={component}
                    type="number"
                    aria-label={`${property.label} ${component}`}
                    value={Number((value as VectorValue)[component] ?? 0)}
                    className="w-16"
                    onChange={(e) =>
                      handleChange(property, {
                        ...(value as VectorValue),
                        [component]: Number(e.target.value),
                      })
                    }
                  />
                ))}
              </div>
            )}
            {showReset && (
              <Button size="sm" variant="ghost" onPress={() => reset(property)}>
                Reset
              </Button>
            )}
          </div>
        );
      })}
      <div className="col-span-2 flex gap-2 mt-2">
        <Button size="sm" onPress={() => apply()} disabled={!isDirty}>
          Apply All
        </Button>
        <Button size="sm" variant="ghost" onPress={() => revert()}>
          Revert
        </Button>
      </div>
    </Box>
  );
}

Property.displayName = 'Property';
