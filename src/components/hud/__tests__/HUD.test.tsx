import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { HUD } from '../HUD';

describe('HUD', () => {
  it('renders role="region" with children, visible by default', () => {
    render(
      <HUD aria-label="Game HUD">
        <span>Content</span>
      </HUD>,
    );
    const region = screen.getByRole('region', { name: 'Game HUD' });
    expect(region).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onMount on mount and onUnmount on unmount', () => {
    const onMount = vi.fn();
    const onUnmount = vi.fn();
    const { unmount } = render(<HUD onMount={onMount} onUnmount={onUnmount} />);
    expect(onMount).toHaveBeenCalledTimes(1);
    unmount();
    expect(onUnmount).toHaveBeenCalledTimes(1);
  });

  it('calls onVisibilityChange/onToggle and onOpen/onClose on isVisible transitions', () => {
    const onVisibilityChange = vi.fn();
    const onToggle = vi.fn();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { rerender } = render(
      <HUD
        isVisible
        onVisibilityChange={onVisibilityChange}
        onToggle={onToggle}
        onOpen={onOpen}
        onClose={onClose}
      />,
    );
    rerender(
      <HUD
        isVisible={false}
        onVisibilityChange={onVisibilityChange}
        onToggle={onToggle}
        onOpen={onOpen}
        onClose={onClose}
      />,
    );
    expect(onVisibilityChange).toHaveBeenCalledWith(false);
    expect(onToggle).toHaveBeenCalledWith(false);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClickOutside only when the click target is the HUD container itself, not a child', async () => {
    const user = userEvent.setup();
    const onClickOutside = vi.fn();
    render(
      <HUD aria-label="HUD" onClickOutside={onClickOutside}>
        <button type="button">Child</button>
      </HUD>,
    );
    await user.click(screen.getByText('Child'));
    expect(onClickOutside).not.toHaveBeenCalled();
    await user.click(screen.getByRole('region'));
    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('applies the not-visible styling (opacity-0, pointer-events-none) when isVisible is false', () => {
    const { container } = render(<HUD isVisible={false} aria-label="HUD" />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.firstElementChild?.className).toContain('opacity-0');
  });

  it('calls onRender/onUpdate on animation frames when either is provided', () => {
    vi.useFakeTimers();
    const onRender = vi.fn();
    const onUpdate = vi.fn();
    render(<HUD onRender={onRender} onUpdate={onUpdate} />);
    act(() => vi.advanceTimersByTime(50));
    expect(onRender).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
