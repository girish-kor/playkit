import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LoadingDots } from '../LoadingDots';

describe('LoadingDots', () => {
  it('renders role="status" with aria-busy and the default "Loading" label', () => {
    render(<LoadingDots />);
    const el = screen.getByRole('status');
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(el).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders `count` dots (default 3)', () => {
    const { container } = render(<LoadingDots />);
    expect(container.querySelectorAll('.animate-bounce')).toHaveLength(3);
  });

  it('respects a custom count', () => {
    const { container } = render(<LoadingDots count={5} />);
    expect(container.querySelectorAll('.animate-bounce')).toHaveLength(5);
  });

  it('supports a custom label', () => {
    render(<LoadingDots label="Fetching" />);
    expect(screen.getByRole('status', { name: 'Fetching' })).toBeInTheDocument();
  });
});
