import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Inventory } from '../Inventory';
import type { Item } from '../../../types';

const items: Array<Item | null> = [{ id: 'sword', name: 'Sword' }, null, null, null];

describe('Inventory', () => {
  it('renders role="grid" with one ItemSlot (gridcell) per slot', () => {
    render(<Inventory slots={4} items={items} />);
    expect(screen.getByRole('grid', { name: 'Inventory' })).toBeInTheDocument();
    expect(screen.getAllByRole('gridcell')).toHaveLength(4);
  });

  it('calls onSelect and onItemClick when a filled slot is clicked', () => {
    const onSelect = vi.fn();
    const onItemClick = vi.fn();
    render(<Inventory slots={4} items={items} onSelect={onSelect} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByRole('gridcell', { name: 'Sword' }));
    expect(onSelect).toHaveBeenCalledWith(0);
    expect(onItemClick).toHaveBeenCalledWith(0, items[0]);
  });

  it('showEmptySlots: false omits empty slot cells entirely', () => {
    render(<Inventory slots={4} items={items} showEmptySlots={false} />);
    expect(screen.getAllByRole('gridcell')).toHaveLength(1);
  });

  it('supports a custom emptySlotRender for empty slots', () => {
    render(
      <Inventory
        slots={4}
        items={items}
        emptySlotRender={(i) => <div data-testid={`empty-${i}`} />}
      />,
    );
    expect(screen.getByTestId('empty-1')).toBeInTheDocument();
  });

  it('marks the selected slot via aria-selected', () => {
    render(<Inventory slots={4} items={items} />);
    const cell = screen.getByRole('gridcell', { name: 'Sword' });
    expect(cell).toHaveAttribute('aria-selected', 'false');
    fireEvent.click(cell);
    expect(cell).toHaveAttribute('aria-selected', 'true');
  });
});
