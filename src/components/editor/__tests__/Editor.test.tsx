import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Editor } from '../Editor';
import type { Prefab } from '../../../types';

const mockPalette: Prefab[] = [
  { id: '1', name: 'Tree', category: 'Nature' },
  { id: '2', name: 'Rock', category: 'Nature' },
];

describe('Editor', () => {
  it('renders toolbar with default aria-label', () => {
    render(<Editor palette={mockPalette} onPlace={() => {}} onDelete={() => {}} onTransform={() => {}} />);
    expect(screen.getByRole('toolbar', { name: 'Editor tools' })).toBeInTheDocument();
  });

  it('calls onToolChange when a tool button is clicked', async () => {
    const user = userEvent.setup();
    const onToolChange = vi.fn();
    render(
      <Editor
        palette={mockPalette}
        onPlace={() => {}}
        onDelete={() => {}}
        onTransform={() => {}}
        onToolChange={onToolChange}
      />,
    );

    const moveBtn = screen.getByRole('button', { name: 'Move' });
    await user.click(moveBtn);
    expect(onToolChange).toHaveBeenCalledWith('move');
  });

  it('calls onUndo and onRedo when undo/redo buttons are clicked', async () => {
    const user = userEvent.setup();
    const onUndo = vi.fn();
    const onRedo = vi.fn();
    render(
      <Editor
        palette={mockPalette}
        onPlace={() => {}}
        onDelete={() => {}}
        onTransform={() => {}}
        onUndo={onUndo}
        onRedo={onRedo}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onUndo).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Redo' }));
    expect(onRedo).toHaveBeenCalled();
  });
});
