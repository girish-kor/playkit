import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Slider } from '../Slider';

describe('Slider', () => {
  it('renders role="slider" with the given value/min/max', () => {
    render(<Slider label="Volume" value={50} min={0} max={100} onChange={() => {}} />);
    const el = screen.getByRole('slider', { name: 'Volume' });
    expect(el).toHaveAttribute('aria-valuenow', '50');
    expect(el).toHaveAttribute('aria-valuemin', '0');
    expect(el).toHaveAttribute('aria-valuemax', '100');
  });

  it('ArrowRight increases the value, calling onChange and the onValueChange alias', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <Slider label="Volume" value={50} min={0} max={100} step={5} onChange={onChange} onValueChange={onValueChange} />,
    );
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(55);
    expect(onValueChange).toHaveBeenCalledWith(55);
  });

  it('tooltip (default true) shows the formatted value; false hides it', () => {
    const format = (v: number) => `${v}%`;
    const { rerender } = render(
      <Slider label="Volume" value={50} min={0} max={100} format={format} onChange={() => {}} />,
    );
    expect(screen.getByText('50%')).toBeInTheDocument();
    rerender(
      <Slider label="Volume" value={50} min={0} max={100} format={format} tooltip={false} onChange={() => {}} />,
    );
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('showInput renders a numeric input mirroring the value, wired to onChange', () => {
    const onChange = vi.fn();
    render(<Slider label="Volume" value={50} min={0} max={100} showInput onChange={onChange} />);
    const input = screen.getByRole('spinbutton', { name: 'Volume numeric input' });
    expect(input).toHaveValue(50);
    fireEvent.change(input, { target: { value: '80' } });
    expect(onChange).toHaveBeenLastCalledWith(80);
  });

  it('renders marks when provided', () => {
    render(<Slider label="Volume" value={50} min={0} max={100} marks={[0, 50, 100]} onChange={() => {}} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
