import { describe, expect, it } from 'vitest';

import { cn } from '../cn';

describe('cn', () => {
  it('joins truthy class values with clsx semantics', () => {
    const shown = false;
    expect(cn('a', shown && 'b', undefined, 'c')).toBe('a c');
  });

  it('deduplicates conflicting Tailwind utilities via tailwind-merge, keeping the last', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('merges conditional objects and arrays like clsx', () => {
    expect(cn(['a', { b: true, c: false }])).toBe('a b');
  });
});
