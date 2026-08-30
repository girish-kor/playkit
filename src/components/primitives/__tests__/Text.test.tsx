import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from '../Text';

describe('Text', () => {
  it('renders as a span by default with base size / normal weight', () => {
    render(<Text data-testid="text">hello</Text>);
    const el = screen.getByTestId('text');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('text-base');
    expect(el.className).toContain('font-normal');
  });

  it('maps size/weight/align/transform props to Tailwind classes', () => {
    render(
      <Text data-testid="text" size="lg" weight="bold" align="center" transform="uppercase">
        hi
      </Text>,
    );
    const cls = screen.getByTestId('text').className;
    expect(cls).toContain('text-lg');
    expect(cls).toContain('font-bold');
    expect(cls).toContain('text-center');
    expect(cls).toContain('uppercase');
  });

  it('selectable defaults to true; false applies select-none', () => {
    render(
      <Text data-testid="text" selectable={false}>
        hi
      </Text>,
    );
    expect(screen.getByTestId('text').className).toContain('select-none');
  });

  it('renders raw HTML via dangerouslySetInnerHTML, bypassing children', () => {
    render(<Text data-testid="text" dangerouslySetInnerHTML={{ __html: '<b>bold</b>' }} />);
    expect(screen.getByTestId('text').innerHTML).toBe('<b>bold</b>');
  });

  it('applies lineHeight via inline style, taking precedence over the leading prop', () => {
    render(
      <Text data-testid="text" leading="tight" lineHeight={2}>
        hi
      </Text>,
    );
    expect(screen.getByTestId('text').style.lineHeight).toBe('2');
  });

  it('as="label" renders a real <label> element (used by the Label primitive)', () => {
    render(
      <Text as="label" htmlFor="field" data-testid="text">
        Name
      </Text>,
    );
    const el = screen.getByTestId('text');
    expect(el.tagName).toBe('LABEL');
    expect(el).toHaveAttribute('for', 'field');
  });
});
