import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Joystick } from '../Joystick';

function drag(el: Element, moves: Array<{ x: number; y: number }>) {
  const start = moves[0]!;
  fireEvent.pointerDown(el, { pointerId: 1, clientX: start.x, clientY: start.y, buttons: 1 });
  for (const point of moves.slice(1)) {
    fireEvent.pointerMove(el, { pointerId: 1, clientX: point.x, clientY: point.y, buttons: 1 });
  }
  const end = moves[moves.length - 1]!;
  fireEvent.pointerUp(el, { pointerId: 1, clientX: end.x, clientY: end.y });
}

describe('Joystick', () => {
  it('renders with role="slider" and the documented aria-value bounds', () => {
    render(<Joystick aria-label="Move" />);
    const el = screen.getByRole('slider', { name: 'Move' });
    expect(el).toHaveAttribute('aria-valuemin', '0');
    expect(el).toHaveAttribute('aria-valuemax', '1');
  });

  it('calls onStart/onDragStart on the first pointer movement and onEnd/onDragEnd on release', () => {
    const onStart = vi.fn();
    const onDragStart = vi.fn();
    const onEnd = vi.fn();
    const onDragEnd = vi.fn();
    render(
      <Joystick
        size={100}
        aria-label="Move"
        onStart={onStart}
        onDragStart={onDragStart}
        onEnd={onEnd}
        onDragEnd={onDragEnd}
      />,
    );
    const el = screen.getByRole('slider');
    act(() =>
      drag(el, [
        { x: 0, y: 0 },
        { x: 40, y: 0 },
      ]),
    );
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onDragStart).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(onDragEnd).toHaveBeenCalledTimes(1);
  });

  it('calls onMove/onDrag with normalized x/y once the movement exceeds the deadzone', () => {
    const onMove = vi.fn();
    render(<Joystick size={100} deadzone={0.1} aria-label="Move" onMove={onMove} />);
    const el = screen.getByRole('slider');
    act(() =>
      drag(el, [
        { x: 0, y: 0 },
        { x: 40, y: 0 },
      ]),
    );
    expect(onMove).toHaveBeenCalled();
    const [x, y] = onMove.mock.calls[onMove.mock.calls.length - 1]!;
    expect(x).toBeGreaterThan(0);
    expect(y).toBe(0);
  });

  it('movement below the deadzone is clamped to zero', () => {
    const onMove = vi.fn();
    render(<Joystick size={100} deadzone={0.5} aria-label="Move" onMove={onMove} />);
    const el = screen.getByRole('slider');
    act(() =>
      drag(el, [
        { x: 0, y: 0 },
        { x: 5, y: 0 },
      ]),
    );
    expect(onMove).toHaveBeenCalledWith(0, 0);
  });

  it('disabled prevents drag handlers from firing at all', () => {
    const onMove = vi.fn();
    render(<Joystick size={100} disabled aria-label="Move" onMove={onMove} />);
    const el = screen.getByRole('slider');
    expect(el).toHaveAttribute('aria-disabled', 'true');
    act(() =>
      drag(el, [
        { x: 0, y: 0 },
        { x: 40, y: 0 },
      ]),
    );
    expect(onMove).not.toHaveBeenCalled();
  });

  it('invertX flips the sign of the reported x axis', () => {
    const onMove = vi.fn();
    render(<Joystick size={100} deadzone={0} invertX aria-label="Move" onMove={onMove} />);
    const el = screen.getByRole('slider');
    act(() =>
      drag(el, [
        { x: 0, y: 0 },
        { x: 40, y: 0 },
      ]),
    );
    const [x] = onMove.mock.calls[onMove.mock.calls.length - 1]!;
    expect(x).toBeLessThan(0);
  });
});
