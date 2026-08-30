import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Subtitle } from '../Subtitle';

describe('Subtitle', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders role="status" with the speaker name (when shown) and text', () => {
    render(<Subtitle speaker="Narrator" text="Once upon a time" />);
    const el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(screen.getByText('Narrator')).toBeInTheDocument();
    expect(screen.getByText('Once upon a time')).toBeInTheDocument();
  });

  it('showSpeakerName: false hides the speaker name', () => {
    render(<Subtitle speaker="Narrator" text="hi" showSpeakerName={false} />);
    expect(screen.queryByText('Narrator')).not.toBeInTheDocument();
  });

  it('calls onComplete automatically after the estimated reading duration', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<Subtitle text="hi" onComplete={onComplete} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('a longer text takes proportionally longer to auto-complete at the given readingSpeed', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    const longText = Array(50).fill('word').join(' ');
    render(<Subtitle text={longText} readingSpeed={200} onComplete={onComplete} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(onComplete).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(15000 - 1000));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('an explicit duration overrides the estimated one', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<Subtitle text="hi" duration={200} onComplete={onComplete} />);
    act(() => vi.advanceTimersByTime(200));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('autoAdvance: false never auto-completes', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<Subtitle text="hi" autoAdvance={false} onComplete={onComplete} />);
    act(() => vi.advanceTimersByTime(60000));
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('clicking the subtitle calls onSkip', async () => {
    const user = userEvent.setup();
    const onSkip = vi.fn();
    render(<Subtitle text="hi" autoAdvance={false} onSkip={onSkip} />);
    await user.click(screen.getByRole('status'));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
