import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useLatest } from '../useLatest';

describe('useLatest', () => {
  it('does not mutate .current during the render that changed the value (write happens in an effect)', () => {
    const { result, rerender } = renderHook(({ value }) => useLatest(value), {
      initialProps: { value: 'a' },
    });
    expect(result.current.current).toBe('a');
    rerender({ value: 'b' });
    expect(result.current.current).toBe('b');
  });
});
