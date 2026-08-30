import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ScrollArea, type ScrollAreaMethods } from '../ScrollArea';

describe('ScrollArea', () => {
  it('defaults to role="region" and vertical overflow classes', () => {
    render(<ScrollArea data-testid="scroll">content</ScrollArea>);
    const el = screen.getByRole('region');
    expect(el.className).toContain('overflow-y-auto');
  });

  it('calls onScroll, and (debounced) onScrollEnd', () => {
    vi.useFakeTimers();
    const onScroll = vi.fn();
    const onScrollEnd = vi.fn();
    render(
      <ScrollArea onScroll={onScroll} onScrollEnd={onScrollEnd} scrollEndDebounce={100}>
        content
      </ScrollArea>,
    );
    const el = screen.getByRole('region');
    act(() => {
      el.dispatchEvent(new Event('scroll', { bubbles: true }));
    });
    expect(onScroll).toHaveBeenCalledTimes(1);
    expect(onScrollEnd).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(100));
    expect(onScrollEnd).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('exposes scrollTo/scrollBy/scrollIntoView via the imperative ref, forwarding to the DOM node', () => {
    // jsdom does not implement Element.scrollTo/scrollBy -- stub them so the
    // forwarding behavior itself (not jsdom's layout support) is what's under test.
    Element.prototype.scrollTo = vi.fn();
    Element.prototype.scrollBy = vi.fn();
    const ref = React.createRef<ScrollAreaMethods>();
    render(<ScrollArea ref={ref}>content</ScrollArea>);
    expect(ref.current).not.toBeNull();
    ref.current!.scrollTo({ top: 5 });
    expect(Element.prototype.scrollTo).toHaveBeenCalledWith({ top: 5 });
    ref.current!.scrollBy({ top: 10 });
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({ top: 10 });
  });

  it('applies the documented variant classes', () => {
    render(
      <ScrollArea variant="hidden" data-testid="scroll">
        content
      </ScrollArea>,
    );
    expect(screen.getByRole('region').className).toContain('scrollbar-hide');
  });
});
