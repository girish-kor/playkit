import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DamageNumbers } from '../DamageNumbers';

describe('DamageNumbers', () => {
  it('is aria-hidden (purely visual feedback; Health already announces the value change)', () => {
    const { container } = render(<DamageNumbers />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders one number per event, and "Miss" text for miss-type events', () => {
    render(
      <DamageNumbers
        events={[
          { id: '1', type: 'damage', amount: 25 },
          { id: '2', type: 'miss', amount: 0 },
        ]}
      />,
    );
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Miss')).toBeInTheDocument();
  });

  it('does not re-render an already-seen event id when the events array is passed again', () => {
    const { rerender } = render(
      <DamageNumbers events={[{ id: '1', type: 'damage', amount: 10 }]} />,
    );
    expect(screen.getAllByText('10')).toHaveLength(1);
    rerender(<DamageNumbers events={[{ id: '1', type: 'damage', amount: 10 }]} />);
    expect(screen.getAllByText('10')).toHaveLength(1);
  });

  it('removes a number after duration and calls onEventComplete with its id', () => {
    vi.useFakeTimers();
    const onEventComplete = vi.fn();
    render(
      <DamageNumbers
        events={[{ id: '1', type: 'damage', amount: 10 }]}
        duration={500}
        onEventComplete={onEventComplete}
      />,
    );
    expect(screen.getByText('10')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(500));
    expect(screen.queryByText('10')).not.toBeInTheDocument();
    expect(onEventComplete).toHaveBeenCalledWith('1');
    vi.useRealTimers();
  });

  it('caps the number of concurrently rendered numbers at maxConcurrent', () => {
    const events = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      type: 'damage' as const,
      amount: i,
    }));
    render(<DamageNumbers events={events} maxConcurrent={2} />);
    expect(screen.getAllByText(/^[0-9]$/)).toHaveLength(2);
  });
});
