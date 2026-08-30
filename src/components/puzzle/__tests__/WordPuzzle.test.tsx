import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { WordPuzzle } from '../WordPuzzle';

describe('WordPuzzle', () => {
  it('anagram mode renders letter buttons and accumulates a guess', async () => {
    const user = userEvent.setup();
    render(
      <WordPuzzle
        mode="anagram"
        letters={['c', 'a', 't']}
        targetWords={['cat']}
        shuffleLetters={false}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'C' }));
    await user.click(screen.getByRole('button', { name: 'A' }));
    await user.click(screen.getByRole('button', { name: 'T' }));
    expect(screen.getByText('cat')).toBeInTheDocument();
  });

  it('calls onWordFound and onComplete when the correct word is submitted (all targets found)', async () => {
    const user = userEvent.setup();
    const onWordFound = vi.fn();
    const onComplete = vi.fn();
    render(
      <WordPuzzle
        mode="anagram"
        letters={['c', 'a', 't']}
        targetWords={['cat']}
        shuffleLetters={false}
        onWordFound={onWordFound}
        onComplete={onComplete}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'C' }));
    await user.click(screen.getByRole('button', { name: 'A' }));
    await user.click(screen.getByRole('button', { name: 'T' }));
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onWordFound).toHaveBeenCalledWith('cat');
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('calls onInvalidWord for a word not in targetWords', async () => {
    const user = userEvent.setup();
    const onInvalidWord = vi.fn();
    render(
      <WordPuzzle
        mode="anagram"
        letters={['x', 'y', 'z']}
        targetWords={['cat']}
        shuffleLetters={false}
        onInvalidWord={onInvalidWord}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'X' }));
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onInvalidWord).toHaveBeenCalledWith('x');
  });

  it('Clear resets the anagram input', async () => {
    const user = userEvent.setup();
    render(<WordPuzzle mode="anagram" letters={['c', 'a', 't']} shuffleLetters={false} />);
    await user.click(screen.getByRole('button', { name: 'C' }));
    expect(screen.getByText('c')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.queryByText('c')).not.toBeInTheDocument();
  });

  it('letter-grid mode renders one labeled button per grid cell and calls onWordSelect on click', async () => {
    const user = userEvent.setup();
    const onWordSelect = vi.fn();
    render(
      <WordPuzzle
        mode="letter-grid"
        grid={[
          ['c', 'a'],
          ['t', 's'],
        ]}
        onWordSelect={onWordSelect}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Row 1, Column 1/ }));
    expect(onWordSelect).toHaveBeenCalledWith([{ row: 0, col: 0 }]);
  });

  it('crossword mode renders the clue list', () => {
    render(
      <WordPuzzle
        mode="crossword"
        grid={[['c', 'a', 't']]}
        clues={[
          { word: 'cat', clue: 'Feline pet', position: { row: 0, col: 0 }, direction: 'across' },
        ]}
      />,
    );
    expect(screen.getByText(/Feline pet/)).toBeInTheDocument();
  });

  it('showFoundWordsList reports the found-vs-total count', () => {
    render(<WordPuzzle mode="anagram" letters={['a']} targetWords={['a', 'b']} />);
    expect(screen.getByText((_, node) => node?.textContent === 'Found 0 / 2')).toBeInTheDocument();
  });
});
