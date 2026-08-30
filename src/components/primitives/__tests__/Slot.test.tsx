import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Slot } from '../Slot';

describe('Slot', () => {
  it('renders no element of its own, merging props onto the single child', () => {
    render(
      <Slot data-testid="slot" className="extra">
        <button type="button" className="base">
          click
        </button>
      </Slot>,
    );
    const el = screen.getByTestId('slot');
    expect(el.tagName).toBe('BUTTON');
    expect(el.className).toContain('base');
    expect(el.className).toContain('extra');
  });

  it('mergeProps: false clones the child with only the ref, leaving its own props untouched', () => {
    render(
      <Slot mergeProps={false} data-testid="ignored-on-child">
        <button type="button" data-testid="child">
          click
        </button>
      </Slot>,
    );
    // mergeProps:false only clones a `ref`; other Slot props are not spread onto the child.
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('ignored-on-child')).not.toBeInTheDocument();
  });

  it('is a documented no-op when pcEntity does not resolve (no throw)', () => {
    expect(() =>
      render(
        <Slot pcEntity="missing">
          <button type="button">click</button>
        </Slot>,
      ),
    ).not.toThrow();
  });
});
