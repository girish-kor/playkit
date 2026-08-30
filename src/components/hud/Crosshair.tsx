import * as React from 'react';

import { useRaycaster } from '../../hooks/useRaycaster';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Icon } from '../primitives/Icon';

/** Center reticle for interaction targeting, with raycaster support (COMPONENTS.md § Component: Crosshair). */
export type CrosshairType = 'dot' | 'cross' | 'circle' | 'custom';

export interface CrosshairTarget {
  entity: unknown;
  distance: number;
}

export interface CrosshairProps {
  type?: CrosshairType;
  render?: (state: { isHovering: boolean; isInteractable: boolean }) => React.ReactNode;
  color?: string;
  size?: number;
  pcEntity?: string;
  className?: string;
  'aria-label'?: string;
  onTargetChange?: (target: CrosshairTarget | null) => void;
  onTargetEnter?: (target: CrosshairTarget) => void;
  onTargetLeave?: () => void;
  onInteract?: (target: CrosshairTarget | null) => void;
  throttleRate?: number;
  raycastMask?: number;
  showInteractionFeedback?: boolean;
  showHitIndicator?: boolean;
  interactionRadius?: number;
  colorHover?: string;
  onHoverStart?: (target: unknown) => void;
  onHoverEnd?: () => void;
}

export function Crosshair({
  type = 'cross',
  render,
  color = 'white',
  size = 24,
  pcEntity,
  className,
  'aria-label': ariaLabel,
  onTargetChange,
  onTargetEnter,
  onTargetLeave,
  onInteract,
  throttleRate = 33,
  raycastMask,
  colorHover,
  onHoverStart,
  onHoverEnd,
}: CrosshairProps): React.JSX.Element {
  const { target: rawTarget } = useRaycaster({
    pcCamera: pcEntity ?? '',
    throttleRate,
    mask: raycastMask,
  });

  const [target, setTarget] = React.useState<CrosshairTarget | null>(null);
  const isHovering = target !== null;
  const isInteractable = isHovering;

  React.useEffect(() => {
    const next: CrosshairTarget | null = rawTarget ? { entity: rawTarget, distance: 0 } : null;
    setTarget((prev) => {
      const wasNull = prev === null;
      const isNull = next === null;
      if (wasNull !== isNull || prev?.entity !== next?.entity) {
        onTargetChange?.(next);
        if (wasNull && !isNull) {
          onTargetEnter?.(next as CrosshairTarget);
          onHoverStart?.(next?.entity);
        }
        if (!wasNull && isNull) {
          onTargetLeave?.();
          onHoverEnd?.();
        }
      }
      return next;
    });
  }, [rawTarget, onTargetChange, onTargetEnter, onTargetLeave, onHoverStart, onHoverEnd]);

  const handleClick = () => onInteract?.(target);

  const resolvedColor = isHovering && colorHover ? colorHover : color;
  const role = ariaLabel ? 'img' : 'none';

  return (
    <Box
      role={role}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
        className,
      )}
      style={{ width: size, height: size, color: resolvedColor }}
      onClick={handleClick}
    >
      {type === 'custom' && render ? (
        render({ isHovering, isInteractable })
      ) : type === 'dot' ? (
        <div className="w-1.5 h-1.5 rounded-full bg-current mx-auto my-auto" />
      ) : type === 'circle' ? (
        <div className="w-full h-full rounded-full border-2 border-current" />
      ) : (
        <Icon name="plus" size={size} color="currentColor" />
      )}
    </Box>
  );
}

Crosshair.displayName = 'Crosshair';
