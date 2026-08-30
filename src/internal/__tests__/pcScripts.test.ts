import { afterEach, describe, expect, it } from 'vitest';

import { loadScriptsInOrder } from '../pcScripts';

describe('loadScriptsInOrder', () => {
  afterEach(() => {
    document.head.querySelectorAll('script').forEach((node) => node.remove());
  });

  it('injects <script> tags into document.head in order, one at a time', async () => {
    const promise = loadScriptsInOrder(['/a.js', '/b.js']);

    await Promise.resolve();
    let scripts = document.head.querySelectorAll('script');
    expect(scripts).toHaveLength(1);
    expect(scripts[0]!.src).toContain('/a.js');

    scripts[0]!.onload?.(new Event('load'));
    await Promise.resolve();
    await Promise.resolve();

    scripts = document.head.querySelectorAll('script');
    expect(scripts).toHaveLength(2);
    expect(scripts[1]!.src).toContain('/b.js');

    scripts[1]!.onload?.(new Event('load'));
    await expect(promise).resolves.toBeUndefined();
  });

  it('prefixes relative script URLs with assetPrefix when given', async () => {
    const promise = loadScriptsInOrder(['scripts/foo.js'], 'https://cdn.example.com/');
    await Promise.resolve();
    const script = document.head.querySelector('script')!;
    expect(script.src).toBe('https://cdn.example.com/scripts/foo.js');
    script.onload?.(new Event('load'));
    await promise;
  });

  it('rejects when a script fails to load', async () => {
    const promise = loadScriptsInOrder(['/broken.js']);
    await Promise.resolve();
    const script = document.head.querySelector('script')!;
    script.onerror?.(new Event('error'));
    await expect(promise).rejects.toThrow('Failed to load PlayCanvas script');
  });

  it('resolves with no scripts injected for an empty list', async () => {
    await expect(loadScriptsInOrder([])).resolves.toBeUndefined();
    expect(document.head.querySelectorAll('script')).toHaveLength(0);
  });
});
