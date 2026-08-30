import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DropdownMenu } from '../DropdownMenu';
import type { ContextMenuItem } from '../../../types';

const items: ContextMenuItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
];

describe('DropdownMenu', () => {
  it('opens on trigger click, rendering the given items', async () => {
    const user = userEvent.setup();
    render(<DropdownMenu items={items} trigger={<button type="button">Options</button>} />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    await user.click(screen.getByText('Options'));
    await waitFor(() => expect(screen.getByText('Edit')).toBeInTheDocument());
  });

  it('sets aria-haspopup/aria-expanded on the trigger', async () => {
    const user = userEvent.setup();
    render(<DropdownMenu items={items} trigger={<button type="button">Options</button>} />);
    const trigger = screen.getByText('Options');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  });

  it('selecting an item calls onSelect and closes (closeOnSelect default true), calling onClose', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onClose = vi.fn();
    render(
      <DropdownMenu
        items={items}
        trigger={<button type="button">Options</button>}
        onSelect={onSelect}
        onClose={onClose}
      />,
    );
    await user.click(screen.getByText('Options'));
    await waitFor(() => expect(screen.getByText('Edit')).toBeInTheDocument());
    await user.click(screen.getByText('Edit'));
    expect(onSelect).toHaveBeenCalledWith('edit', items[0]);
    expect(onClose).toHaveBeenCalledWith('select');
    await waitFor(() => expect(screen.queryByText('Edit')).not.toBeInTheDocument());
  });

  it('closeOnSelect: false keeps the menu open after selection', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu
        items={items}
        trigger={<button type="button">Options</button>}
        onSelect={onSelect}
        closeOnSelect={false}
      />,
    );
    await user.click(screen.getByText('Options'));
    await waitFor(() => expect(screen.getByText('Edit')).toBeInTheDocument());
    await user.click(screen.getByText('Edit'));
    expect(onSelect).toHaveBeenCalledWith('edit', items[0]);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('controlled isOpen wins over internal state', () => {
    render(
      <DropdownMenu
        items={items}
        trigger={<button type="button">Options</button>}
        isOpen
        onOpenChange={() => {}}
      />,
    );
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
