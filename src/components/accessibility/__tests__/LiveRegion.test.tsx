import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LiveRegion } from '../LiveRegion';

describe('LiveRegion', () => {
  it('renders children with aria-live attributes', () => {
    const { container } = render(
      <LiveRegion priority="assertive" debounce={0}>
        Initial content
      </LiveRegion>,
    );
    const region = container.firstChild as HTMLElement;
    expect(region).toHaveAttribute('aria-live', 'assertive');
    expect(region).toHaveAttribute('aria-atomic', 'true');
    expect(screen.getByText('Initial content')).toBeInTheDocument();
  });
});
