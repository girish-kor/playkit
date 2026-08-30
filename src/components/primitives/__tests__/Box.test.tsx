import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createMockApp, createMockEntity } from '../../../test/pcMocks';
import { pcWrapper } from '../../../test/renderWithPC';
import { Box } from '../Box';

describe('Box', () => {
  it('renders as a div by default, forwarding data-testid and className', () => {
    render(<Box data-testid="box">content</Box>);
    const el = screen.getByTestId('box');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveTextContent('content');
  });

  it('respects the `as` prop to render a different element', () => {
    render(<Box as="section" data-testid="box" />);
    expect(screen.getByTestId('box').tagName).toBe('SECTION');
  });

  it('applies the documented default variant classes (solid)', () => {
    render(<Box data-testid="box" />);
    expect(screen.getByTestId('box').className).toContain('bg-gray-800');
  });

  it('applies variant-specific classes for outline/ghost/transparent', () => {
    render(<Box data-testid="box" variant="transparent" />);
    expect(screen.getByTestId('box').className).toContain('bg-transparent');
  });

  it('asChild renders Slot, merging props onto the single child instead of wrapping it', () => {
    render(
      <Box asChild data-testid="box">
        <button type="button">click me</button>
      </Box>,
    );
    const el = screen.getByTestId('box');
    expect(el.tagName).toBe('BUTTON');
  });

  it('is a documented no-op (renders normally) when pcEntity does not resolve to a live entity', () => {
    expect(() => render(<Box pcEntity="missing" data-testid="box" />)).not.toThrow();
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('applies a transform style derived from the entity when syncTransform is set and the entity resolves', () => {
    const entity = createMockEntity({ guid: 'e1', position: { x: 10, y: 20, z: 0 } });
    const app = createMockApp({ entities: { e1: entity } });
    render(<Box pcEntity="e1" syncTransform data-testid="box" />, { wrapper: pcWrapper({ app }) });
    const el = screen.getByTestId('box');
    expect(el.style.transform).toContain('translate3d(10px, 20px, 0px)');
  });

  it('forwards standard DOM event handlers (onClick)', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    let clicked = false;
    render(<Box data-testid="box" onClick={() => (clicked = true)} />);
    await user.click(screen.getByTestId('box'));
    expect(clicked).toBe(true);
  });

  it('forwards aria-* and role passthrough', () => {
    render(<Box data-testid="box" role="region" aria-label="panel" />);
    const el = screen.getByTestId('box');
    expect(el).toHaveAttribute('role', 'region');
    expect(el).toHaveAttribute('aria-label', 'panel');
  });
});
