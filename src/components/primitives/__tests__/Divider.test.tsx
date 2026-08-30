import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from '../Divider';

describe('Divider', () => {
  it('defaults to role="separator" and horizontal orientation', () => {
    render(<Divider />);
    const el = screen.getByRole('separator');
    expect(el).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('supports a vertical orientation', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders a labeled divider with the label text visible', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies the documented border-style classes per variant', () => {
    render(<Divider variant="dashed" />);
    expect(screen.getByRole('separator').className).toContain('border-dashed');
  });
});
