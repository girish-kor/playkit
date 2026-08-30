import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Confirm } from '../Confirm';

describe('Confirm', () => {
  it('renders role="alertdialog" with the title/message and Confirm/Cancel buttons', () => {
    render(
      <Confirm
        title="Delete item"
        message="This cannot be undone."
        isOpen
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('supports custom confirmLabel/cancelLabel', () => {
    render(
      <Confirm
        title="Delete"
        message="Sure?"
        confirmLabel="Delete"
        cancelLabel="Keep"
        isOpen
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument();
  });

  it('clicking Cancel calls onCancel, onConfirmCancel, and onClose', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onConfirmCancel = vi.fn();
    const onClose = vi.fn();
    render(
      <Confirm
        title="Delete"
        message="Sure?"
        isOpen
        onClose={onClose}
        onConfirm={vi.fn()}
        onCancel={onCancel}
        onConfirmCancel={onConfirmCancel}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirmCancel).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clicking Confirm calls onConfirm, then onAfterConfirm(undefined) and onClose on success', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    const onAfterConfirm = vi.fn();
    const onClose = vi.fn();
    render(
      <Confirm
        title="Delete"
        message="Sure?"
        isOpen
        onClose={onClose}
        onConfirm={onConfirm}
        onCancel={vi.fn()}
        onAfterConfirm={onAfterConfirm}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => expect(onAfterConfirm).toHaveBeenCalledWith(undefined));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirmError and onAfterConfirm(error) when onConfirm rejects', async () => {
    const user = userEvent.setup();
    const error = new Error('failed');
    const onConfirm = vi.fn().mockRejectedValue(error);
    const onConfirmError = vi.fn();
    const onAfterConfirm = vi.fn();
    render(
      <Confirm
        title="Delete"
        message="Sure?"
        isOpen
        onClose={vi.fn()}
        onConfirm={onConfirm}
        onCancel={vi.fn()}
        onConfirmError={onConfirmError}
        onAfterConfirm={onAfterConfirm}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    await vi.waitFor(() => expect(onConfirmError).toHaveBeenCalledWith(error));
    expect(onAfterConfirm).toHaveBeenCalledWith(error);
  });

  it('onBeforeConfirm returning false blocks the confirm action entirely', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onBeforeConfirm = vi.fn().mockResolvedValue(false);
    render(
      <Confirm
        title="Delete"
        message="Sure?"
        isOpen
        onClose={vi.fn()}
        onConfirm={onConfirm}
        onCancel={vi.fn()}
        onBeforeConfirm={onBeforeConfirm}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onBeforeConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('maps variant to the documented button style (danger/warning -> destructive)', () => {
    render(
      <Confirm
        title="Delete"
        message="Sure?"
        variant="danger"
        isOpen
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Confirm' }).className).toContain('bg-red-600');
  });
});
