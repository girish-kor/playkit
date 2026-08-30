import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Console } from '../Console';

describe('Console', () => {
  it('renders log container and filter select', () => {
    render(<Console onCommand={() => {}} />);
    expect(screen.getByRole('log', { name: 'Console' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Filter level' })).toBeInTheDocument();
  });

  it('calls onCommand and onExecute when a command is typed and submitted', async () => {
    const user = userEvent.setup();
    const onCommand = vi.fn();
    const onExecute = vi.fn();
    render(<Console onCommand={onCommand} onExecute={onExecute} />);

    const input = screen.getByRole('combobox', { name: 'Console command' });
    await user.type(input, 'help{enter}');

    expect(onCommand).toHaveBeenCalledWith('help');
    expect(onExecute).toHaveBeenCalledWith('help', undefined);
  });

  it('triggers onClear and clear when Clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<Console onCommand={() => {}} onClear={onClear} />);

    const clearBtn = screen.getByRole('button', { name: 'Clear' });
    await user.click(clearBtn);
    expect(onClear).toHaveBeenCalled();
  });
});
