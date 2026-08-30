import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroup } from '../RadioGroup';

const options = [
  { label: 'Easy', value: 'easy' },
  { label: 'Hard', value: 'hard' },
];

describe('RadioGroup', () => {
  it('renders one radio per option with role radiogroup and an accessible label', () => {
    render(
      <RadioGroup options={options} value="easy" onChange={() => {}} aria-label="Difficulty" />,
    );
    expect(screen.getByRole('radiogroup', { name: 'Difficulty' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('reflects the current value via the checked radio', () => {
    render(
      <RadioGroup options={options} value="hard" onChange={() => {}} aria-label="Difficulty" />,
    );
    expect(screen.getByRole('radio', { name: 'Hard' })).toHaveAttribute('data-state', 'checked');
    expect(screen.getByRole('radio', { name: 'Easy' })).toHaveAttribute('data-state', 'unchecked');
  });

  it('calls onChange with the original, non-stringified option value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup options={options} value="easy" onChange={onChange} aria-label="Difficulty" />,
    );
    await user.click(screen.getByRole('radio', { name: 'Hard' }));
    expect(onChange).toHaveBeenCalledWith('hard');
  });

  it('a disabled option cannot be selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const withDisabled = [
      { label: 'Easy', value: 'easy' },
      { label: 'Hard', value: 'hard', disabled: true },
    ];
    render(
      <RadioGroup
        options={withDisabled}
        value="easy"
        onChange={onChange}
        aria-label="Difficulty"
      />,
    );
    await user.click(screen.getByRole('radio', { name: 'Hard' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled true on the whole group disables every option', () => {
    render(
      <RadioGroup
        options={options}
        value="easy"
        onChange={() => {}}
        disabled
        aria-label="Difficulty"
      />,
    );
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
  });
});
