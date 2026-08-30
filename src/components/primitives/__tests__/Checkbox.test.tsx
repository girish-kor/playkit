import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('uncontrolled: toggles internal state, calling onChange and the onCheckedChange alias', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="agree" onChange={onChange} onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole('checkbox');
    expect(box).toHaveAttribute('data-state', 'unchecked');
    await user.click(box);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(box).toHaveAttribute('data-state', 'checked');
  });

  it('controlled: the checked prop wins even after a click', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="agree" checked={false} onChange={() => {}} />);
    const box = screen.getByRole('checkbox');
    await user.click(box);
    expect(box).toHaveAttribute('data-state', 'unchecked');
  });

  it('indeterminate renders the mixed Radix state and calls onIndeterminateChange on transitions', () => {
    const onIndeterminateChange = vi.fn();
    const { rerender } = render(
      <Checkbox aria-label="agree" indeterminate onIndeterminateChange={onIndeterminateChange} />,
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'indeterminate');
    rerender(
      <Checkbox
        aria-label="agree"
        indeterminate={false}
        onIndeterminateChange={onIndeterminateChange}
      />,
    );
    expect(onIndeterminateChange).toHaveBeenCalledWith(false);
  });

  it('disabled prevents interaction', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox aria-label="agree" disabled onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders the optional label text', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });
});
