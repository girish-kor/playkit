import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Flex } from '../Flex';

describe('Flex', () => {
  it('applies the documented defaults: row direction, stretch align, start justify', () => {
    render(<Flex data-testid="flex" />);
    const cls = screen.getByTestId('flex').className;
    expect(cls).toContain('flex-row');
    expect(cls).toContain('items-stretch');
    expect(cls).toContain('justify-start');
  });

  it('maps direction/align/justify/gap props to Tailwind utility classes', () => {
    render(<Flex data-testid="flex" direction="col" align="center" justify="between" gap={4} />);
    const cls = screen.getByTestId('flex').className;
    expect(cls).toContain('flex-col');
    expect(cls).toContain('items-center');
    expect(cls).toContain('justify-between');
    expect(cls).toContain('gap-4');
  });

  it('applies flexGrow/flexShrink/flexBasis/order via inline style, not classes', () => {
    render(<Flex data-testid="flex" flexGrow={2} order={1} />);
    const el = screen.getByTestId('flex');
    expect(el.style.flexGrow).toBe('2');
    expect(el.style.order).toBe('1');
  });

  it('wrap: true and wrap: "wrap-reverse" produce distinct classes', () => {
    const { rerender } = render(<Flex data-testid="flex" wrap />);
    expect(screen.getByTestId('flex').className).toContain('flex-wrap');
    rerender(<Flex data-testid="flex" wrap="wrap-reverse" />);
    expect(screen.getByTestId('flex').className).toContain('flex-wrap-reverse');
  });
});
