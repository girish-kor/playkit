import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from '../Modal';

describe('Modal', () => {
  it('renders nothing (Radix Dialog content unmounted) when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Settings">
        Body
      </Modal>,
    );
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
  });

  it('renders role="dialog" by default with the given title/description when open', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Settings" description="Configure your game">
        Body
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Configure your game')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('supports role="alertdialog" (used by Confirm)', () => {
    render(
      <Modal isOpen onClose={vi.fn()} role="alertdialog" aria-label="Confirm">
        Body
      </Modal>,
    );
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('calls onClose with reason "escape" when Escape is pressed and closeOnEscape is true (default)', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Settings">
        Body
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledWith('escape');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closeOnEscape: false prevents Escape from closing the modal', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Settings" closeOnEscape={false}>
        Body
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onOpen/onOpenChange on the open transition', () => {
    const onOpen = vi.fn();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Modal isOpen={false} onClose={vi.fn()} onOpen={onOpen} onOpenChange={onOpenChange}>
        Body
      </Modal>,
    );
    rerender(
      <Modal isOpen onClose={vi.fn()} onOpen={onOpen} onOpenChange={onOpenChange}>
        Body
      </Modal>,
    );
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(onOpen).toHaveBeenCalledWith('fade');
  });

  it('applies the documented variant-specific content classes', () => {
    render(
      <Modal isOpen onClose={vi.fn()} variant="drawer" title="Panel">
        Body
      </Modal>,
    );
    expect(screen.getByRole('dialog').className).toContain('right-0');
  });

  it('generates a visually-hidden Title from aria-label when no title is given (Radix requires an accessible name)', () => {
    render(
      <Modal isOpen onClose={vi.fn()} aria-label="Quick actions">
        Body
      </Modal>,
    );
    expect(screen.getByText('Quick actions', { selector: '.sr-only' })).toBeInTheDocument();
  });
});
