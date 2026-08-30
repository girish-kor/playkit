import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { LootContainer } from '../LootContainer';
import type { Item } from '../../../types';

const items: Item[] = [{ id: 'gold', name: 'Gold' }];

describe('LootContainer', () => {
  it('renders nothing when isOpen is false', () => {
    render(<LootContainer isOpen={false} items={items} onClose={vi.fn()} onTake={vi.fn()} />);
    expect(screen.queryByText('Gold')).not.toBeInTheDocument();
  });

  it('renders the container contents in a Modal when open', () => {
    render(
      <LootContainer
        isOpen
        items={items}
        containerName="Treasure Chest"
        onClose={vi.fn()}
        onTake={vi.fn()}
      />,
    );
    expect(screen.getAllByText('Treasure Chest').length).toBeGreaterThan(0);
    expect(screen.getByRole('gridcell', { name: 'Gold' })).toBeInTheDocument();
  });

  it('double-clicking an item calls onTake with its id', () => {
    const onTake = vi.fn();
    render(<LootContainer isOpen items={items} onClose={vi.fn()} onTake={onTake} />);
    fireEvent.doubleClick(screen.getByRole('gridcell', { name: 'Gold' }));
    expect(onTake).toHaveBeenCalledWith('gold');
  });

  it('onTakeAll renders a "Take All" button that calls it', async () => {
    const user = userEvent.setup();
    const onTakeAll = vi.fn();
    render(
      <LootContainer
        isOpen
        items={items}
        onClose={vi.fn()}
        onTake={vi.fn()}
        onTakeAll={onTakeAll}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Take All' }));
    expect(onTakeAll).toHaveBeenCalledTimes(1);
  });

  it('calls onEmpty (and closes if autoCloseOnEmpty) once items becomes empty', () => {
    const onEmpty = vi.fn();
    const onClose = vi.fn();
    const { rerender } = render(
      <LootContainer
        isOpen
        items={items}
        onClose={onClose}
        onTake={vi.fn()}
        onEmpty={onEmpty}
        autoCloseOnEmpty
      />,
    );
    rerender(
      <LootContainer
        isOpen
        items={[]}
        onClose={onClose}
        onTake={vi.fn()}
        onEmpty={onEmpty}
        autoCloseOnEmpty
      />,
    );
    expect(onEmpty).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('variant="storage" with onDeposit renders a second Inventory for the player items', () => {
    render(
      <LootContainer
        isOpen
        items={items}
        variant="storage"
        onClose={vi.fn()}
        onTake={vi.fn()}
        onDeposit={vi.fn()}
        playerItems={[{ id: 'silver', name: 'Silver' }]}
      />,
    );
    expect(screen.getByRole('gridcell', { name: 'Silver' })).toBeInTheDocument();
  });
});
