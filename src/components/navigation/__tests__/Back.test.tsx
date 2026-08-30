import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Back } from '../Back';

describe('Back', () => {
  it('renders an icon-only button labeled "Go back" by default', () => {
    render(<Back />);
    expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument();
  });

  it('calls onBack with viaHistory: true when browser history is available', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const historyBackSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});
    Object.defineProperty(window.history, 'length', { value: 2, configurable: true });
    render(<Back onBack={onBack} />);
    await user.click(screen.getByRole('button'));
    expect(historyBackSpy).toHaveBeenCalledTimes(1);
    expect(onBack).toHaveBeenCalledWith(expect.objectContaining({ viaHistory: true }));
    historyBackSpy.mockRestore();
  });

  it('onBeforeBack returning false cancels the back action entirely', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const onBeforeBack = vi.fn().mockReturnValue(false);
    render(<Back onBack={onBack} onBeforeBack={onBeforeBack} />);
    await user.click(screen.getByRole('button'));
    expect(onBeforeBack).toHaveBeenCalledTimes(1);
    expect(onBack).not.toHaveBeenCalled();
  });

  it('confirmBeforeBack shows a confirm/cancel prompt instead of navigating immediately', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<Back onBack={onBack} confirmBeforeBack />);
    await user.click(screen.getByRole('button', { name: 'Go back' }));
    expect(onBack).not.toHaveBeenCalled();
    expect(screen.getByRole('alertdialog', { name: 'Confirm navigation' })).toBeInTheDocument();
  });

  it('confirming the prompt calls onConfirmBack and then performs the back action', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const onConfirmBack = vi.fn();
    render(<Back onBack={onBack} confirmBeforeBack onConfirmBack={onConfirmBack} />);
    await user.click(screen.getByRole('button', { name: 'Go back' }));
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirmBack).toHaveBeenCalledTimes(1);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('cancelling the prompt calls onCancelBack and does not navigate', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const onCancelBack = vi.fn();
    render(<Back onBack={onBack} confirmBeforeBack onCancelBack={onCancelBack} />);
    await user.click(screen.getByRole('button', { name: 'Go back' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancelBack).toHaveBeenCalledTimes(1);
    expect(onBack).not.toHaveBeenCalled();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('variant="with-label" shows both icon and text; variant="text-only" hides the icon', () => {
    const { container, rerender } = render(<Back variant="with-label" label="Back to menu" />);
    expect(screen.getByText('Back to menu')).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeNull();
    rerender(<Back variant="text-only" label="Back to menu" />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
