import * as React from 'react';

import { useTransition } from '../../hooks/useTransition';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

/** Navigate back to previous scene/state with loading indicator (COMPONENTS.md § Component: Back). */
export type BackVariant = 'icon-only' | 'with-label' | 'text-only';

export interface BackProps {
  label?: string;
  icon?: string;
  pcTarget?: string;
  className?: string;
  onBack?: (data: { fromPath?: string; toPath?: string; viaHistory: boolean }) => void;
  variant?: BackVariant;
  onBeforeBack?: () => void | boolean;
  onConfirmBack?: () => void;
  onCancelBack?: () => void;
  'aria-label'?: string;
  loading?: boolean;
  confirmBeforeBack?: boolean;
}

export function Back({
  label,
  icon = 'arrow-left',
  pcTarget,
  className,
  onBack,
  variant = 'icon-only',
  onBeforeBack,
  onConfirmBack,
  onCancelBack,
  'aria-label': ariaLabel,
  loading: loadingProp,
  confirmBeforeBack = false,
}: BackProps): React.JSX.Element {
  const { start, isLoading } = useTransition({ target: pcTarget ?? '' });
  const [pendingConfirm, setPendingConfirm] = React.useState(false);

  const performBack = () => {
    const viaHistory = typeof window !== 'undefined' && window.history.length > 1;
    if (viaHistory) {
      window.history.back();
    } else if (pcTarget) {
      void start();
    }
    onBack?.({ toPath: pcTarget, viaHistory });
  };

  const handlePress = () => {
    if (onBeforeBack?.() === false) return;
    if (confirmBeforeBack) {
      setPendingConfirm(true);
      return;
    }
    performBack();
  };

  const confirm = () => {
    setPendingConfirm(false);
    onConfirmBack?.();
    performBack();
  };
  const cancel = () => {
    setPendingConfirm(false);
    onCancelBack?.();
  };

  const isIconOnly = variant === 'icon-only';
  const text = label ?? ariaLabel ?? 'Go back';

  return (
    <span className="absolute top-4 left-4 z-50">
      <Button
        variant={isIconOnly ? 'icon-only' : 'ghost'}
        aria-label={isIconOnly ? (ariaLabel ?? 'Go back') : undefined}
        loading={loadingProp ?? isLoading}
        className={className}
        onPress={handlePress}
      >
        {variant !== 'text-only' && <Icon name={icon} />}
        {variant !== 'icon-only' && text}
      </Button>
      {pendingConfirm && (
        <span role="alertdialog" aria-label="Confirm navigation" className="ml-2">
          <Button size="sm" onPress={confirm}>
            Confirm
          </Button>
          <Button size="sm" variant="ghost" onPress={cancel}>
            Cancel
          </Button>
        </span>
      )}
    </span>
  );
}

Back.displayName = 'Back';
