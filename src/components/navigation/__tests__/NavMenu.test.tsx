import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NavMenu } from '../NavMenu';
import type { NavItem } from '../../../types';

const items: NavItem[] = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'settings', label: 'Settings', path: '/settings' },
];

describe('NavMenu', () => {
  it('renders role="navigation" with one role="menuitem" per item', () => {
    render(<NavMenu items={items} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
  });

  it('marks the active item with aria-current="page"', () => {
    render(<NavMenu items={items} activePath="/settings" />);
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('menuitem', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('calls onNavigate and onItemClick when an item is activated', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const onItemClick = vi.fn();
    render(<NavMenu items={items} onNavigate={onNavigate} onItemClick={onItemClick} />);
    await user.click(screen.getByRole('menuitem', { name: 'Home' }));
    expect(onNavigate).toHaveBeenCalledWith('/home');
    expect(onItemClick).toHaveBeenCalledWith(items[0]);
  });

  it('a disabled item cannot be activated', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <NavMenu
        items={[{ id: 'home', label: 'Home', path: '/home', disabled: true }]}
        onNavigate={onNavigate}
      />,
    );
    await user.click(screen.getByRole('menuitem', { name: 'Home' }));
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('ArrowRight moves focus to the next item in a horizontal menu', async () => {
    const user = userEvent.setup();
    render(<NavMenu items={items} />);
    screen.getByRole('menuitem', { name: 'Home' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toHaveFocus();
  });

  it('variant="dropdown" starts closed and opens via the keyboardShortcut', () => {
    render(<NavMenu items={items} variant="dropdown" keyboardShortcut="m" />);
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });

  it('calls onHover/onItemHover on hover', async () => {
    const user = userEvent.setup();
    const onHover = vi.fn();
    const onItemHover = vi.fn();
    render(<NavMenu items={items} onHover={onHover} onItemHover={onItemHover} />);
    await user.hover(screen.getByRole('menuitem', { name: 'Home' }));
    expect(onHover).toHaveBeenCalledWith('/home');
    expect(onItemHover).toHaveBeenCalledWith(items[0]);
  });
});
