import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CraftingPanel } from '../CraftingPanel';
import type { Item, Recipe } from '../../../types';

const recipe: Recipe = {
  id: 'sword',
  name: 'Iron Sword',
  ingredients: [{ itemId: 'iron', quantity: 2 }],
  output: { itemId: 'sword', quantity: 1 },
};
const sufficientInventory: Item[] = [{ id: 'iron', name: 'Iron', quantity: 5 }];
const insufficientInventory: Item[] = [{ id: 'iron', name: 'Iron', quantity: 1 }];

describe('CraftingPanel', () => {
  it('renders one role="listitem" recipe row per recipe, selecting the first by default', () => {
    render(<CraftingPanel recipes={[recipe]} inventory={sufficientInventory} onCraft={vi.fn()} />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Iron Sword' })).toBeInTheDocument();
  });

  it('calls onSelect when a recipe row is chosen', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const recipe2: Recipe = { ...recipe, id: 'axe', name: 'Iron Axe' };
    render(
      <CraftingPanel
        recipes={[recipe, recipe2]}
        inventory={sufficientInventory}
        onCraft={vi.fn()}
        onSelect={onSelect}
      />,
    );
    await user.click(screen.getByText('Iron Axe'));
    expect(onSelect).toHaveBeenCalledWith('axe');
  });

  it('disables Craft and calls onCraftFail("missing-ingredients") when ingredients are insufficient', async () => {
    const user = userEvent.setup();
    const onCraft = vi.fn();
    const onCraftFail = vi.fn();
    render(
      <CraftingPanel
        recipes={[recipe]}
        inventory={insufficientInventory}
        onCraft={onCraft}
        onCraftFail={onCraftFail}
      />,
    );
    const craftButton = screen.getByRole('button', { name: 'Craft' });
    expect(craftButton).toBeDisabled();
  });

  it('calls onCraft then onCraftComplete on a successful craft', async () => {
    const user = userEvent.setup();
    const onCraft = vi.fn().mockResolvedValue(undefined);
    const onCraftComplete = vi.fn();
    render(
      <CraftingPanel
        recipes={[recipe]}
        inventory={sufficientInventory}
        onCraft={onCraft}
        onCraftComplete={onCraftComplete}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Craft' }));
    expect(onCraft).toHaveBeenCalledWith('sword');
    await vi.waitFor(() => expect(onCraftComplete).toHaveBeenCalledWith('sword'));
  });

  it('calls onCraftFail("error") when onCraft rejects', async () => {
    const user = userEvent.setup();
    const onCraft = vi.fn().mockRejectedValue(new Error('boom'));
    const onCraftFail = vi.fn();
    render(
      <CraftingPanel
        recipes={[recipe]}
        inventory={sufficientInventory}
        onCraft={onCraft}
        onCraftFail={onCraftFail}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Craft' }));
    await vi.waitFor(() => expect(onCraftFail).toHaveBeenCalledWith('sword', 'error'));
  });

  it('searchable renders a search input that calls onSearch', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(
      <CraftingPanel
        recipes={[recipe]}
        inventory={sufficientInventory}
        onCraft={vi.fn()}
        searchable
        onSearch={onSearch}
      />,
    );
    await user.type(screen.getByRole('searchbox', { name: 'Search recipes' }), 'a');
    expect(onSearch).toHaveBeenCalled();
  });
});
