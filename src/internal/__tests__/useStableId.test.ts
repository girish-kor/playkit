import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useStableId } from '../useStableId';

describe('useStableId', () => {
  it('prefixes the id and stays stable across re-renders', () => {
    const { result, rerender } = renderHook(() => useStableId('puzzle'));
    expect(result.current.startsWith('puzzle-')).toBe(true);
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });

  it('produces distinct ids for distinct hook instances', () => {
    const { result: a } = renderHook(() => useStableId('puzzle'));
    const { result: b } = renderHook(() => useStableId('puzzle'));
    expect(a.current).not.toBe(b.current);
  });
});
