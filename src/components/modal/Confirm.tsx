import * as React from 'react';

import { useConfirm } from '../../hooks/useConfirm';
import { Button, type ButtonProps } from '../primitives/Button';
import { Modal } from './Modal';

/** Yes/No confirmation modal with danger/warning variants (COMPONENTS.md § Component: Confirm). */
export type ConfirmVariant = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pcEntity?: string;
  variant?: ConfirmVariant;
  onConfirm: () => void | Promise<void>;
  onConfirmError?: (error: Error) => void;
  onCancel: () => void;
  onConfirmCancel?: () => void;
  isOpen: boolean;
  onClose: () => void;
  onAfterConfirm?: (result: void | Error) => void;
  'aria-label'?: string;
  loading?: boolean;
  onBeforeConfirm?: () => boolean | Promise<boolean>;
  confirmButtonProps?: Partial<ButtonProps>;
}

const VARIANT_BUTTON: Record<ConfirmVariant, ButtonProps['variant']> = {
  danger: 'destructive',
  warning: 'destructive',
  info: 'primary',
  success: 'primary',
};

export function Confirm({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  pcEntity,
  variant = 'danger',
  onConfirm,
  onConfirmError,
  onCancel,
  onConfirmCancel,
  isOpen,
  onClose,
  onAfterConfirm,
  'aria-label': ariaLabel,
  loading: loadingProp,
  onBeforeConfirm,
  confirmButtonProps,
}: ConfirmProps): React.JSX.Element {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const loading = loadingProp ?? isConfirming;
  useConfirm();
  void pcEntity;

  const handleConfirm = async () => {
    if (onBeforeConfirm) {
      const proceed = await onBeforeConfirm();
      if (!proceed) return;
    }
    setIsConfirming(true);
    try {
      await onConfirm();
      onAfterConfirm?.(undefined);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      onConfirmError?.(error);
      onAfterConfirm?.(error);
    } finally {
      setIsConfirming(false);
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel();
    onConfirmCancel?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => handleCancel()}
      title={title}
      description={message}
      aria-label={ariaLabel}
      role="alertdialog"
      variant="center"
    >
      {/* Modal's own `description` prop above already renders `message` (with
          aria-describedby wired to it, per COMPONENTS.md's Accessibility field) --
          rendering it a second time here would duplicate the same text as two
          separate DOM nodes (the same class of bug fixed on Avatar/Health/Minimap). */}
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" onPress={handleCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={VARIANT_BUTTON[variant]}
          onPress={handleConfirm}
          loading={loading}
          {...confirmButtonProps}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

Confirm.displayName = 'Confirm';
