import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { PatternLock } from '../PatternLock';

describe('PatternLock', () => {
  it('renders role="application" with sr-only instructions describing both interaction modes', () => {
    render(<PatternLock correctPattern={[0, 1, 2]} />);
    const app = screen.getByRole('application');
    expect(app).toHaveAttribute('aria-describedby');
    expect(screen.getByText(/dragging across dots/)).toBeInTheDocument();
  });

  it('renders gridSize x gridSize dots, each labeled by position', () => {
    render(<PatternLock gridSize={3} correctPattern={[0, 1, 2]} />);
    expect(screen.getAllByRole('button', { name: /^Dot \d/ })).toHaveLength(9);
  });

  it('keyboard mode: clicking dots in order builds the pattern and calls onDotConnect', async () => {
    const user = userEvent.setup();
    const onDotConnect = vi.fn();
    render(
      <PatternLock
        gridSize={2}
        correctPattern={[0, 1, 3]}
        minLength={2}
        onDotConnect={onDotConnect}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Switch to keyboard mode' }));
    await user.click(screen.getByRole('button', { name: 'Dot 1' }));
    expect(onDotConnect).toHaveBeenCalledWith(0);
    expect(screen.getByRole('button', { name: 'Dot 1, connected' })).toBeInTheDocument();
  });

  it('Confirm pattern calls onPatternComplete, then onSuccess for a correct pattern', async () => {
    const user = userEvent.setup();
    const onPatternComplete = vi.fn();
    const onSuccess = vi.fn();
    render(
      <PatternLock
        gridSize={2}
        correctPattern={[0, 1]}
        minLength={2}
        onPatternComplete={onPatternComplete}
        onSuccess={onSuccess}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Switch to keyboard mode' }));
    await user.click(screen.getByRole('button', { name: 'Dot 1' }));
    await user.click(screen.getByRole('button', { name: 'Dot 2' }));
    await user.click(screen.getByRole('button', { name: 'Confirm pattern' }));
    expect(onPatternComplete).toHaveBeenCalledWith([0, 1]);
    await vi.waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });

  it('calls onFailure for a wrong pattern, and onLockout once maxAttempts is reached', async () => {
    const user = userEvent.setup();
    const onFailure = vi.fn();
    const onLockout = vi.fn();
    render(
      <PatternLock
        gridSize={2}
        correctPattern={[3, 2]}
        minLength={2}
        maxAttempts={1}
        onFailure={onFailure}
        onLockout={onLockout}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Switch to keyboard mode' }));
    await user.click(screen.getByRole('button', { name: 'Dot 1' }));
    await user.click(screen.getByRole('button', { name: 'Dot 2' }));
    await user.click(screen.getByRole('button', { name: 'Confirm pattern' }));
    await vi.waitFor(() => expect(onFailure).toHaveBeenCalledWith([0, 1]));
    expect(onLockout).toHaveBeenCalledWith(30);
  });

  it('a pattern shorter than minLength is not submitted for validation', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const onFailure = vi.fn();
    render(
      <PatternLock
        gridSize={2}
        correctPattern={[0]}
        minLength={2}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Switch to keyboard mode' }));
    await user.click(screen.getByRole('button', { name: 'Dot 1' }));
    await user.click(screen.getByRole('button', { name: 'Confirm pattern' }));
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('clicking an already-connected dot does not add it again', async () => {
    const user = userEvent.setup();
    const onDotConnect = vi.fn();
    render(<PatternLock gridSize={2} correctPattern={[0]} onDotConnect={onDotConnect} />);
    await user.click(screen.getByRole('button', { name: 'Switch to keyboard mode' }));
    await user.click(screen.getByRole('button', { name: 'Dot 1' }));
    await user.click(screen.getByRole('button', { name: 'Dot 1, connected' }));
    expect(onDotConnect).toHaveBeenCalledTimes(1);
  });
});
