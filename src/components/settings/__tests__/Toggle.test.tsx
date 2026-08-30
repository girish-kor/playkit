import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Toggle } from '../Toggle';

describe('Toggle', () => {
  it('renders role="switch" reflecting the current value', () => {
    render(<Toggle label="Fullscreen" value={false} onChange={() => {}} />);
    expect(screen.getByRole('switch', { name: 'Fullscreen' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('calls both onChange and the onToggle alias with the flipped value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onToggle = vi.fn();
    render(<Toggle label="Fullscreen" value={false} onChange={onChange} onToggle={onToggle} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('disabled prevents toggling', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Fullscreen" value={false} onChange={onChange} disabled />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders the optional description text', () => {
    render(
      <Toggle label="Fullscreen" value={false} onChange={() => {}} description="Use the whole screen" />,
    );
    expect(screen.getByText('Use the whole screen')).toBeInTheDocument();
  });

  it('variant="button-toggle" renders an On/Off button instead of a switch thumb', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Fullscreen" value={false} onChange={onChange} variant="button-toggle" />);
    const el = screen.getByRole('switch');
    expect(el).toHaveTextContent('Off');
    await user.click(el);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
