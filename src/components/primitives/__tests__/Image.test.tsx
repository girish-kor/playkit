import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Image } from '../Image';

describe('Image', () => {
  it('renders with role="img" by default and the given alt text', () => {
    render(<Image src="/a.png" alt="a photo" />);
    expect(screen.getByRole('img', { name: 'a photo' })).toBeInTheDocument();
  });

  it('calls onLoad when the image loads successfully', () => {
    const onLoad = vi.fn();
    render(<Image src="/a.png" alt="a" onLoad={onLoad} />);
    act(() => screen.getByRole('img').dispatchEvent(new Event('load')));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('on error, calls onError and swaps to the fallback src when provided', () => {
    const onError = vi.fn();
    render(<Image src="/broken.png" alt="a" fallback="/fallback.png" onError={onError} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    act(() => img.dispatchEvent(new Event('error')));
    expect(onError).toHaveBeenCalledTimes(1);
    expect(img.src).toContain('/fallback.png');
  });

  it('calls onLoadStart when the src prop changes', () => {
    const onLoadStart = vi.fn();
    const { rerender } = render(<Image src="/a.png" alt="a" onLoadStart={onLoadStart} />);
    expect(onLoadStart).toHaveBeenCalledTimes(1);
    rerender(<Image src="/b.png" alt="a" onLoadStart={onLoadStart} />);
    expect(onLoadStart).toHaveBeenCalledTimes(2);
  });

  it('defaults to loading="lazy"', () => {
    render(<Image src="/a.png" alt="a" />);
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
  });

  it('is a documented no-op when pcEntity does not resolve (no throw)', () => {
    expect(() => render(<Image src="/a.png" alt="a" pcEntity="missing" />)).not.toThrow();
  });
});
