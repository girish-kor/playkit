import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SidebarMenu } from '../SidebarMenu';
import type { NavItem } from '../../../types';

const items: NavItem[] = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'settings', label: 'Settings', path: '/settings' },
];

describe('SidebarMenu', () => {
  it('renders role="navigation" with a labeled button per item', () => {
    render(<SidebarMenu items={items} />);
    expect(screen.getByRole('navigation', { name: 'Sidebar navigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    render(<SidebarMenu items={items} activePath="/settings" />);
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('calls onNavigate and onItemClick on activation', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const onItemClick = vi.fn();
    render(<SidebarMenu items={items} onNavigate={onNavigate} onItemClick={onItemClick} />);
    await user.click(screen.getByRole('button', { name: 'Home' }));
    expect(onNavigate).toHaveBeenCalledWith('/home');
    expect(onItemClick).toHaveBeenCalledWith(items[0]);
  });

  it('the collapse toggle calls onCollapsedChange and flips its own label', async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();
    render(<SidebarMenu items={items} onCollapsedChange={onCollapsedChange} />);
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
  });

  it('collapsible: false omits the collapse toggle entirely', () => {
    render(<SidebarMenu items={items} collapsible={false} />);
    expect(screen.queryByRole('button', { name: /sidebar/ })).not.toBeInTheDocument();
  });

  it('controlled collapsed prop wins over internal state', async () => {
    const user = userEvent.setup();
    render(<SidebarMenu items={items} collapsed={false} onCollapsedChange={() => {}} />);
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
  });

  it('pinnable + variant="overlay" renders a Pin toggle', async () => {
    const user = userEvent.setup();
    render(<SidebarMenu items={items} variant="overlay" pinnable />);
    const pin = screen.getByRole('button', { name: 'Pin' });
    expect(pin).toHaveAttribute('aria-pressed', 'false');
    await user.click(pin);
    expect(pin).toHaveAttribute('aria-pressed', 'true');
  });

  it('a disabled item cannot be activated', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <SidebarMenu
        items={[{ id: 'home', label: 'Home', path: '/home', disabled: true }]}
        onNavigate={onNavigate}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Home' }));
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
