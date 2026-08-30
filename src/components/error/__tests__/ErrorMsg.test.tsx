import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorMsg } from '../ErrorMsg';

describe('ErrorMsg', () => {
  it('renders message, code, and buttons', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const onAction = vi.fn();
    const onReport = vi.fn();
    const onDismiss = vi.fn();

    render(
      <ErrorMsg
        message="Failed to load resource"
        code="ERR_NETWORK"
        actionLabel="Reconnect"
        onRetry={onRetry}
        onAction={onAction}
        onReport={onReport}
        onDismiss={onDismiss}
        aria-label="Network error"
      />,
    );

    expect(screen.getByRole('alert', { name: 'Network error' })).toBeInTheDocument();
    expect(screen.getByText(/Failed to load resource/)).toBeInTheDocument();
    expect(screen.getByText(/\(ERR_NETWORK\)/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledWith({ code: 'ERR_NETWORK' });

    await user.click(screen.getByRole('button', { name: 'Reconnect' }));
    expect(onAction).toHaveBeenCalledWith({ code: 'ERR_NETWORK' });

    await user.click(screen.getByRole('button', { name: 'Report' }));
    expect(onReport).toHaveBeenCalledWith({ code: 'ERR_NETWORK', message: 'Failed to load resource' });

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledWith({ code: 'ERR_NETWORK' });
  });

  it('renders modal variant correctly', () => {
    const { container } = render(
      <ErrorMsg message="Critical error" variant="modal" />,
    );
    expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
