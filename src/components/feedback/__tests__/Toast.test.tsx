import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Toast } from '../Toast';

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders role="status" for info/success, role="alert" for warning/error', () => {
    const { rerender } = render(<Toast message="Saved" type="success" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<Toast message="Failed" type="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onOpen once on mount with a timestamp', () => {
    const onOpen = vi.fn();
    render(<Toast message="Hi" onOpen={onOpen} />);
    expect(onOpen).toHaveBeenCalledWith(expect.any(Number));
  });

  it('auto-dismisses after `duration`, calling onDismiss("timeout") and onClose("timeout")', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    const onClose = vi.fn();
    render(<Toast message="Hi" duration={1000} onDismiss={onDismiss} onClose={onClose} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(onDismiss).toHaveBeenCalledWith('timeout');
    expect(onClose).toHaveBeenCalledWith('timeout');
    expect(screen.queryByText('Hi')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('duration <= 0 never auto-dismisses', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<Toast message="Hi" duration={0} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(10000));
    expect(onDismiss).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('pauses the auto-dismiss timer on hover, calling onMouseEnter/onMouseLeave', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    render(
      <Toast
        message="Hi"
        duration={1000}
        onDismiss={onDismiss}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />,
    );
    const toast = screen.getByRole('status');
    act(() => fireEvent.mouseEnter(toast));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(1000));
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => fireEvent.mouseLeave(toast));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('clicking the dismiss button calls onDismiss("user")', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Toast message="Hi" onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledWith('user');
  });

  it('an action button calls its onClick, onAction, and dismisses with reason "action"', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const onDismiss = vi.fn();
    const actionOnClick = vi.fn();
    render(
      <Toast
        message="Hi"
        action={{ label: 'Undo', onClick: actionOnClick }}
        onAction={onAction}
        onDismiss={onDismiss}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(actionOnClick).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith(0, expect.objectContaining({ label: 'Undo' }));
    expect(onDismiss).toHaveBeenCalledWith('action');
  });

  it('title renders a bold heading above the message', () => {
    render(<Toast message="Body text" title="Heads up" />);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });
});
