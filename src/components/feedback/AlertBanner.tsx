import * as React from 'react';

import { useNotificationListener } from '../../hooks/useNotificationListener';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';

/**
 * Persistent, non-auto-dismissing message for critical system status, distinct from
 * `Toast`'s auto-dismiss behavior (COMPONENTS.md § Component: AlertBanner).
 */
export type AlertBannerType = 'info' | 'warning' | 'error' | 'success';

export interface AlertBannerProps {
  message: string;
  type?: AlertBannerType;
  pcEntity?: string;
  position?: 'top' | 'bottom';
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
  icon?: React.ReactNode;
  'aria-label'?: string;
  sticky?: boolean;
}

const TYPE_CLASSES: Record<AlertBannerType, string> = {
  info: 'bg-blue-900/90',
  warning: 'bg-yellow-900/90',
  error: 'bg-red-900/90',
  success: 'bg-green-900/90',
};

const TYPE_ICON: Record<AlertBannerType, string> = {
  info: 'info',
  warning: 'alert-triangle',
  error: 'alert-circle',
  success: 'check-circle',
};

export function AlertBanner({
  message,
  type = 'warning',
  pcEntity,
  position = 'top',
  dismissible = false,
  onDismiss,
  action,
  className,
  icon,
  'aria-label': ariaLabel,
  sticky = true,
}: AlertBannerProps): React.JSX.Element | null {
  const [isVisible, setIsVisible] = React.useState(true);
  useNotificationListener();
  void pcEntity;

  if (!isVisible) return null;

  const isUrgent = type === 'error' || type === 'warning';

  return (
    <Box
      role={isUrgent ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-label={ariaLabel}
      className={cn(
        'w-full px-4 py-2 flex items-center justify-between',
        TYPE_CLASSES[type],
        sticky &&
          (position === 'top' ? 'fixed top-0 left-0 right-0' : 'fixed bottom-0 left-0 right-0'),
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon ?? <Icon name={TYPE_ICON[type]} className="text-white" />}
        <Text className="text-white">{message}</Text>
      </div>
      <div className="flex items-center gap-2">
        {action && (
          <Button size="sm" variant="ghost" onPress={action.onClick}>
            {action.label}
          </Button>
        )}
        {dismissible && (
          <Button
            variant="icon-only"
            size="sm"
            aria-label="Dismiss"
            onPress={() => {
              setIsVisible(false);
              onDismiss?.();
            }}
          >
            <Icon name="x" />
          </Button>
        )}
      </div>
      {isUrgent && <span className="sr-only">Urgent</span>}
    </Box>
  );
}

AlertBanner.displayName = 'AlertBanner';
