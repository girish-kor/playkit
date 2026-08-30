import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Grid } from '../Grid';

describe('Grid', () => {
  it('defaults to role="none" (layout-only) when not explicitly interactive', () => {
    render(<Grid data-testid="grid" />);
    expect(screen.getByTestId('grid')).toHaveAttribute('role', 'none');
  });

  it('supports the documented role transition to "grid" when made interactive', () => {
    render(<Grid data-testid="grid" role="grid" />);
    expect(screen.getByTestId('grid')).toHaveAttribute('role', 'grid');
  });

  it('maps cols/rows/gap to Tailwind grid utility classes', () => {
    render(<Grid data-testid="grid" cols={3} rows={2} gap={4} />);
    const cls = screen.getByTestId('grid').className;
    expect(cls).toContain('grid-cols-3');
    expect(cls).toContain('grid-rows-2');
    expect(cls).toContain('gap-4');
  });

  it('colSpan/rowSpan support the "full" keyword alongside numeric spans', () => {
    render(<Grid data-testid="grid" colSpan="full" rowSpan={2} />);
    const cls = screen.getByTestId('grid').className;
    expect(cls).toContain('col-span-full');
    expect(cls).toContain('row-span-2');
  });
});
