import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Dialogue } from '../Dialogue';

/**
 * useTypewriter reveals one character per setTimeout, and each timeout is only
 * scheduled once the previous render has committed -- so advancing fake timers by
 * the full duration in a single call doesn't cascade through every character.
 * Advance once per character instead.
 */
function revealChars(count: number, msPerChar: number) {
  for (let i = 0; i < count; i++) {
    act(() => vi.advanceTimersByTime(msPerChar));
  }
}

describe('Dialogue', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reveals text via the typewriter effect, calling onTypingStart/onTextStart on mount', () => {
    vi.useFakeTimers();
    const onTypingStart = vi.fn();
    render(<Dialogue text="hi" typingSpeed={10} onTypingStart={onTypingStart} />);
    expect(onTypingStart).toHaveBeenCalledTimes(1);
    revealChars(2, 100);
    expect(screen.getByRole('dialog')).toHaveTextContent('hi');
  });

  it('calls onComplete/onTypingEnd/onTextEnd once typing finishes', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<Dialogue text="hi" typingSpeed={100} onComplete={onComplete} />);
    revealChars(2, 10);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('Skip immediately reveals the full text and calls onSkip', () => {
    vi.useFakeTimers();
    const onSkip = vi.fn();
    render(<Dialogue text="hello world" typingSpeed={1} onSkip={onSkip} />);
    act(() => fireEvent.click(screen.getByRole('button', { name: 'Skip' })));
    expect(onSkip).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog')).toHaveTextContent('hello world');
  });

  it('renders speaker name and avatar when given', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Dialogue text="hi" speaker={{ name: 'Narrator', avatar: '/n.png' }} />,
    );
    expect(screen.getByText('Narrator')).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute('src', '/n.png');
  });

  it('renders choices once typing completes, calling onChoice/onChoiceSelect on selection', () => {
    vi.useFakeTimers();
    const onChoice = vi.fn();
    const onChoiceSelect = vi.fn();
    render(
      <Dialogue
        text="hi"
        typingSpeed={1000}
        choices={[{ id: 'yes', text: 'Yes' }]}
        onChoice={onChoice}
        onChoiceSelect={onChoiceSelect}
      />,
    );
    revealChars(2, 1);
    act(() => fireEvent.click(screen.getByRole('menuitem', { name: 'Yes' })));
    expect(onChoice).toHaveBeenCalledWith('Yes');
    expect(onChoiceSelect).toHaveBeenCalledWith({ id: 'yes', text: 'Yes' });
  });

  it('autoAdvance calls onAdvance after autoAdvanceDelay once complete', () => {
    vi.useFakeTimers();
    const onAdvance = vi.fn();
    render(
      <Dialogue
        text="hi"
        typingSpeed={1000}
        autoAdvance
        autoAdvanceDelay={500}
        onAdvance={onAdvance}
      />,
    );
    revealChars(2, 1);
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(500));
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  it('Escape calls onSkip', () => {
    vi.useFakeTimers();
    const onSkip = vi.fn();
    render(<Dialogue text="hi" onSkip={onSkip} />);
    act(() =>
      screen
        .getByRole('dialog')
        .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })),
    );
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('supports role="alertdialog"', () => {
    vi.useFakeTimers();
    render(<Dialogue text="hi" role="alertdialog" />);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });
});
