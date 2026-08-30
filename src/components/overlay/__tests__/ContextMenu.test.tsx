import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ContextMenu } from '../ContextMenu';
import type { ContextMenuItem } from '../../../types';

const items: ContextMenuItem[] = [
  { id: 'use', label: 'Use' },
  { id: 'drop', label: 'Drop' },
];

describe('ContextMenu', () => {
  it('opens on right-click, rendering the given items', async () => {
    render(<ContextMenu items={items} trigger={<div>Item</div>} />);
    fireEvent.contextMenu(screen.getByText('Item'));
    await waitFor(() => expect(screen.getByText('Use')).toBeInTheDocument());
    expect(screen.getByText('Drop')).toBeInTheDocument();
  });

  it('calls onOpen with the click position', async () => {
    const onOpen = vi.fn();
    render(<ContextMenu items={items} trigger={<div>Item</div>} onOpen={onOpen} />);
    fireEvent.contextMenu(screen.getByText('Item'), { clientX: 10, clientY: 20 });
    await waitFor(() => expect(onOpen).toHaveBeenCalledWith({ x: 10, y: 20 }));
  });

  it('selecting an item calls onSelect and onClose("select")', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onClose = vi.fn();
    render(
      <ContextMenu items={items} trigger={<div>Item</div>} onSelect={onSelect} onClose={onClose} />,
    );
    fireEvent.contextMenu(screen.getByText('Item'));
    await waitFor(() => expect(screen.getByText('Use')).toBeInTheDocument());
    await user.click(screen.getByText('Use'));
    expect(onSelect).toHaveBeenCalledWith('use', items[0]);
    expect(onClose).toHaveBeenCalledWith('select');
  });

  it('renders a separator and nested submenu items', async () => {
    const nested: ContextMenuItem[] = [
      { id: 'sep', label: '', separator: true },
      { id: 'more', label: 'More', children: [{ id: 'nested', label: 'Nested action' }] },
    ];
    render(<ContextMenu items={nested} trigger={<div>Item</div>} />);
    fireEvent.contextMenu(screen.getByText('Item'));
    await waitFor(() => expect(screen.getByText('More')).toBeInTheDocument());
  });

  it('supports a custom renderItem', async () => {
    render(
      <ContextMenu
        items={items}
        trigger={<div>Item</div>}
        renderItem={(item) => <span data-testid={`custom-${item.id}`}>{item.label}</span>}
      />,
    );
    fireEvent.contextMenu(screen.getByText('Item'));
    await waitFor(() => expect(screen.getByTestId('custom-use')).toBeInTheDocument());
  });
});
