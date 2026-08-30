import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Overlay } from '../Overlay';

describe('Overlay', () => {
  it('returns null when closed and there are no children', () => {
    const { container } = render(<Overlay isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders portaled to document.body when open, with aria-hidden false and aria-modal', () => {
    render(<Overlay isOpen aria-label="backdrop" />);
    const el = screen.getByLabelText('backdrop');
    expect(el).toHaveAttribute('aria-hidden', 'false');
    expect(el).toHaveAttribute('aria-modal', 'true');
    expect(el.parentElement).toBe(document.body);
  });

  it('calls onOverlayClick and the onClick alias when the backdrop is clicked', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onOverlayClick = vi.fn();
    render(
      <Overlay isOpen aria-label="backdrop" onClick={onClick} onOverlayClick={onOverlayClick} />,
    );
    await user.click(screen.getByLabelText('backdrop'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOverlayClick).toHaveBeenCalledTimes(1);
  });

  it('calls onEscape when Escape is pressed while open', () => {
    const onEscape = vi.fn();
    render(<Overlay isOpen onEscape={onEscape} />);
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('calls onOpen/onOpenChange on the transition to open, and onClose/onOpenChange(false) on close', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Overlay isOpen={false} onOpen={onOpen} onClose={onClose} onOpenChange={onOpenChange} />,
    );
    rerender(<Overlay isOpen onOpen={onOpen} onClose={onClose} onOpenChange={onOpenChange} />);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    rerender(
      <Overlay isOpen={false} onOpen={onOpen} onClose={onClose} onOpenChange={onOpenChange} />,
    );
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('skips the transition delay (calls onTransitionEnd immediately) when reduced motion is preferred', () => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    const onTransitionEnd = vi.fn();
    const { rerender } = render(
      <Overlay isOpen={false} transitionDuration={300} onTransitionEnd={onTransitionEnd} />,
    );
    rerender(<Overlay isOpen transitionDuration={300} onTransitionEnd={onTransitionEnd} />);
    act(() => vi.advanceTimersByTime(0));
    expect(onTransitionEnd).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('applies the documented variant background classes', () => {
    render(<Overlay isOpen variant="blur" aria-label="backdrop" />);
    expect(screen.getByLabelText('backdrop').className).toContain('backdrop-blur-sm');
  });
});
