import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MathPuzzle } from '../MathPuzzle';

describe('MathPuzzle', () => {
  it('renders the problem text and a labeled answer input', () => {
    render(<MathPuzzle problem="2 + 2" answer={4} />);
    expect(screen.getByText('2 + 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Answer for: 2 + 2')).toBeInTheDocument();
  });

  it('calls onSubmit with the numeric value, and onSuccess on a correct answer', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onSuccess = vi.fn();
    render(<MathPuzzle problem="2 + 2" answer={4} onSubmit={onSubmit} onSuccess={onSuccess} />);
    await user.type(screen.getByLabelText('Answer for: 2 + 2'), '4');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledWith(4);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('calls onFailure with the attempted value on a wrong answer', async () => {
    const user = userEvent.setup();
    const onFailure = vi.fn();
    render(<MathPuzzle problem="2 + 2" answer={4} onFailure={onFailure} />);
    await user.type(screen.getByLabelText('Answer for: 2 + 2'), '5');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onFailure).toHaveBeenCalledWith(5);
  });

  it('tolerance accepts answers within the allowed margin', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    render(<MathPuzzle problem="pi" answer={3.14} tolerance={0.01} onSuccess={onSuccess} />);
    await user.type(screen.getByLabelText('Answer for: pi'), '3.15');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('accepts an array of acceptable answers', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    render(<MathPuzzle problem="+-2" answer={[2, -2]} onSuccess={onSuccess} />);
    await user.type(screen.getByLabelText('Answer for: +-2'), '-2');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('variant="multi-step" advances to the next problem and calls onStepComplete', async () => {
    const user = userEvent.setup();
    const onStepComplete = vi.fn();
    render(
      <MathPuzzle
        variant="multi-step"
        problems={[
          { problem: 'step1', answer: 1 },
          { problem: 'step2', answer: 2 },
        ]}
        onStepComplete={onStepComplete}
      />,
    );
    await user.type(screen.getByLabelText('Answer for: step1'), '1');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onStepComplete).toHaveBeenCalledWith(0);
    expect(screen.getByText('step2')).toBeInTheDocument();
  });

  it('showKeypad renders numeric buttons that append to the input value', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    render(<MathPuzzle problem="4" answer={44} showKeypad onSuccess={onSuccess} />);
    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('calls onTimeout when timeLimit elapses', () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    render(<MathPuzzle problem="2 + 2" answer={4} timeLimit={1} onTimeout={onTimeout} />);
    vi.advanceTimersByTime(1000);
    expect(onTimeout).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
