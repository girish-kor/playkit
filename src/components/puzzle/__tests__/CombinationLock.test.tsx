import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CombinationLock } from '../CombinationLock';

describe('CombinationLock', () => {
  it('renders one role="slider" wheel per the given wheel count, starting at range.min', () => {
    render(<CombinationLock wheels={3} correctCombination={[1, 2, 3]} />);
    const wheels = screen.getAllByRole('slider');
    expect(wheels).toHaveLength(3);
    expect(wheels[0]).toHaveAttribute('aria-valuenow', '0');
  });

  it('ArrowUp/ArrowDown adjust a wheel value and call onWheelChange/onChange', () => {
    const onWheelChange = vi.fn();
    const onChange = vi.fn();
    render(
      <CombinationLock
        wheels={2}
        correctCombination={[1, 1]}
        onWheelChange={onWheelChange}
        onChange={onChange}
      />,
    );
    const wheels = screen.getAllByRole('slider');
    fireEvent.keyDown(wheels[0]!, { key: 'ArrowUp' });
    expect(onWheelChange).toHaveBeenCalledWith(0, 1);
    expect(onChange).toHaveBeenCalledWith([1, 0]);
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuenow', '1');
  });

  it('wrapAround wraps past the max back to min', () => {
    render(
      <CombinationLock wheels={1} correctCombination={[0]} range={{ min: 0, max: 9 }} wrapAround />,
    );
    const wheel = screen.getByRole('slider');
    fireEvent.keyDown(wheel, { key: 'ArrowDown' });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '9');
  });

  it('without wrapAround, clamps at the range boundary instead of wrapping', () => {
    render(
      <CombinationLock
        wheels={1}
        correctCombination={[0]}
        range={{ min: 0, max: 9 }}
        wrapAround={false}
      />,
    );
    const wheel = screen.getByRole('slider');
    fireEvent.keyDown(wheel, { key: 'ArrowDown' });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '0');
  });

  it('autoCheck (default) calls onSuccess once the combination matches', async () => {
    const onSuccess = vi.fn();
    render(<CombinationLock wheels={1} correctCombination={[1]} onSuccess={onSuccess} />);
    const wheel = screen.getByRole('slider');
    fireEvent.keyDown(wheel, { key: 'ArrowUp' });
    await vi.waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });

  it('autoCheck: false requires an explicit Submit, calling onSubmit and onFailure on a mismatch', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onFailure = vi.fn();
    render(
      <CombinationLock
        wheels={1}
        correctCombination={[5]}
        autoCheck={false}
        onSubmit={onSubmit}
        onFailure={onFailure}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledWith([0]);
    expect(onFailure).toHaveBeenCalledTimes(1);
  });

  it('controlled values prop wins over internal wheel state', () => {
    render(
      <CombinationLock wheels={1} correctCombination={[0]} values={[3]} onChange={() => {}} />,
    );
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '3');
  });
});
