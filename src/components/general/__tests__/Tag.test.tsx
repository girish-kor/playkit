import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tag } from '../Tag';

describe('Tag', () => {
  it('renders tag label correctly in status mode', () => {
    render(<Tag label="New" aria-label="New tag" />);
    const tag = screen.getByRole('status', { name: 'New tag' });
    expect(tag).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders removable button and calls onRemove when clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag label="Filter" removable onRemove={onRemove} aria-label="Filter tag" />);
    const removeBtn = screen.getByRole('button', { name: 'Remove Filter' });
    expect(removeBtn).toBeInTheDocument();
    await user.click(removeBtn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders as button when onClick is provided', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Tag label="Clickable Tag" onClick={onClick} selected={true} />);
    const button = screen.getByRole('button', { name: 'Clickable Tag' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'true');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant and color classes correctly', () => {
    render(<Tag label="Primary Solid" variant="solid" color="primary" aria-label="Tag" />);
    const tag = screen.getByRole('status');
    expect(tag).toHaveClass('bg-blue-600 text-white');
  });

  it('respects disabled prop', () => {
    render(<Tag label="Disabled" disabled onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50 pointer-events-none');
  });
});
