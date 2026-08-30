import * as React from 'react';
import { useDrag } from '@use-gesture/react';

import { useTouchBridge } from '../../hooks/useTouchBridge';
import { cn } from '../../internal/cn';

/** Touch joystick for mobile controls (COMPONENTS.md § Component: Joystick). */
export type JoystickVariant = 'default' | 'mini' | 'with-border';
export type JoystickDirection =
  'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';

export interface JoystickProps {
  size?: number;
  deadzone?: number;
  onMove?: (x: number, y: number) => void;
  onStart?: () => void;
  onEnd?: () => void;
  className?: string;
  variant?: JoystickVariant;
  'aria-label'?: string;
  disabled?: boolean;
  invertX?: boolean;
  invertY?: boolean;
  returnToCenter?: boolean;
  touchAction?: 'auto' | 'none' | 'pan-x' | 'pan-y';
  axisLock?: 'x' | 'y' | null;
  sensitivity?: number;
  onDirectionChange?: (direction: JoystickDirection | null) => void;
  onAngleChange?: (angleDegrees: number) => void;
  onMagnitudeChange?: (magnitude: number) => void;
  onDrag?: (x: number, y: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

function directionFromAngle(angleDeg: number): JoystickDirection {
  const sectors: JoystickDirection[] = [
    'right',
    'up-right',
    'up',
    'up-left',
    'left',
    'down-left',
    'down',
    'down-right',
  ];
  const normalized = ((angleDeg % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % 8;
  return sectors[index] as JoystickDirection;
}

export function Joystick({
  size = 120,
  deadzone = 0.1,
  onMove,
  onStart,
  onEnd,
  className,
  variant = 'default',
  'aria-label': ariaLabel = 'Joystick',
  disabled = false,
  invertX = false,
  invertY = false,
  returnToCenter = true,
  touchAction = 'none',
  axisLock = null,
  sensitivity = 1,
  onDirectionChange,
  onAngleChange,
  onMagnitudeChange,
  onDrag,
  onDragStart,
  onDragEnd,
}: JoystickProps): React.JSX.Element {
  const { sendTouchStart, sendTouchMove, sendTouchEnd } = useTouchBridge();
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = React.useState(false);
  const lastDirectionRef = React.useRef<JoystickDirection | null>(null);
  const radius = size / 2;

  const bind = useDrag(
    ({ first, last, movement: [mx, my], xy, active }) => {
      if (disabled) return;

      if (first) {
        setIsActive(true);
        onStart?.();
        onDragStart?.();
        sendTouchStart({ x: xy[0], y: xy[1] });
      }

      const clampedX = Math.max(-radius, Math.min(radius, mx));
      const clampedY = Math.max(-radius, Math.min(radius, my));

      let normX = (axisLock === 'y' ? 0 : clampedX / radius) * sensitivity;
      let normY = (axisLock === 'x' ? 0 : clampedY / radius) * sensitivity;
      if (invertX) normX = -normX;
      if (invertY) normY = -normY;

      const magnitude = Math.min(1, Math.hypot(normX, normY));
      if (magnitude < deadzone) {
        normX = 0;
        normY = 0;
      }

      setPosition({ x: normX * radius, y: normY * radius });

      if (active) {
        onMove?.(normX, normY);
        onDrag?.(normX, normY);
        sendTouchMove({ x: xy[0], y: xy[1] });
        onMagnitudeChange?.(magnitude < deadzone ? 0 : magnitude);

        const direction =
          magnitude < deadzone
            ? null
            : directionFromAngle((Math.atan2(-normY, normX) * 180) / Math.PI);
        if (direction !== lastDirectionRef.current) {
          lastDirectionRef.current = direction;
          onDirectionChange?.(direction);
        }
        if (magnitude >= deadzone) {
          const angle = ((Math.atan2(-normY, normX) * 180) / Math.PI + 360) % 360;
          onAngleChange?.(angle);
        }
      }

      if (last) {
        setIsActive(false);
        onEnd?.();
        onDragEnd?.();
        sendTouchEnd({});
        if (returnToCenter) setPosition({ x: 0, y: 0 });
        if (lastDirectionRef.current !== null) {
          lastDirectionRef.current = null;
          onDirectionChange?.(null);
        }
      }
    },
    { bounds: { left: -radius, right: radius, top: -radius, bottom: radius } },
  );

  const magnitude = Math.hypot(position.x, position.y) / radius;

  return (
    <div
      {...(disabled ? {} : bind())}
      role="slider"
      aria-label={ariaLabel}
      aria-valuenow={magnitude}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-disabled={disabled}
      className={cn(
        'relative rounded-full bg-white/20 flex items-center justify-center',
        variant === 'with-border' && 'border-2 border-white/40',
        disabled && 'opacity-40',
        className,
      )}
      style={{
        width: variant === 'mini' ? size * 0.6 : size,
        height: variant === 'mini' ? size * 0.6 : size,
        touchAction,
      }}
      data-active={isActive || undefined}
    >
      <div
        className="rounded-full bg-white/80 pointer-events-none"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  );
}

Joystick.displayName = 'Joystick';
