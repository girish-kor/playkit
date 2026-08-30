import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SliderPuzzle } from '../SliderPuzzle';

describe('SliderPuzzle', () => {
  it('renders role="grid" with aria-rowcount/aria-colcount matching size', () => {
    render(<SliderPuzzle size={3} tiles={[1, 2, 0, 3, 4, 5, 6, 7, 8]} />);
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-rowcount', '3');
    expect(grid).toHaveAttribute('aria-colcount', '3');
  });

  it('labels the empty tile "Empty" and disables it', () => {
    render(<SliderPuzzle size={3} tiles={[1, 2, 0, 3, 4, 5, 6, 7, 8]} />);
    expect(screen.getByRole('gridcell', { name: 'Empty' })).toBeDisabled();
  });

  it('clicking a tile adjacent to the empty slot swaps them and calls onTileMove/onMovesChange', () => {
    const onTileMove = vi.fn();
    const onMovesChange = vi.fn();
    render(
      <SliderPuzzle
        size={3}
        tiles={[1, 2, 0, 3, 4, 5, 6, 7, 8]}
        onTileMove={onTileMove}
        onMovesChange={onMovesChange}
      />,
    );
    act(() => screen.getByRole('gridcell', { name: 'Tile 2' }).click());
    expect(onTileMove).toHaveBeenCalledWith(1, 2);
    expect(onMovesChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole('gridcell', { name: 'Empty' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'Tile 2' })).toBeInTheDocument();
  });

  it('clicking a non-adjacent tile does nothing', () => {
    const onTileMove = vi.fn();
    render(<SliderPuzzle size={3} tiles={[1, 2, 3, 4, 5, 6, 7, 8, 0]} onTileMove={onTileMove} />);
    act(() => screen.getByRole('gridcell', { name: 'Tile 1' }).click());
    expect(onTileMove).not.toHaveBeenCalled();
  });

  it('calls onSolve/onSolved once the tiles reach the solved order', () => {
    const onSolve = vi.fn();
    const onSolved = vi.fn();
    // One swap away from the solved order [0,1,2,...]: swapping Tile 1 back into the
    // empty slot at index 1 restores the solved order.
    render(
      <SliderPuzzle
        size={3}
        tiles={[1, 0, 2, 3, 4, 5, 6, 7, 8]}
        onSolve={onSolve}
        onSolved={onSolved}
      />,
    );
    act(() => screen.getByRole('gridcell', { name: 'Tile 1' }).click());
    expect(onSolve).toHaveBeenCalledTimes(1);
    expect(onSolved).toHaveBeenCalledTimes(1);
  });

  it('Shuffle calls onShuffle and resets the move counter', () => {
    const onShuffle = vi.fn();
    render(<SliderPuzzle size={3} tiles={[1, 2, 0, 3, 4, 5, 6, 7, 8]} onShuffle={onShuffle} />);
    act(() => screen.getByRole('gridcell', { name: 'Tile 2' }).click());
    expect(screen.getByText((_, node) => node?.textContent === 'Moves: 1')).toBeInTheDocument();
    act(() => screen.getByRole('button', { name: 'Shuffle' }).click());
    expect(onShuffle).toHaveBeenCalledTimes(1);
    expect(screen.getByText((_, node) => node?.textContent === 'Moves: 0')).toBeInTheDocument();
  });

  it('showMoves: false hides the move counter', () => {
    render(<SliderPuzzle size={3} tiles={[1, 2, 0, 3, 4, 5, 6, 7, 8]} showMoves={false} />);
    expect(screen.queryByText(/Moves:/)).not.toBeInTheDocument();
  });
});
