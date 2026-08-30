import * as React from 'react';

import { useErrorReporter } from '../../hooks/useErrorReporter';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';

/**
 * Display error messages with actions like retry or dismiss (COMPONENTS.md §
 * Component: ErrorMsg). The `'modal'` variant renders a self-contained blocking
 * overlay rather than composing the Modal module's `Modal` -- docs/MODULES.md
 * doesn't list an Error→Modal edge among its verified cross-module dependencies
 * (ErrorMsg's own "Composition" field names only Box/Text/Button/Icon), so the
 * blocking-overlay behavior stays in-module.
 */
export type ErrorMsgVariant = 'banner' | 'toast' | 'inline' | 'full-page' | 'modal';

export interface ErrorMsgProps {
  message: string;
  code?: string | number;
  actionLabel?: string;
  pcEntity?: string;
  onDismiss?: (data?: { code?: string | number }) => void;
  onAction?: (data?: { code?: string | number }) => void;
  onReport?: (data?: { code?: string | number; message: string }) => void;
  onRetry?: (data?: { code?: string | number }) => void;
  variant?: ErrorMsgVariant;
  className?: string;
  'aria-label'?: string;
}

export const ErrorMsg = React.forwardRef<HTMLDivElement, ErrorMsgProps>(function ErrorMsg(
  {
    message,
    code,
    actionLabel,
    onDismiss,
    onAction,
    onReport,
    onRetry,
    variant = 'inline',
    className,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const { report } = useErrorReporter();
  const [isDismissed, setIsDismissed] = React.useState(false);
  const descId = React.useId();

  React.useEffect(() => {
    report(code !== undefined ? `${message} (${code})` : message);
  }, [report, message, code]);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.(code !== undefined ? { code } : undefined);
  };
  const handleAction = () => onAction?.(code !== undefined ? { code } : undefined);
  const handleRetry = () => onRetry?.(code !== undefined ? { code } : undefined);
  const handleReport = () => onReport?.({ code, message });

  if (isDismissed) return null;

  const content = (
    <Box
      ref={ref}
      role="alert"
      aria-live="assertive"
      aria-label={ariaLabel}
      aria-describedby={descId}
      className={cn(
        'bg-red-900/20 border border-red-500 p-4 rounded-lg text-red-300 flex items-start gap-2',
        variant === 'banner' && 'rounded-none border-x-0',
        variant === 'full-page' && 'min-h-full items-center justify-center flex-col text-center',
        className,
      )}
    >
      <Icon name="alert-circle" aria-hidden="true" />
      <Box className="flex-1">
        <Text id={descId} as="p" color="text-red-300">
          {message}
          {code !== undefined && (
            <Text as="span" color="text-red-300/70">
              {' '}
              ({code})
            </Text>
          )}
        </Text>
        <Box className="flex gap-2 mt-2">
          {onRetry && (
            <Button variant="secondary" size="sm" onPress={handleRetry}>
              Retry
            </Button>
          )}
          {onAction && actionLabel && (
            <Button variant="primary" size="sm" onPress={handleAction}>
              {actionLabel}
            </Button>
          )}
          {onReport && (
            <Button variant="ghost" size="sm" onPress={handleReport}>
              Report
            </Button>
          )}
          {onDismiss && (
            <Button variant="ghost" size="sm" onPress={handleDismiss} aria-label="Dismiss">
              Dismiss
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );

  if (variant === 'modal') {
    return (
      <Box
        className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4"
        onClick={onDismiss ? handleDismiss : undefined}
      >
        <Box onClick={(e: React.MouseEvent) => e.stopPropagation()} className="max-w-md w-full">
          {content}
        </Box>
      </Box>
    );
  }

  return content;
});

ErrorMsg.displayName = 'ErrorMsg';
