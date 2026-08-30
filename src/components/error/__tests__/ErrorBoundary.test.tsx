import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test crash');
  }
  return <div>Normal state</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Normal state')).toBeInTheDocument();
  });

  it('catches error and renders default error fallback when error occurs', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onError = vi.fn();
    const onReport = vi.fn();

    render(
      <ErrorBoundary onError={onError} onReport={onReport} aria-label="Error container">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert', { name: 'Error container' })).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Test crash')).toBeInTheDocument();
    expect(onError).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('allows resetting error state via Try again button', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    const onReset = vi.fn();

    function TestWrapper() {
      const [throwErr, setThrowErr] = React.useState(true);
      return (
        <ErrorBoundary
          onReset={(data) => {
            setThrowErr(false);
            onReset(data);
          }}
        >
          <ThrowError shouldThrow={throwErr} />
        </ErrorBoundary>
      );
    }

    render(<TestWrapper />);

    expect(screen.getByRole('alert')).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: 'Try again' });
    await user.click(retryBtn);

    expect(onReset).toHaveBeenCalled();
    expect(screen.getByText('Normal state')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
