import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select, SettingsSelectOption } from '../Select';

const options: SettingsSelectOption[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Normal', value: 'normal' },
  { label: 'Hard', value: 'hard' },
];

describe('Select', () => {
  it('renders dropdown with label and placeholder', () => {
    render(<Select label="Difficulty" value={null} options={options} placeholder="Select difficulty" onChange={() => {}} />);
    expect(screen.getByRole('combobox', { name: 'Difficulty' })).toBeInTheDocument();
    expect(screen.getByText('Select difficulty')).toBeInTheDocument();
  });

  it('variant="button-group" renders buttons for each option and calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSelect = vi.fn();
    render(
      <Select
        label="Difficulty"
        value="normal"
        options={options}
        variant="button-group"
        onChange={onChange}
        onSelect={onSelect}
      />,
    );
    expect(screen.getByRole('button', { name: 'Normal' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Hard' }));
    expect(onChange).toHaveBeenCalledWith('hard');
    expect(onSelect).toHaveBeenCalledWith('hard');
  });

  it('respects disabled prop in button-group variant', () => {
    render(
      <Select
        label="Difficulty"
        value="normal"
        options={options}
        variant="button-group"
        disabled
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: 'Easy' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Normal' })).toBeDisabled();
  });
});
