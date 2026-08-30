import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SequencePuzzle } from '../SequencePuzzle';

describe('SequencePuzzle', () => {
  it('plays the sequence on mount, calling onSequenceStart/onStep/onSequenceEnd', () => {
    vi.useFakeTimers();
    const onSequenceStart = vi.fn();
    const onStep = vi.fn();
    const onSequenceEnd = vi.fn();
    render(
      <SequencePuzzle
        sequence={[1, 2]}
        delayBetweenSteps={100}
        onSequenceStart={onSequenceStart}
        onStep={onStep}
        onSequenceEnd={onSequenceEnd}
      />,
    );
    expect(onSequenceStart).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(300));
    expect(onStep).toHaveBeenCalledTimes(2);
    expect(onSequenceEnd).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('ignores input while the sequence is playing', () => {
    vi.useFakeTimers();
    const onInput = vi.fn();
    render(<SequencePuzzle sequence={[1, 2]} onInput={onInput} />);
    screen.getAllByRole('button', { name: /Step/ })[0]!.click();
    expect(onInput).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('a correct full input sequence calls onStepCorrect for each step and onComplete', () => {
    vi.useFakeTimers();
    const onStepCorrect = vi.fn();
    const onComplete = vi.fn();
    render(
      <SequencePuzzle
        sequence={[1, 2]}
        delayBetweenSteps={10}
        onStepCorrect={onStepCorrect}
        onComplete={onComplete}
      />,
    );
    act(() => vi.advanceTimersByTime(50));
    const steps = screen.getAllByRole('button', { name: /Step/ });
    act(() => steps[0]!.click());
    act(() => steps[1]!.click());
    expect(onStepCorrect).toHaveBeenCalledTimes(2);
    expect(onComplete).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('a wrong input calls onStepIncorrect and onFail, resetting progress', () => {
    vi.useFakeTimers();
    const onStepIncorrect = vi.fn();
    const onFail = vi.fn();
    render(
      <SequencePuzzle
        sequence={[1, 2]}
        delayBetweenSteps={10}
        onStepIncorrect={onStepIncorrect}
        onFail={onFail}
      />,
    );
    act(() => vi.advanceTimersByTime(50));
    const steps = screen.getAllByRole('button', { name: /Step/ });
    act(() => steps[1]!.click());
    expect(onStepIncorrect).toHaveBeenCalledWith(2, 0);
    expect(onFail).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('showProgress renders the current/total step count', () => {
    vi.useFakeTimers();
    render(<SequencePuzzle sequence={[1, 2, 3]} delayBetweenSteps={10} />);
    act(() => vi.advanceTimersByTime(50));
    expect(screen.getByText('0 / 3')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('allowReplay renders a Replay button that calls onSequenceRepeat', async () => {
    vi.useFakeTimers();
    const onSequenceRepeat = vi.fn();
    render(
      <SequencePuzzle
        sequence={[1]}
        delayBetweenSteps={10}
        allowReplay
        onSequenceRepeat={onSequenceRepeat}
      />,
    );
    act(() => vi.advanceTimersByTime(30));
    act(() => screen.getByRole('button', { name: 'Replay' }).click());
    expect(onSequenceRepeat).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('Reset clears the entered sequence and calls onReset', () => {
    vi.useFakeTimers();
    const onReset = vi.fn();
    render(<SequencePuzzle sequence={[1]} delayBetweenSteps={10} onReset={onReset} />);
    act(() => screen.getByRole('button', { name: 'Reset' }).click());
    expect(onReset).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
