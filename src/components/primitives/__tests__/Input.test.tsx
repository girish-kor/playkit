import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from '../Input';

describe('Input', () => {
  it('uncontrolled mode: types update internal value without a value prop', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="name" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hi');
    expect(input).toHaveValue('hi');
  });

  it('controlled mode: the value prop wins even when onChange does not update it', async () => {
    const user = userEvent.setup();
    render(<Input value="fixed" onChange={() => {}} aria-label="name" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'x');
    expect(input).toHaveValue('fixed');
  });

  it('calls both onChange and the onValueChange alias with the same new value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    render(<Input onChange={onChange} onValueChange={onValueChange} aria-label="name" />);
    await user.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('sets aria-invalid automatically when `error` is provided', () => {
    render(<Input error="Required" aria-label="name" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('defaults to type="text"', () => {
    render(<Input aria-label="name" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders prefix/suffix content alongside the input', () => {
    render(
      <Input
        aria-label="name"
        prefix={<span data-testid="prefix" />}
        suffix={<span data-testid="suffix" />}
      />,
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });
});
