import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Choice } from '../Choice';

describe('Choice', () => {
  it('renders role="menuitem" labeled by the choice text', () => {
    render(<Choice choice="Attack" />);
    expect(screen.getByRole('menuitem', { name: 'Attack' })).toBeInTheDocument();
  });

  it('calls onSelect on activation', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Choice choice="Attack" onSelect={onSelect} />);
    await user.click(screen.getByRole('menuitem'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('disabled prevents onSelect from firing', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Choice choice="Attack" disabled onSelect={onSelect} />);
    await user.click(screen.getByRole('menuitem'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('calls onHover/onFocus/onBlur', async () => {
    const user = userEvent.setup();
    const onHover = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Choice choice="Attack" onHover={onHover} onFocus={onFocus} onBlur={onBlur} />);
    const el = screen.getByRole('menuitem');
    await user.hover(el);
    expect(onHover).toHaveBeenCalledTimes(1);
    await user.click(el);
    expect(onFocus).toHaveBeenCalled();
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it('a hotkey activates the choice via a global keydown listener', () => {
    const onSelect = vi.fn();
    render(<Choice choice="Attack" hotkey="a" onSelect={onSelect} />);
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' })));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('selected applies a visual ring indicator', () => {
    render(<Choice choice="Attack" selected />);
    expect(screen.getByRole('menuitem').className).toContain('ring-2');
  });
});
