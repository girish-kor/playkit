import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  it('renders default rect variant with animate-pulse', () => {
    render(<Skeleton aria-label="Loading skeleton" />);
    const el = screen.getByLabelText('Loading skeleton');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('animate-pulse');
    expect(el).toHaveClass('rounded-md');
  });

  it('renders text variant with correct class', () => {
    const { container } = render(<Skeleton variant="text" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('rounded h-4 w-full');
  });

  it('renders circle variant with correct class', () => {
    const { container } = render(<Skeleton variant="circle" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('rounded-full');
  });

  it('renders multiple counts when count > 1', () => {
    const { container } = render(<Skeleton count={3} />);
    const pulses = container.querySelectorAll('.animate-pulse');
    expect(pulses).toHaveLength(3);
  });

  it('renders children when passed', () => {
    render(
      <Skeleton>
        <div data-testid="child-content">Content</div>
      </Skeleton>,
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('calls onLoad on mount', () => {
    const onLoad = vi.fn();
    render(<Skeleton onLoad={onLoad} />);
    expect(onLoad).toHaveBeenCalledTimes(1);
  });
});
