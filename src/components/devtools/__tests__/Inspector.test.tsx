import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Inspector } from '../Inspector';

describe('Inspector', () => {
  it('renders tree role and filter input', () => {
    render(<Inspector pcScene={null} aria-label="Scene Inspector" />);
    expect(screen.getByRole('tree', { name: 'Scene Inspector' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Filter entities' })).toBeInTheDocument();
  });

  it('calls onSearch when filter input is typed into', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Inspector pcScene={null} onSearch={onSearch} />);

    const input = screen.getByRole('textbox', { name: 'Filter entities' });
    await user.type(input, 'Player');
    expect(onSearch).toHaveBeenCalledWith('Player');
  });
});
