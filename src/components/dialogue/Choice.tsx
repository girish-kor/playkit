import * as React from 'react';

import { useDialogueChoice } from '../../hooks/useDialogueChoice';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';

/** Choice button in a dialogue tree, part of `Dialogue` (COMPONENTS.md § Component: Choice). */
export type ChoiceVariant = 'primary' | 'secondary' | 'destructive' | 'neutral';

export interface ChoiceProps {
  choice: string;
  selected?: boolean;
  pcEntity?: string;
  disabled?: boolean;
  className?: string;
  variant?: ChoiceVariant;
  onSelect?: (e?: React.SyntheticEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onHover?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  'aria-label'?: string;
  hotkey?: string;
  autoFocus?: boolean;
}

const VARIANT_CLASSES: Record<ChoiceVariant, string> = {
  primary: 'bg-gray-700 hover:bg-gray-600',
  secondary: 'bg-gray-800 hover:bg-gray-700',
  destructive: 'bg-red-900 hover:bg-red-800',
  neutral: 'bg-transparent hover:bg-gray-800',
};

export function Choice({
  choice,
  selected = false,
  pcEntity,
  disabled = false,
  className,
  variant = 'primary',
  onSelect,
  onClick,
  onKeyDown,
  onHover,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  hotkey,
  autoFocus = false,
}: ChoiceProps): React.JSX.Element {
  const { selectChoice } = useDialogueChoice();

  const activate = (e?: React.SyntheticEvent) => {
    if (disabled) return;
    onSelect?.(e);
    if (pcEntity) selectChoice(pcEntity);
  };

  React.useEffect(() => {
    if (!hotkey || typeof window === 'undefined') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === hotkey) activate();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `activate` intentionally re-bound via closure over latest `disabled`/`onSelect`.
  }, [hotkey, disabled]);

  return (
    <Button
      variant="ghost"
      role="menuitem"
      aria-label={ariaLabel ?? choice}
      // eslint-disable-next-line jsx-a11y/no-autofocus -- documented Choice prop (COMPONENTS.md), caller-opted-in per instance.
      autoFocus={autoFocus}
      disabled={disabled}
      className={cn(
        'px-4 py-2 rounded-md transition-colors text-left',
        VARIANT_CLASSES[variant],
        selected && 'ring-2 ring-blue-500',
        className,
      )}
      onPress={() => activate()}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onHoverStart={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {choice}
    </Button>
  );
}

Choice.displayName = 'Choice';
