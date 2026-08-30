import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { useLatest } from '../internal/useLatest';

/**
 * Hook for PlayCanvas input handling — keyboard, mouse, touch, gamepad
 * (COMPONENTS.md § Hook: useInput). `inputType` determines which of `key`/`button`/
 * `axis`+`gamepadIndex` are relevant; irrelevant fields for a given `inputType` are
 * simply ignored.
 */
export interface UseInputOptions {
  inputType: 'keyboard' | 'mouse' | 'touch' | 'gamepad';
  action?: string;
  /** Analog deadzone (default: `0.1`), applies only to `axis`-based (gamepad) input. */
  deadzone?: number;
  key?: string;
  button?: number;
  axis?: number;
  /** Gamepad index (default: `0`). */
  gamepadIndex?: number;
  onPress?: () => void;
  onRelease?: () => void;
  onMove?: (value: number) => void;
  onChange?: (value: number | null) => void;
}

export interface UseInputResult {
  isPressed: boolean;
  value: number | null;
  isSupported: boolean;
}

const GAMEPAD_POLL_MS = 16;

export function useInput(options: UseInputOptions): UseInputResult {
  const {
    inputType,
    deadzone = 0.1,
    key,
    button,
    axis,
    gamepadIndex = 0,
    onPress,
    onRelease,
    onMove,
    onChange,
  } = options;

  const store = usePCStore();
  const app = useStore(store, (s) => s.app);

  const [isPressed, setIsPressed] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(null);
  const [isSupported, setIsSupported] = React.useState(false);

  const onPressRef = useLatest(onPress);
  const onReleaseRef = useLatest(onRelease);
  const onMoveRef = useLatest(onMove);
  const onChangeRef = useLatest(onChange);

  const applyPressed = React.useCallback(
    (next: boolean) => {
      setIsPressed((prev) => {
        if (prev === next) return prev;
        if (next) onPressRef.current?.();
        else onReleaseRef.current?.();
        return next;
      });
    },
    [onPressRef, onReleaseRef],
  );

  const applyValue = React.useCallback(
    (next: number | null) => {
      setValue((prev) => {
        if (prev === next) return prev;
        onChangeRef.current?.(next);
        if (next != null) onMoveRef.current?.(next);
        return next;
      });
    },
    [onChangeRef, onMoveRef],
  );

  React.useEffect(() => {
    if (inputType === 'keyboard') {
      const keyboard = app?.keyboard;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(Boolean(keyboard) || typeof window !== 'undefined');
      if (!key) return;
      const down = (e: KeyboardEvent | { key?: string }) => {
        if (matchesKey(e, key)) {
          applyPressed(true);
          applyValue(1);
        }
      };
      const up = (e: KeyboardEvent | { key?: string }) => {
        if (matchesKey(e, key)) {
          applyPressed(false);
          applyValue(0);
        }
      };
      if (keyboard?.on) {
        keyboard.on('keydown', down);
        keyboard.on('keyup', up);
        return () => {
          keyboard.off?.('keydown', down);
          keyboard.off?.('keyup', up);
        };
      }
      if (typeof window !== 'undefined') {
        window.addEventListener('keydown', down as EventListener);
        window.addEventListener('keyup', up as EventListener);
        return () => {
          window.removeEventListener('keydown', down as EventListener);
          window.removeEventListener('keyup', up as EventListener);
        };
      }
      return undefined;
    }

    if (inputType === 'mouse') {
      const mouse = app?.mouse;
      setIsSupported(Boolean(mouse) || typeof window !== 'undefined');
      const down = (e: MouseEvent | { button?: number }) => {
        if (button === undefined || e.button === button) {
          applyPressed(true);
          applyValue(1);
        }
      };
      const up = (e: MouseEvent | { button?: number }) => {
        if (button === undefined || e.button === button) {
          applyPressed(false);
          applyValue(0);
        }
      };
      if (mouse?.on) {
        mouse.on('mousedown', down);
        mouse.on('mouseup', up);
        return () => {
          mouse.off?.('mousedown', down);
          mouse.off?.('mouseup', up);
        };
      }
      if (typeof window !== 'undefined') {
        window.addEventListener('mousedown', down as EventListener);
        window.addEventListener('mouseup', up as EventListener);
        return () => {
          window.removeEventListener('mousedown', down as EventListener);
          window.removeEventListener('mouseup', up as EventListener);
        };
      }
      return undefined;
    }

    if (inputType === 'touch') {
      const supported = typeof window !== 'undefined' && 'ontouchstart' in window;
      setIsSupported(Boolean(app?.touch) || supported);
      const start = () => applyPressed(true);
      const end = () => {
        applyPressed(false);
        applyValue(0);
      };
      if (typeof window !== 'undefined') {
        window.addEventListener('touchstart', start);
        window.addEventListener('touchend', end);
        return () => {
          window.removeEventListener('touchstart', start);
          window.removeEventListener('touchend', end);
        };
      }
      return undefined;
    }

    // gamepad
    const nav: any = typeof navigator !== 'undefined' ? navigator : undefined;
    setIsSupported(Boolean(app?.gamepads) || Boolean(nav?.getGamepads));
    if (!nav?.getGamepads) return undefined;

    const id = setInterval(() => {
      const pads = nav.getGamepads?.() ?? [];
      const pad = pads[gamepadIndex];
      if (!pad) return;
      if (axis !== undefined) {
        const raw = pad.axes?.[axis] ?? 0;
        const clamped = Math.abs(raw) < deadzone ? 0 : raw;
        applyValue(clamped);
        applyPressed(clamped !== 0);
      } else if (button !== undefined) {
        const pressed = Boolean(pad.buttons?.[button]?.pressed);
        applyPressed(pressed);
        applyValue(pressed ? 1 : 0);
      }
    }, GAMEPAD_POLL_MS);
    return () => clearInterval(id);
  }, [inputType, key, button, axis, gamepadIndex, deadzone, app, applyPressed, applyValue]);

  return { isPressed, value, isSupported };
}

function matchesKey(e: { key?: string }, key: string): boolean {
  return e.key === key;
}
