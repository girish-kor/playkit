import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="/a.png" alt="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('falls back to initials derived from name when there is no src', () => {
    render(<Avatar alt="Jane Doe" name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('falls back to initials when the image fails to load, and calls onError', () => {
    const onError = vi.fn();
    render(<Avatar src="/broken.png" alt="Jane Doe" name="Jane Doe" onError={onError} />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    act(() => img.dispatchEvent(new Event('error')));
    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders a status indicator when status is not "none"', () => {
    const { container } = render(<Avatar alt="Jane" status="online" />);
    expect(container.querySelector('.bg-green-500')).not.toBeNull();
  });

  it('renders as a real button (not span) and fires onClick when onClick is given', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Avatar alt="Jane" onClick={onClick} />);
    const el = screen.getByRole('button');
    await user.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('uses role="img" with the alt text as the accessible name when not clickable', () => {
    render(<Avatar alt="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });
});
