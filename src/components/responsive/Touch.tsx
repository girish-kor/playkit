import * as React from 'react';

import { useIsTouchDevice } from '../../hooks/useIsTouchDevice';
import { useTouchBridge } from '../../hooks/useTouchBridge';
import { cn } from '../../internal/cn';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Joystick } from '../primitives/Joystick';
import type { TouchControl } from '../../types';

/** Mobile touch overlay for game controls (COMPONENTS.md § Component: Touch). */
export type TouchVariant = 'joystick' | 'buttons' | 'mixed';
export type TouchLayout = 'default' | 'left' | 'right';

export interface TouchProps {
  controls: TouchControl[];
  pcEntity?: string;
  variant?: TouchVariant;
  layout?: TouchLayout;
  className?: string;
  children?: React.ReactNode;
  onTouchStart?: (id: string, touch: { x: number; y: number }) => void;
  onTouchEnd?: (id: string, touch: { x: number; y: number }) => void;
  onTouchMove?: (id: string, x: number, y: number) => void;
  onButtonPress?: (id: string, button: TouchControl) => void;
  onButtonRelease?: (id: string, button: TouchControl) => void;
  'aria-label'?: string;
  disabled?: boolean;
}

const LAYOUT_CLASSES: Record<TouchLayout, string> = {
  default: 'justify-between',
  left: 'justify-start',
  right: 'justify-end',
};

export const Touch = React.forwardRef<HTMLDivElement, TouchProps>(function Touch(
  {
    controls,
    variant = 'mixed',
    layout = 'default',
    className,
    children,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onButtonPress,
    onButtonRelease,
    'aria-label': ariaLabel = 'Touch controls',
    disabled = false,
  },
  ref,
) {
  const { isTouch } = useIsTouchDevice();
  const { sendTouchStart, sendTouchMove, sendTouchEnd } = useTouchBridge();

  const onTouchStartRef = useLatest(onTouchStart);
  const onTouchMoveRef = useLatest(onTouchMove);
  const onTouchEndRef = useLatest(onTouchEnd);
  const onButtonPressRef = useLatest(onButtonPress);
  const onButtonReleaseRef = useLatest(onButtonRelease);

  if (!isTouch) return null;

  const visibleControls =
    variant === 'mixed'
      ? controls
      : controls.filter((c) =>
          variant === 'joystick' ? c.type === 'joystick' : c.type === 'button',
        );

  const joystickPosition = (position: TouchControl['position']): React.CSSProperties => {
    if (!position || position === 'relative' || position === 'absolute') return {};
    return { left: position.x, top: position.y, position: 'absolute' };
  };

  return (
    <Box
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 touch-none flex items-end p-4 gap-4',
        LAYOUT_CLASSES[layout],
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
    >
      {visibleControls.map((control) => {
        if (control.type === 'joystick') {
          return (
            <Box key={control.id} style={joystickPosition(control.position)}>
              <Joystick
                size={control.size ?? 96}
                aria-label={control.label ?? 'Joystick'}
                disabled={disabled}
                onDragStart={() => {
                  onTouchStartRef.current?.(control.id, { x: 0, y: 0 });
                  sendTouchStart({ x: 0, y: 0, id: control.id });
                }}
                onDrag={(x, y) => {
                  onTouchMoveRef.current?.(control.id, x, y);
                  sendTouchMove({ x, y, id: control.id });
                }}
                onDragEnd={() => {
                  onTouchEndRef.current?.(control.id, { x: 0, y: 0 });
                  sendTouchEnd({ id: control.id });
                }}
              />
            </Box>
          );
        }
        return (
          <TouchButton
            key={control.id}
            control={control}
            disabled={disabled}
            positionStyle={joystickPosition(control.position)}
            onPress={() => {
              onButtonPressRef.current?.(control.id, control);
              sendTouchStart({ x: 0, y: 0, id: control.id });
            }}
            onRelease={() => {
              onButtonReleaseRef.current?.(control.id, control);
              sendTouchEnd({ id: control.id });
            }}
          />
        );
      })}
      {children}
    </Box>
  );
});

Touch.displayName = 'Touch';

/**
 * A single touch button with real press/release semantics. `Button`'s react-aria
 * `useButton` only exposes activation via `onPress` (fires on release), with no
 * press-start callback -- so this listens to pointer events directly on top of
 * `Button` and drives its `isPressed` prop manually, rather than relying on
 * react-aria's own (activation-only) press tracking.
 */
function TouchButton({
  control,
  disabled,
  positionStyle,
  onPress,
  onRelease,
}: {
  control: TouchControl;
  disabled: boolean;
  positionStyle: React.CSSProperties;
  onPress: () => void;
  onRelease: () => void;
}): React.ReactElement {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsPressed(true);
    onPress();
  };
  const handlePointerUp = () => {
    if (!isPressed) return;
    setIsPressed(false);
    onRelease();
  };

  return (
    <Box style={positionStyle}>
      <Button
        aria-label={control.label ?? control.id}
        disabled={disabled}
        isPressed={isPressed}
        className="w-16 h-16 rounded-full"
        style={control.size ? { width: control.size, height: control.size } : undefined}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {control.label}
      </Button>
    </Box>
  );
}
