import * as React from 'react';

import { useInteractionPromptSync } from '../../hooks/useInteractionPromptSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';
import { Progress } from '../feedback/Progress';

/**
 * Contextual UI showing the currently available interaction (COMPONENTS.md §
 * Component: InteractionPrompt).
 */
export interface InteractionPromptTarget {
  entity: unknown;
  label: string;
  keyHint?: string;
  holdDuration?: number;
}

export type InteractionPromptVariant = 'default' | 'compact' | 'radial';

export interface InteractionPromptProps {
  target?: InteractionPromptTarget | null;
  pcEntity?: string;
  keyHint?: string;
  holdDuration?: number;
  holdProgress?: number;
  variant?: InteractionPromptVariant;
  position?: 'center' | 'below-crosshair';
  className?: string;
  onInteract?: () => void;
  onHoldStart?: () => void;
  onHoldCancel?: () => void;
  'aria-label'?: string;
  fadeDuration?: number;
}

export function InteractionPrompt({
  target,
  pcEntity,
  keyHint,
  holdDuration,
  holdProgress = 0,
  variant = 'default',
  position = 'below-crosshair',
  className,
  onInteract,
  onHoldStart,
  onHoldCancel,
  'aria-label': ariaLabel,
  fadeDuration = 150,
}: InteractionPromptProps): React.JSX.Element | null {
  const synced = useInteractionPromptSync({ pcEntity });
  const resolvedTarget =
    target ?? (pcEntity ? (synced.target as InteractionPromptTarget | null) : null);

  const [isHolding, setIsHolding] = React.useState(false);

  if (!resolvedTarget) return null;

  const effectiveKeyHint = keyHint ?? resolvedTarget.keyHint ?? 'E';
  const effectiveHoldDuration = holdDuration ?? resolvedTarget.holdDuration;
  const label = ariaLabel ?? `${resolvedTarget.label}, press ${effectiveKeyHint}`;

  const startHold = () => {
    if (!effectiveHoldDuration) return;
    setIsHolding(true);
    onHoldStart?.();
  };
  const cancelHold = () => {
    if (!isHolding) return;
    setIsHolding(false);
    onHoldCancel?.();
  };
  const activate = () => {
    if (effectiveHoldDuration) {
      if (holdProgress >= 1) onInteract?.();
      return;
    }
    onInteract?.();
  };

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        'absolute left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full flex items-center gap-2',
        position === 'center' ? 'top-1/2 -translate-y-1/2' : 'top-[60%]',
        className,
      )}
      style={{ transitionDuration: `${fadeDuration}ms` }}
      onClick={activate}
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
    >
      <span
        className={cn(
          'w-6 h-6 rounded border bg-gray-800 text-center flex items-center justify-center relative',
          variant === 'radial' && effectiveHoldDuration && 'ring-2 ring-blue-400',
        )}
      >
        {effectiveKeyHint}
      </span>
      {variant !== 'compact' && <Text className="text-white">{resolvedTarget.label}</Text>}
      {effectiveHoldDuration && variant !== 'radial' && (
        <Progress value={holdProgress} max={1} className="w-12" aria-label="Hold progress" />
      )}
    </Box>
  );
}

InteractionPrompt.displayName = 'InteractionPrompt';
