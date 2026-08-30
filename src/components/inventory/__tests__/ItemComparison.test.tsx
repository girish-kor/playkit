import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ItemComparison } from '../ItemComparison';
import type { Item } from '../../../types';

const sword: Item = { id: 'sword', name: 'Sword', data: { damage: 10 } };
const axe: Item = { id: 'axe', name: 'Axe', data: { damage: 15 } };

describe('ItemComparison', () => {
  it('side-by-side variant shows both item names and their stat values', async () => {
    const user = userEvent.setup();
    render(
      <ItemComparison primary={sword} comparison={axe}>
        <button type="button">Compare</button>
      </ItemComparison>,
    );
    await user.hover(screen.getByText('Compare'));
    await waitFor(() => expect(screen.getByText('Sword')).toBeInTheDocument());
    expect(screen.getByText('Axe')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('diff-only variant shows the primary item and a +/- delta versus the comparison', async () => {
    const user = userEvent.setup();
    render(
      <ItemComparison primary={sword} comparison={axe} variant="diff-only">
        <button type="button">Compare</button>
      </ItemComparison>,
    );
    await user.hover(screen.getByText('Compare'));
    await waitFor(() =>
      expect(screen.getByText((_, node) => node?.textContent === '10 (-5)')).toBeInTheDocument(),
    );
  });

  it('calls onOpen/onClose on hover transitions', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(
      <ItemComparison primary={sword} comparison={axe} onOpen={onOpen}>
        <button type="button">Compare</button>
      </ItemComparison>,
    );
    await user.hover(screen.getByText('Compare'));
    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
  });
});
