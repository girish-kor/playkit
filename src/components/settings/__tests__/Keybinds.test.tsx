import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Keybinds } from '../Keybinds';
import type { KeyBinding } from '../../../types';

const mockBindings: KeyBinding[] = [
  { action: 'jump', key: 'Space', label: 'Jump' },
  { action: 'crouch', key: 'Control', label: 'Crouch' },
];

describe('Keybinds', () => {
  it('renders key bindings list', () => {
    render(<Keybinds bindings={mockBindings} onChange={() => {}} onReset={() => {}} />);
    expect(screen.getByText('Jump')).toBeInTheDocument();
    expect(screen.getByText('SPACE')).toBeInTheDocument();
    expect(screen.getByText('Crouch')).toBeInTheDocument();
    expect(screen.getByText('CONTROL')).toBeInTheDocument();
  });

  it('enters listening mode when binding button is clicked', async () => {
    const user = userEvent.setup();
    const onStartListening = vi.fn();
    render(
      <Keybinds
        bindings={mockBindings}
        onChange={() => {}}
        onReset={() => {}}
        onStartListening={onStartListening}
      />,
    );
    const jumpButton = screen.getByRole('button', { name: 'SPACE' });
    await user.click(jumpButton);
    expect(onStartListening).toHaveBeenCalled();
    expect(jumpButton).toHaveTextContent('Press a key…');
  });

  it('resets bindings when reset button is clicked', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    const onChange = vi.fn();
    const defaultBindings: KeyBinding[] = [{ action: 'jump', key: 'Space', label: 'Jump' }];
    render(
      <Keybinds
        bindings={mockBindings}
        defaultBindings={defaultBindings}
        onChange={onChange}
        onReset={onReset}
      />,
    );
    const resetButton = screen.getByRole('button', { name: 'Reset to defaults' });
    await user.click(resetButton);
    expect(onReset).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(defaultBindings);
  });
});
