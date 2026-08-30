import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FocusTrap } from '../FocusTrap';

describe('FocusTrap', () => {
  it('renders children and traps focus when active', async () => {
    const user = userEvent.setup();
    const onTrap = vi.fn();
    render(
      <FocusTrap active={true} onTrap={onTrap} aria-label="Trap container">
        <button>First</button>
        <button>Second</button>
      </FocusTrap>,
    );
    expect(onTrap).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
  });

  it('calls onDeactivate and onRelease when active changes to false', () => {
    const onDeactivate = vi.fn();
    const onRelease = vi.fn();
    const { rerender } = render(
      <FocusTrap active={true} onDeactivate={onDeactivate} onRelease={onRelease}>
        <button>Item</button>
      </FocusTrap>,
    );

    rerender(
      <FocusTrap active={false} onDeactivate={onDeactivate} onRelease={onRelease}>
        <button>Item</button>
      </FocusTrap>,
    );

    expect(onDeactivate).toHaveBeenCalled();
    expect(onRelease).toHaveBeenCalled();
  });
});
