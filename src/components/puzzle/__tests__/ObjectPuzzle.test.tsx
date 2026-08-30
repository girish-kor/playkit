import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ObjectPuzzle } from '../ObjectPuzzle';
import type { ObjectPuzzleObject, ObjectPuzzleSlot } from '../../../types';

const objects: ObjectPuzzleObject[] = [{ id: 'rock', name: 'Rock' }];
const slots: ObjectPuzzleSlot[] = [
  { id: 'pedestal', label: 'Pedestal', position: { x: 0, y: 0, z: 0 } },
];

describe('ObjectPuzzle', () => {
  it('renders a draggable button per unplaced object and a gridcell per slot', () => {
    render(<ObjectPuzzle objects={objects} slots={slots} />);
    expect(screen.getByRole('button', { name: 'Rock' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'Pedestal' })).toBeInTheDocument();
  });

  it('the Select button calls both onSelect and onObjectSelect', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onObjectSelect = vi.fn();
    render(
      <ObjectPuzzle
        objects={objects}
        slots={slots}
        onSelect={onSelect}
        onObjectSelect={onObjectSelect}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Select' }));
    expect(onSelect).toHaveBeenCalledWith('rock');
    expect(onObjectSelect).toHaveBeenCalledWith('rock');
  });

  it('calls onObjectHover on mouse enter/leave of an object row', async () => {
    const user = userEvent.setup();
    const onObjectHover = vi.fn();
    render(<ObjectPuzzle objects={objects} slots={slots} onObjectHover={onObjectHover} />);
    const row = screen.getByRole('button', { name: 'Rock' }).parentElement!;
    await user.hover(row);
    expect(onObjectHover).toHaveBeenCalledWith('rock');
    await user.unhover(row);
    expect(onObjectHover).toHaveBeenCalledWith(null);
  });
});
