import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  it('forwards the value to every callback ref', () => {
    const a = vi.fn();
    const b = vi.fn();
    const merged = mergeRefs(a, b);
    const node = {} as HTMLElement;
    merged(node);
    expect(a).toHaveBeenCalledWith(node);
    expect(b).toHaveBeenCalledWith(node);
  });

  it('sets .current on object refs', () => {
    const objRef = React.createRef<HTMLElement>();
    const node = {} as HTMLElement;
    mergeRefs(objRef)(node);
    expect(objRef.current).toBe(node);
  });

  it('skips undefined/null refs without throwing', () => {
    const node = {} as HTMLElement;
    expect(() =>
      mergeRefs(undefined, null as unknown as React.Ref<HTMLElement>)(node),
    ).not.toThrow();
  });
});
