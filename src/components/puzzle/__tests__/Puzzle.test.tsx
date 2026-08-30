import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Puzzle, usePuzzleContext } from '../Puzzle';

function AttemptButton(): React.JSX.Element {
  const ctx = usePuzzleContext<string>();
  return (
    <button type="button" onClick={() => ctx?.attempt('guess')}>
      Try
    </button>
  );
}

describe('Puzzle', () => {
  it('renders role="region" with a default aria-label derived from puzzleId', () => {
    render(
      <Puzzle puzzleId="lock1" type="code">
        content
      </Puzzle>,
    );
    expect(screen.getByRole('region', { name: 'lock1 puzzle' })).toBeInTheDocument();
  });

  it('calls onSolve and onComplete when the attempt matches the solution', async () => {
    const onSolve = vi.fn();
    const onComplete = vi.fn();
    render(
      <Puzzle
        puzzleId="lock1"
        type="code"
        solution="guess"
        onSolve={onSolve}
        onComplete={onComplete}
      >
        <AttemptButton />
      </Puzzle>,
    );
    await act(async () => {
      screen.getByRole('button').click();
    });
    expect(onSolve).toHaveBeenCalledWith('guess');
    expect(onComplete).toHaveBeenCalledWith('guess');
  });

  it('calls onAttemptFail on a wrong attempt, and onFail once maxAttempts is reached', async () => {
    const onAttemptFail = vi.fn();
    const onFail = vi.fn();
    render(
      <Puzzle
        puzzleId="lock1"
        type="code"
        solution="right"
        maxAttempts={2}
        onAttemptFail={onAttemptFail}
        onFail={onFail}
      >
        <AttemptButton />
      </Puzzle>,
    );
    const button = screen.getByRole('button');
    await act(async () => button.click());
    expect(onAttemptFail).toHaveBeenCalledTimes(1);
    expect(onFail).not.toHaveBeenCalled();
    await act(async () => button.click());
    expect(onFail).toHaveBeenCalledTimes(1);
  });

  it('supports an async validateSolution', async () => {
    const onSolve = vi.fn();
    const validateSolution = vi.fn().mockResolvedValue(true);
    render(
      <Puzzle
        puzzleId="lock1"
        type="code"
        solution="x"
        validateSolution={validateSolution}
        onSolve={onSolve}
      >
        <AttemptButton />
      </Puzzle>,
    );
    await act(async () => screen.getByRole('button').click());
    expect(validateSolution).toHaveBeenCalledWith('guess', 'x');
    expect(onSolve).toHaveBeenCalledWith('guess');
  });

  it('calls onError instead of throwing when validateSolution rejects', async () => {
    const onError = vi.fn();
    const validateSolution = vi.fn().mockRejectedValue(new Error('boom'));
    render(
      <Puzzle
        puzzleId="lock1"
        type="code"
        solution="x"
        validateSolution={validateSolution}
        onError={onError}
      >
        <AttemptButton />
      </Puzzle>,
    );
    await act(async () => screen.getByRole('button').click());
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('calls onTimeout/onTimeExpire when timeLimit elapses', () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    render(
      <Puzzle puzzleId="lock1" type="code" timeLimit={1} onTimeout={onTimeout}>
        content
      </Puzzle>,
    );
    act(() => vi.advanceTimersByTime(1000));
    expect(onTimeout).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
