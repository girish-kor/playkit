import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ItemTip, renderStatRows } from '../ItemTip';
import type { Item } from '../../../types';

const sword: Item = {
  id: 'sword',
  name: 'Sword',
  description: 'A sharp blade',
  data: { damage: 10, weight: 3 },
};

describe('renderStatRows', () => {
  it('extracts only numeric fields from item.data', () => {
    expect(renderStatRows({ damage: 10, name: 'ignored', weight: 3 })).toEqual([
      { key: 'damage', value: 10 },
      { key: 'weight', value: 3 },
    ]);
  });

  it('returns an empty array for undefined/non-object data', () => {
    expect(renderStatRows(undefined)).toEqual([]);
  });
});

describe('ItemTip', () => {
  it('opens on hover, showing the item name/description/stats', async () => {
    const user = userEvent.setup();
    render(
      <ItemTip item={sword}>
        <button type="button">Sword</button>
      </ItemTip>,
    );
    await user.hover(screen.getByText('Sword'));
    await waitFor(() => expect(screen.getByText('A sharp blade')).toBeInTheDocument());
    expect(screen.getByText('damage')).toBeInTheDocument();
  });

  it('variant="compact" omits description and stats', async () => {
    const user = userEvent.setup();
    render(
      <ItemTip item={sword} variant="compact" delay={0}>
        <button type="button">Sword</button>
      </ItemTip>,
    );
    await user.hover(screen.getByText('Sword'));
    await waitFor(() => expect(screen.getAllByText('Sword').length).toBeGreaterThan(0));
    expect(screen.queryByText('A sharp blade')).not.toBeInTheDocument();
  });

  it('calls onOpen/onToggle when it opens', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onToggle = vi.fn();
    render(
      <ItemTip item={sword} delay={0} onOpen={onOpen} onToggle={onToggle}>
        <button type="button">Sword</button>
      </ItemTip>,
    );
    await user.hover(screen.getByText('Sword'));
    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('controlled isOpen keeps the tip open regardless of hover state', () => {
    render(
      <ItemTip item={sword} isOpen>
        <button type="button">Sword</button>
      </ItemTip>,
    );
    expect(screen.getByText('A sharp blade')).toBeInTheDocument();
  });

  it('pinnable double-click pins the tip open and calls onPin', async () => {
    const user = userEvent.setup();
    const onPin = vi.fn();
    render(
      <ItemTip item={sword} pinnable onPin={onPin} delay={0}>
        <button type="button">Sword</button>
      </ItemTip>,
    );
    await user.dblClick(screen.getByText('Sword'));
    expect(onPin).toHaveBeenCalledWith(true);
  });
});
