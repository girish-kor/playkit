import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Responsive } from '../Responsive';

describe('Responsive', () => {
  it('renders children and provides region container', () => {
    const onMount = vi.fn();
    const onResize = vi.fn();

    render(
      <Responsive onMount={onMount} onResize={onResize} aria-label="Responsive layout">
        <div>Responsive Content</div>
      </Responsive>,
    );

    expect(screen.getByRole('region', { name: 'Responsive layout' })).toBeInTheDocument();
    expect(screen.getByText('Responsive Content')).toBeInTheDocument();
    expect(onMount).toHaveBeenCalled();
  });

  it('supports render function children with breakpoint and orientation', () => {
    render(
      <Responsive>
        {({ breakpoint, orientation }) => (
          <div data-testid="info">
            {breakpoint} - {orientation}
          </div>
        )}
      </Responsive>,
    );

    expect(screen.getByTestId('info')).toBeInTheDocument();
  });
});
