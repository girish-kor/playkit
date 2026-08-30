import * as React from 'react';

import { useErrorReporter } from '../../hooks/useErrorReporter';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';

/**
 * React error boundary with recovery and PlayCanvas error reporting
 * (COMPONENTS.md § Component: ErrorBoundary). Error boundaries can only be implemented
 * as class components -- `componentDidCatch`/`getDerivedStateFromError` have no hook
 * equivalent -- so this deliberately deviates from the function-component +
 * `forwardRef` pattern used elsewhere in the library. PlayCanvas error reporting
 * (`useErrorReporter`) is a hook, so it's invoked from a small function-component
 * wrapper (`ErrorReporterBridge`) rendered only once an error has actually occurred.
 * The `'toast'` variant renders a self-contained dismissible banner rather than
 * composing the Feedback module's `Toast` -- docs/MODULES.md's only verified
 * HUD→Feedback edge doesn't cover Error→Feedback, so this stays in-module.
 */
export type ErrorBoundaryVariant = 'full' | 'inline' | 'minimal' | 'toast';

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => React.ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  pcEntity?: string;
  variant?: ErrorBoundaryVariant;
  className?: string;
  children: React.ReactNode;
  onReset?: (data?: { error: Error }) => void;
  onReport?: (error: Error) => void;
  'aria-label'?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

function ErrorReporterBridge({
  error,
  onReport,
}: {
  error: Error;
  onReport?: (error: Error) => void;
}): null {
  const { report } = useErrorReporter();
  const reportedRef = React.useRef<Error | null>(null);
  React.useEffect(() => {
    if (reportedRef.current === error) return;
    reportedRef.current = error;
    report(error);
    onReport?.(error);
  }, [error, report, onReport]);
  return null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    const { error } = this.state;
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onReset?.(error ? { error } : undefined);
  };

  override render(): React.ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const {
      fallback,
      pcEntity: _pcEntity,
      variant = 'full',
      className,
      children,
      onReport,
      'aria-label': ariaLabel,
    } = this.props;

    if (!hasError || !error) return children;

    const content =
      typeof fallback === 'function'
        ? fallback(error, errorInfo ?? ({ componentStack: '' } as React.ErrorInfo))
        : fallback;

    const body = content ?? (
      <Box
        role="alert"
        aria-live="assertive"
        aria-label={ariaLabel}
        className={cn(
          'bg-red-900/20 border-red-500 border p-4 rounded-lg text-red-300',
          variant === 'minimal' && 'p-2 text-sm',
          className,
        )}
      >
        <Text as="p" color="text-red-300" weight="semibold">
          Something went wrong.
        </Text>
        {variant !== 'minimal' && (
          <Text as="p" size="sm" color="text-red-300/80">
            {error.message}
          </Text>
        )}
        <Button variant="secondary" size="sm" onPress={this.handleReset} className="mt-2">
          Try again
        </Button>
      </Box>
    );

    const wrapped =
      variant === 'toast' ? (
        <Box
          role="alert"
          aria-live="assertive"
          aria-label={ariaLabel}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-gray-800 border border-red-500 text-red-300 rounded-lg p-3 shadow-lg max-w-sm"
        >
          <Icon name="alert-circle" aria-hidden="true" />
          <Text as="p" size="sm" className="flex-1">
            {error.message}
          </Text>
          <Button variant="ghost" size="sm" onPress={this.handleReset} aria-label="Dismiss">
            <Icon name="x" aria-hidden="true" />
          </Button>
        </Box>
      ) : (
        body
      );

    return (
      <>
        <ErrorReporterBridge error={error} onReport={onReport} />
        {wrapped}
      </>
    );
  }
}
