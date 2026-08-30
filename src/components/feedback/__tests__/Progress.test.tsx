import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Progress } from '../Progress';

describe('Progress', () => {
  it('renders role="progressbar" with the documented aria-value bounds', () => {
    render(<Progress value={30} max={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '30');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('derives aria-label from label + value/max when aria-label is not explicitly given', () => {
    render(<Progress value={5} max={10} label="XP" />);
    expect(screen.getByRole('progressbar', { name: 'XP: 5 of 10' })).toBeInTheDocument();
  });

  it('calls both onChange and the onValueChange alias with the same value', () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Progress value={0} max={100} onChange={onChange} onValueChange={onValueChange} />,
    );
    rerender(<Progress value={50} max={100} onChange={onChange} onValueChange={onValueChange} />);
    expect(onChange).toHaveBeenCalledWith(50);
    expect(onValueChange).toHaveBeenCalledWith(50);
  });

  it('calls onMaxReached and onComplete when value reaches max, onMinReached at 0', () => {
    const onMaxReached = vi.fn();
    const onComplete = vi.fn();
    const onMinReached = vi.fn();
    const { rerender } = render(
      <Progress
        value={50}
        max={100}
        onMaxReached={onMaxReached}
        onComplete={onComplete}
        onMinReached={onMinReached}
      />,
    );
    rerender(
      <Progress
        value={100}
        max={100}
        onMaxReached={onMaxReached}
        onComplete={onComplete}
        onMinReached={onMinReached}
      />,
    );
    expect(onMaxReached).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
    rerender(
      <Progress
        value={0}
        max={100}
        onMaxReached={onMaxReached}
        onComplete={onComplete}
        onMinReached={onMinReached}
      />,
    );
    expect(onMinReached).toHaveBeenCalledTimes(1);
  });

  it('indeterminate omits aria-valuenow', () => {
    render(<Progress value={0} max={100} indeterminate />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  it('variant="indeterminate" behaves the same as the indeterminate prop', () => {
    render(<Progress value={0} max={100} variant="indeterminate" />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  it('variant="segmented" renders `segments` discrete blocks (default 10)', () => {
    const { container } = render(<Progress value={50} max={100} variant="segmented" />);
    expect(container.querySelectorAll('.flex-1.rounded-sm')).toHaveLength(10);
  });

  it('showValue renders the rounded percentage as text', () => {
    render(<Progress value={33} max={100} showValue />);
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('clamps the visual percentage to the 0-100 range for out-of-bounds values', () => {
    render(<Progress value={150} max={100} data-testid="p" />);
    const bar = screen.getByRole('progressbar');
    const fill = bar.querySelector('div');
    expect(fill).toHaveStyle({ width: '100%' });
  });
});
