import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('canvas-confetti', () => ({
  default: {
    create: vi.fn(() => vi.fn().mockResolvedValue(undefined)),
  },
}));

import { Confetti } from '../Confetti';

describe('Confetti', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing until active transitions from false to true', () => {
    const { container, rerender } = render(<Confetti active={false} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<Confetti active />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('calls onComplete after duration elapses', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    const { rerender } = render(<Confetti active={false} onComplete={onComplete} duration={500} />);
    rerender(<Confetti active duration={500} onComplete={onComplete} />);
    act(() => vi.advanceTimersByTime(500));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('renders a reduced-motion fallback message instead of particles when the user prefers reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    const { rerender } = render(<Confetti active={false} />);
    rerender(<Confetti active />);
    expect(screen.getByText(/Success!/)).toBeInTheDocument();
  });

  it('reducedMotionFallback="none" renders nothing at all under reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    const { container, rerender } = render(
      <Confetti active={false} reducedMotionFallback="none" />,
    );
    rerender(<Confetti active reducedMotionFallback="none" />);
    expect(container).toBeEmptyDOMElement();
  });
});
