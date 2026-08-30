import * as React from 'react';

import { useNotificationListener } from '../../hooks/useNotificationListener';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';

/** Non-modal notification with types and auto-dismiss (COMPONENTS.md § Component: Toast). */
export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastDismissReason = 'timeout' | 'user' | 'action';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  pcEntity?: string;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  onDismiss?: (reason: ToastDismissReason) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  'aria-label'?: string;
  title?: string;
  action?: ToastAction;
  actions?: ToastAction[];
  stack?: 'top' | 'bottom';
  onAction?: (index: number, action: ToastAction) => void;
  onOpen?: (timestamp: number) => void;
  onClose?: (reason: ToastDismissReason) => void;
}

const TYPE_CLASSES: Record<ToastType, string> = {
  info: 'border-blue-500 bg-gray-800',
  success: 'border-green-500 bg-gray-800',
  warning: 'border-yellow-500 bg-gray-800',
  error: 'border-red-500 bg-gray-800',
};

const TYPE_ICON: Record<ToastType, string> = {
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  error: 'alert-circle',
};

export function Toast({
  message,
  type = 'info',
  duration = 3000,
  pcEntity,
  position = 'bottom-right',
  className,
  onDismiss,
  onMouseEnter,
  onMouseLeave,
  'aria-label': ariaLabel,
  title,
  action,
  actions,
  onAction,
  onOpen,
  onClose,
}: ToastProps): React.JSX.Element | null {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);
  const remainingRef = React.useRef(duration);
  const startedAtRef = React.useRef(0);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const { addListener } = useNotificationListener();
  React.useEffect(() => {
    if (!pcEntity) return undefined;
    return addListener(() => {
      /* scene-originated notifications surface through this same component instance */
    });
  }, [pcEntity, addListener]);

  const dismiss = React.useCallback(
    (reason: ToastDismissReason) => {
      setIsVisible(false);
      onDismiss?.(reason);
      onClose?.(reason);
    },
    [onDismiss, onClose],
  );

  React.useEffect(() => {
    onOpen?.(Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once on mount only.
  }, []);

  React.useEffect(() => {
    if (duration <= 0 || isPaused) return undefined;
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => dismiss('timeout'), remainingRef.current);
    return () => {
      clearTimeout(timerRef.current);
      remainingRef.current -= Date.now() - startedAtRef.current;
    };
  }, [duration, isPaused, dismiss]);

  if (!isVisible) return null;

  const effectiveActions = actions ?? (action ? [action] : []);
  const isUrgent = type === 'error' || type === 'warning';

  return (
    <Box
      role={isUrgent ? 'alert' : 'status'}
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
      data-position={position}
      className={cn(
        'p-4 rounded-lg shadow-lg border-l-4 flex items-start gap-3 max-w-sm',
        TYPE_CLASSES[type],
        className,
      )}
      onMouseEnter={(e) => {
        setIsPaused(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsPaused(false);
        onMouseLeave?.(e);
      }}
    >
      <Icon name={TYPE_ICON[type]} className="text-white mt-0.5" />
      <div className="flex-1">
        {title && (
          <Text weight="semibold" className="text-white">
            {title}
          </Text>
        )}
        <Text className="text-white">{message}</Text>
        {effectiveActions.length > 0 && (
          <div className="mt-2 flex gap-2">
            {effectiveActions.map((a, i) => (
              <Button
                key={i}
                size="sm"
                variant="ghost"
                onPress={() => {
                  a.onClick();
                  onAction?.(i, a);
                  dismiss('action');
                }}
              >
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <Button variant="icon-only" size="sm" aria-label="Dismiss" onPress={() => dismiss('user')}>
        <Icon name="x" />
      </Button>
    </Box>
  );
}

Toast.displayName = 'Toast';
