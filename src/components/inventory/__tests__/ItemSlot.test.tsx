import * as React from 'react';
import { DndContext } from '@dnd-kit/core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ItemSlot } from '../ItemSlot';
import type { Item } from '../../../types';

const sword: Item = { id: 'sword', name: 'Sword' };

function withDnd(children: React.ReactNode) {
  return <DndContext>{children}</DndContext>;
}

describe('ItemSlot', () => {
  it('renders role="gridcell" labeled "Empty slot" when there is no item', () => {
    render(withDnd(<ItemSlot slotIndex={0} />));
    expect(screen.getByRole('gridcell', { name: 'Empty slot' })).toBeInTheDocument();
  });

  it('labels the slot with the item name when an item is present', () => {
    render(withDnd(<ItemSlot slotIndex={0} item={sword} />));
    expect(screen.getByRole('gridcell', { name: 'Sword' })).toBeInTheDocument();
  });

  it('calls both onSelect and onClick on activation', () => {
    const onSelect = vi.fn();
    const onClick = vi.fn();
    render(withDnd(<ItemSlot slotIndex={2} item={sword} onSelect={onSelect} onClick={onClick} />));
    fireEvent.click(screen.getByRole('gridcell'));
    expect(onSelect).toHaveBeenCalledWith(2);
    expect(onClick).toHaveBeenCalledWith(2);
  });

  it('supports keyboard activation via Enter/Space', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(withDnd(<ItemSlot slotIndex={0} item={sword} onSelect={onSelect} />));
    screen.getByRole('gridcell').focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('calls both onDoubleClick and onUse on double-click', () => {
    const onDoubleClick = vi.fn();
    const onUse = vi.fn();
    render(
      withDnd(<ItemSlot slotIndex={0} item={sword} onDoubleClick={onDoubleClick} onUse={onUse} />),
    );
    fireEvent.doubleClick(screen.getByRole('gridcell'));
    expect(onDoubleClick).toHaveBeenCalledWith(0);
    expect(onUse).toHaveBeenCalledWith(0);
  });

  it('disabled prevents activation and is not a tab stop', () => {
    const onSelect = vi.fn();
    render(withDnd(<ItemSlot slotIndex={0} item={sword} disabled onSelect={onSelect} />));
    const cell = screen.getByRole('gridcell');
    expect(cell).not.toHaveAttribute('tabindex');
    fireEvent.click(cell);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders the quantity overlay only when > 1', () => {
    const { rerender } = render(
      withDnd(<ItemSlot slotIndex={0} item={{ ...sword, quantity: 1 }} />),
    );
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    rerender(withDnd(<ItemSlot slotIndex={0} item={{ ...sword, quantity: 5 }} />));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('sets aria-rowindex/aria-colindex as 1-based from the given row/col', () => {
    render(withDnd(<ItemSlot slotIndex={5} item={sword} rowIndex={1} colIndex={1} />));
    const cell = screen.getByRole('gridcell');
    expect(cell).toHaveAttribute('aria-rowindex', '2');
    expect(cell).toHaveAttribute('aria-colindex', '2');
  });

  it('calls onHover with the slotIndex on mouse enter and null on mouse leave', async () => {
    const user = userEvent.setup();
    const onHover = vi.fn();
    render(withDnd(<ItemSlot slotIndex={3} item={sword} onHover={onHover} />));
    const cell = screen.getByRole('gridcell');
    await user.hover(cell);
    expect(onHover).toHaveBeenCalledWith(3);
    await user.unhover(cell);
    expect(onHover).toHaveBeenCalledWith(null);
  });
});
