import * as React from 'react';

import { useKeybindSync } from '../../hooks/useKeybindSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';
import type { KeyBinding } from '../../types';

/** Customizable keyboard controls with conflict detection (COMPONENTS.md § Component: Keybinds). */
export type KeybindsVariant = 'list' | 'grid' | 'compact' | 'table';

export interface KeybindsProps {
  bindings: KeyBinding[];
  defaultBindings?: KeyBinding[];
  pcEntity?: string;
  variant?: KeybindsVariant;
  onChange: (bindings: KeyBinding[]) => void;
  onBindingChange?: (binding: KeyBinding) => void;
  onReset: () => void;
  className?: string;
  onStartListening?: () => void;
  onStopListening?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onConflict?: (
    action: string,
    key: string,
    existingAction: string,
    resolve: (choice: 'keep' | 'overwrite') => void,
  ) => void;
  'aria-label'?: string;
  allowModifiers?: boolean;
  showConflicts?: boolean;
}

function bindingLabel(binding: KeyBinding): string {
  const mods = binding.modifiers?.map((m) => m.charAt(0).toUpperCase() + m.slice(1)) ?? [];
  return [...mods, binding.key.toUpperCase()].join('+');
}

export function Keybinds({
  bindings: bindingsProp,
  defaultBindings,
  pcEntity,
  variant = 'list',
  onChange,
  onBindingChange,
  onReset,
  className,
  onStartListening,
  onStopListening,
  onKeyDown,
  onKeyUp,
  onConflict,
  'aria-label': ariaLabel,
  allowModifiers = true,
  showConflicts = true,
}: KeybindsProps): React.JSX.Element {
  const synced = useKeybindSync({ pcEntity });
  const bindings = pcEntity ? synced.bindings : bindingsProp;
  const [listeningFor, setListeningFor] = React.useState<string | null>(null);

  // useKeyboardListener (docs/API.md) triggers on one known key; recording a NEW
  // binding needs to capture whatever key comes next, which that single-key-trigger
  // shape doesn't fit -- listens directly here instead, same underlying mechanism.
  React.useEffect(() => {
    if (!listeningFor || typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      onKeyDown?.(e);
      e.preventDefault();
      const modifiers = allowModifiers
        ? (['ctrl', 'shift', 'alt', 'meta'] as const).filter(
            (m) =>
              e[
                `${m === 'ctrl' ? 'ctrlKey' : m === 'shift' ? 'shiftKey' : m === 'alt' ? 'altKey' : 'metaKey'}`
              ],
          )
        : undefined;

      const existing = bindings.find((b) => b.key === e.key && b.action !== listeningFor);
      const applyBinding = () => {
        const next = bindings.map((b) =>
          b.action === listeningFor ? { ...b, key: e.key, modifiers } : b,
        );
        onChange(next);
        onBindingChange?.({ action: listeningFor, key: e.key, modifiers });
      };

      if (existing && showConflicts && onConflict) {
        onConflict(listeningFor, e.key, existing.action, (choice) => {
          if (choice === 'overwrite') applyBinding();
        });
      } else {
        applyBinding();
      }

      setListeningFor(null);
      onStopListening?.();
    };

    const handleKeyUp = (e: KeyboardEvent) => onKeyUp?.(e);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    listeningFor,
    bindings,
    allowModifiers,
    showConflicts,
    onChange,
    onBindingChange,
    onConflict,
    onKeyDown,
    onKeyUp,
    onStopListening,
  ]);

  const startListening = (action: string) => {
    setListeningFor(action);
    onStartListening?.();
  };

  const reset = () => {
    if (defaultBindings) onChange(defaultBindings);
    onReset();
  };

  const isTable = variant === 'table';

  return (
    <Box
      role="group"
      aria-label={ariaLabel ?? `Keybindings, ${bindings.length} bindings`}
      className={cn(
        variant === 'grid' || isTable ? 'grid grid-cols-2 gap-2 p-2' : 'flex flex-col gap-2 p-2',
        className,
      )}
    >
      {bindings.map((binding) => (
        <div
          key={binding.action}
          className="flex items-center justify-between gap-2"
          aria-label={binding.label ?? binding.action}
        >
          <Text className="text-white">{binding.label ?? binding.action}</Text>
          <Button
            size="sm"
            variant={listeningFor === binding.action ? 'secondary' : 'outline'}
            onPress={() => startListening(binding.action)}
          >
            {listeningFor === binding.action ? 'Press a key…' : bindingLabel(binding)}
          </Button>
        </div>
      ))}
      <Button size="sm" variant="ghost" onPress={reset}>
        Reset to defaults
      </Button>
    </Box>
  );
}

Keybinds.displayName = 'Keybinds';
