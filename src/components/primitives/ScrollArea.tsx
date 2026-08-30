import * as React from 'react';

import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { cn } from '../../internal/cn';

/**
 * Container with a custom scrollbar and optional auto-scroll (COMPONENTS.md §
 * Component: ScrollArea).
 */
export type ScrollAreaVariant = 'default' | 'thin' | 'hidden';

export interface ScrollAreaMethods {
  scrollTo(options: ScrollToOptions | { top?: number; left?: number }): void;
  scrollBy(options: ScrollToOptions | { top?: number; left?: number }): void;
  scrollIntoView(child: HTMLElement, options?: ScrollIntoViewOptions): void;
}

export interface ScrollAreaProps {
  orientation?: 'vertical' | 'horizontal' | 'both';
  autoScroll?: boolean;
  scrollToBottom?: boolean;
  className?: string;
  children?: React.ReactNode;
  variant?: ScrollAreaVariant;
  overscrollBehavior?: 'auto' | 'contain' | 'none';
  scrollBehavior?: 'auto' | 'smooth';
  scrollbarPlacement?: 'overlay' | 'inline';
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onScrollEnd?: () => void;
  scrollEndDebounce?: number;
  role?: string;
  'aria-label'?: string;
  scrollbarWidth?: number;
  scrollbarColor?: string;
  onReachEnd?: () => void;
  onReachStart?: () => void;
  scrollThreshold?: number;
}

const VARIANT_CLASSES: Record<ScrollAreaVariant, string> = {
  default: 'scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600',
  thin: 'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700',
  hidden: 'scrollbar-hide',
};

export const ScrollArea = React.forwardRef<ScrollAreaMethods, ScrollAreaProps>(function ScrollArea(
  {
    orientation = 'vertical',
    autoScroll = false,
    scrollToBottom: scrollToBottomOnce,
    className,
    children,
    variant = 'default',
    overscrollBehavior,
    scrollBehavior = 'auto',
    scrollbarPlacement = 'inline',
    onScroll,
    onScrollEnd,
    scrollEndDebounce = 150,
    role = 'region',
    scrollbarWidth,
    scrollbarColor,
    onReachEnd,
    onReachStart,
    scrollThreshold = 0,
    ...rest
  },
  ref,
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollToBottom: doScrollToBottom } = useScrollToBottom({
    containerRef,
    dependencies: [children],
    smooth: scrollBehavior === 'smooth',
  });

  React.useEffect(() => {
    if (autoScroll) doScrollToBottom();
  }, [autoScroll, doScrollToBottom]);

  React.useEffect(() => {
    if (scrollToBottomOnce) doScrollToBottom();
  }, [scrollToBottomOnce, doScrollToBottom]);

  React.useImperativeHandle(ref, () => ({
    scrollTo: (options) => containerRef.current?.scrollTo(options as ScrollToOptions),
    scrollBy: (options) => containerRef.current?.scrollBy(options as ScrollToOptions),
    scrollIntoView: (child, options) => child.scrollIntoView(options),
  }));

  const scrollEndTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onScroll?.(e);

    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(() => onScrollEnd?.(), scrollEndDebounce);

    const el = e.currentTarget;
    if (el.scrollTop <= scrollThreshold) onReachStart?.();
    if (el.scrollHeight - el.scrollTop - el.clientHeight <= scrollThreshold) onReachEnd?.();
  };

  return (
    <div
      ref={containerRef}
      role={role}
      onScroll={handleScroll}
      className={cn(
        orientation === 'vertical' && 'overflow-y-auto overflow-x-hidden',
        orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
        orientation === 'both' && 'overflow-auto',
        VARIANT_CLASSES[variant],
        className,
      )}
      style={{
        overscrollBehavior,
        scrollBehavior,
        ...(scrollbarWidth !== undefined
          ? ({ ['--scrollbar-width' as string]: `${scrollbarWidth}px` } as React.CSSProperties)
          : {}),
      }}
      data-scrollbar-placement={scrollbarPlacement}
      data-scrollbar-color={scrollbarColor}
      {...rest}
    >
      {children}
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';
