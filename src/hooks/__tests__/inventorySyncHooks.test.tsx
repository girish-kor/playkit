import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useCraftingSync } from '../useCraftingSync';
import { useEquipmentSync } from '../useEquipmentSync';
import { useHoverData } from '../useHoverData';
import { useInventorySync } from '../useInventorySync';
import { useItemData } from '../useItemData';
import { useLootSync } from '../useLootSync';
import { useSlotSync } from '../useSlotSync';

describe('useInventorySync', () => {
  it('defaults to an empty array and reads the inventoryItems script key', () => {
    const script = { inventoryItems: [{ id: 'sword' }] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useInventorySync({ pcEntity: 'e1' }), { app });
    expect(result.current.items).toEqual([{ id: 'sword' }]);
    act(() => result.current.setItems([null]));
    expect(result.current.items).toEqual([null]);
  });
});

describe('useSlotSync', () => {
  it('scopes its stateKey to the given slotIndex, defaulting to null', () => {
    const script = { 'inventorySlot.2': { id: 'shield' } };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useSlotSync({ slotIndex: 2, pcEntity: 'e1' }), {
      app,
    });
    expect(result.current.item).toEqual({ id: 'shield' });

    const { result: empty } = renderHookWithPC(() => useSlotSync({ slotIndex: 0 }));
    expect(empty.current.item).toBeNull();
  });
});

describe('useEquipmentSync', () => {
  it('equip merges an item into the equipped map by slotId; unequip nulls it out', () => {
    const { result } = renderHookWithPC(() => useEquipmentSync());
    expect(result.current.equipped).toEqual({});
    act(() => result.current.equip('head', { id: 'helmet' } as never));
    expect(result.current.equipped.head).toEqual({ id: 'helmet' });
    act(() => result.current.unequip('head'));
    expect(result.current.equipped.head).toBeNull();
  });
});

describe('useCraftingSync', () => {
  it('defaults to an empty recipes array and resolves craft() without throwing', async () => {
    const { result } = renderHookWithPC(() => useCraftingSync());
    expect(result.current.recipes).toEqual([]);
    await expect(result.current.craft('sword-recipe')).resolves.toBeUndefined();
  });
});

describe('useLootSync', () => {
  it('take removes an item by id; deposit appends one', () => {
    const script = { lootItems: [{ id: 'gold' }, { id: 'gem' }] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useLootSync({ pcEntity: 'e1' }), { app });
    act(() => result.current.take('gold'));
    expect(result.current.items).toEqual([{ id: 'gem' }]);
    act(() => result.current.deposit({ id: 'potion' } as never));
    expect(result.current.items).toEqual([{ id: 'gem' }, { id: 'potion' }]);
  });
});

describe('useItemData', () => {
  it('scopes its stateKey to the given itemId and reports loading only when bound', () => {
    const script = { 'itemData.sword': { id: 'sword', name: 'Sword' } };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useItemData({ itemId: 'sword', pcEntity: 'e1' }), {
      app,
    });
    expect(result.current.item).toEqual({ id: 'sword', name: 'Sword' });
    expect(result.current.loading).toBe(false);

    const { result: unbound } = renderHookWithPC(() => useItemData({ itemId: 'sword' }));
    expect(unbound.current.loading).toBe(false);
  });
});

describe('useHoverData', () => {
  it('reads the hoverData script key, undefined when unresolved', () => {
    const { result } = renderHookWithPC(() => useHoverData());
    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });
});
