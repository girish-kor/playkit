import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Breadcrumb } from '../Breadcrumb';

const items = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'inv', label: 'Inventory', path: '/inventory' },
  { id: 'sword', label: 'Sword' },
];

describe('Breadcrumb', () => {
  it('renders role="navigation" with an ordered list of items, the last marked aria-current="page"', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Sword')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onNavigate when a non-final item is clicked', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<Breadcrumb items={items} onNavigate={onNavigate} />);
    await user.click(screen.getByRole('button', { name: 'Home' }));
    expect(onNavigate).toHaveBeenCalledWith('/');
  });

  it('maxVisible collapses the middle items into an ellipsis, calling onEllipsisClick', async () => {
    const user = userEvent.setup();
    const onEllipsisClick = vi.fn();
    render(<Breadcrumb items={items} maxVisible={2} onEllipsisClick={onEllipsisClick} />);
    expect(screen.queryByRole('button', { name: 'Inventory' })).not.toBeInTheDocument();
    await user.click(screen.getByText('…'));
    expect(onEllipsisClick).toHaveBeenCalledTimes(1);
  });

  it('supports a custom separator', () => {
    render(<Breadcrumb items={items} separator={<span data-testid="sep">/</span>} />);
    expect(screen.getAllByTestId('sep').length).toBeGreaterThan(0);
  });
});
