import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Palette } from '../Palette';
import type { Prefab } from '../../../types';

const mockPrefabs: Prefab[] = [
  { id: 'p1', name: 'Oak Tree', category: 'Nature' },
  { id: 'p2', name: 'Granite Rock', category: 'Nature' },
  { id: 'p3', name: 'Wooden Chest', category: 'Props' },
];

const mockCategories = ['Nature', 'Props'];

describe('Palette', () => {
  it('renders search input, categories, and prefabs', () => {
    render(
      <Palette
        prefabs={mockPrefabs}
        categories={mockCategories}
        onSelect={() => {}}
        onDragStart={() => {}}
        onSearch={() => {}}
      />,
    );
    expect(screen.getByRole('grid', { name: 'Object palette' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search prefabs' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Oak Tree' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wooden Chest' })).toBeInTheDocument();
  });

  it('filters prefabs when searching', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(
      <Palette
        prefabs={mockPrefabs}
        categories={mockCategories}
        onSelect={() => {}}
        onDragStart={() => {}}
        onSearch={onSearch}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Search prefabs' });
    await user.type(input, 'Tree');
    expect(onSearch).toHaveBeenCalledWith('Tree');
    expect(screen.getByRole('button', { name: 'Oak Tree' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Wooden Chest' })).not.toBeInTheDocument();
  });

  it('calls onSelect when a prefab is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Palette
        prefabs={mockPrefabs}
        categories={mockCategories}
        onSelect={onSelect}
        onDragStart={() => {}}
        onSearch={() => {}}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Oak Tree' }));
    expect(onSelect).toHaveBeenCalledWith(mockPrefabs[0]);
  });
});
