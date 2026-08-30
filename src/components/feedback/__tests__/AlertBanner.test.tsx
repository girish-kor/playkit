import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AlertBanner } from '../AlertBanner';

describe('AlertBanner', () => {
  it('renders role="alert" for warning/error (default warning), role="status" for info/success', () => {
    const { rerender } = render(<AlertBanner message="Careful" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    rerender(<AlertBanner message="FYI" type="info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('aria-live escalates to assertive only for type="error"', () => {
    const { rerender } = render(<AlertBanner message="m" type="warning" />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
    rerender(<AlertBanner message="m" type="error" />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('dismissible renders a dismiss control that hides the banner and calls onDismiss', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<AlertBanner message="m" dismissible onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('m')).not.toBeInTheDocument();
  });

  it('is not dismissible by default (no dismiss control)', () => {
    render(<AlertBanner message="m" />);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('an action renders a button that calls its onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<AlertBanner message="m" action={{ label: 'Retry', onClick }} />);
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
