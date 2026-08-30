import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DevTools } from '../DevTools';

describe('DevTools', () => {
  it('renders region and tabs when enabled is true', () => {
    render(<DevTools enabled={true} />);
    expect(screen.getByRole('region', { name: 'Developer tools' })).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: 'DevTools tabs' })).toBeInTheDocument();
  });

  it('returns null when enabled is false', () => {
    const { container } = render(<DevTools enabled={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('minimizes and maximizes when minimize button is clicked', async () => {
    const user = userEvent.setup();
    const onMinimize = vi.fn();
    const onMaximize = vi.fn();
    render(<DevTools enabled={true} onMinimize={onMinimize} onMaximize={onMaximize} />);

    const minBtn = screen.getByRole('button', { name: 'Minimize' });
    await user.click(minBtn);
    expect(onMinimize).toHaveBeenCalled();

    const maxBtn = screen.getByRole('button', { name: 'Maximize', hidden: true });
    await user.click(maxBtn);
    expect(onMaximize).toHaveBeenCalled();
  });
});
