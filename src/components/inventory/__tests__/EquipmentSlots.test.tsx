import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EquipmentSlots } from '../EquipmentSlots';
import type { Item } from '../../../types';

const helmet: Item = { id: 'helmet', name: 'Iron Helmet' };

describe('EquipmentSlots', () => {
  it('renders role="grid" by default with one labeled ItemSlot per equipment slot', () => {
    render(
      <EquipmentSlots
        slots={[
          { id: 'head', label: 'Head', slotType: 'armor', item: helmet },
          { id: 'chest', label: 'Chest', slotType: 'armor' },
        ]}
      />,
    );
    expect(screen.getByRole('grid', { name: 'Equipment' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'Head: Iron Helmet' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'Chest, empty' })).toBeInTheDocument();
  });

  it('layout="list" renders role="list" instead of role="grid"', () => {
    render(
      <EquipmentSlots layout="list" slots={[{ id: 'head', label: 'Head', slotType: 'armor' }]} />,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('shows a placeholder icon for empty slots by default', () => {
    const { container } = render(
      <EquipmentSlots slots={[{ id: 'head', label: 'Head', slotType: 'armor' }]} />,
    );
    expect(container.querySelector('.text-gray-600')).not.toBeNull();
  });

  it('showEmptySlotIcon: false suppresses the placeholder icon', () => {
    const { container } = render(
      <EquipmentSlots
        showEmptySlotIcon={false}
        slots={[{ id: 'head', label: 'Head', slotType: 'armor' }]}
      />,
    );
    expect(container.querySelector('.text-gray-600')).toBeNull();
  });
});
