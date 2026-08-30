import * as React from 'react';

import { useCameraProjection } from '../../hooks/useCameraProjection';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';

/** Root HUD overlay: fixed, world-space, or screen-space (COMPONENTS.md § Component: HUD). */
export type HUDPosition = 'fixed' | 'world-space' | 'screen-space';
export type HUDAlignment =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface HUDProps {
  position?: HUDPosition;
  offset?: { x?: number; y?: number };
  alignment?: HUDAlignment;
  pcCamera?: string;
  zIndex?: number;
  safeArea?: boolean;
  className?: string;
  children?: React.ReactNode;
  onVisibilityChange?: (visible: boolean) => void;
  onClickOutside?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (visible: boolean) => void;
  onMount?: () => void;
  onUnmount?: () => void;
  'aria-label'?: string;
  onResize?: (size: { width: number; height: number }) => void;
  onRender?: () => void;
  onUpdate?: (dt: number) => void;
  transition?: boolean;
  isVisible?: boolean;
}

const ALIGNMENT_CLASSES: Record<HUDAlignment, string> = {
  'top-left': 'top-0 left-0 items-start justify-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 items-start justify-center',
  'top-right': 'top-0 right-0 items-start justify-end',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center',
  'bottom-left': 'bottom-0 left-0 items-end justify-start',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-end justify-center',
  'bottom-right': 'bottom-0 right-0 items-end justify-end',
};

function offsetTransform(
  alignment: HUDAlignment,
  offset?: { x?: number; y?: number },
): React.CSSProperties {
  if (!offset) return {};
  const dx = offset.x ?? 0;
  const dy = offset.y ?? 0;
  const invertX = alignment.includes('right');
  const invertY = alignment.includes('bottom');
  return { marginLeft: invertX ? -dx : dx, marginTop: invertY ? -dy : dy };
}

export function HUD({
  position = 'fixed',
  offset,
  alignment = 'top-left',
  pcCamera,
  zIndex = 10,
  safeArea = true,
  className,
  children,
  onVisibilityChange,
  onClickOutside,
  onOpen,
  onClose,
  onToggle,
  onMount,
  onUnmount,
  'aria-label': ariaLabel,
  onResize,
  onRender,
  onUpdate,
  transition = false,
  isVisible = true,
}: HUDProps): React.JSX.Element {
  const { project } = useCameraProjection({ pcCamera: pcCamera ?? '' });
  void project;

  const wasVisibleRef = React.useRef(isVisible);
  React.useEffect(() => {
    if (wasVisibleRef.current === isVisible) return;
    wasVisibleRef.current = isVisible;
    onVisibilityChange?.(isVisible);
    onToggle?.(isVisible);
    if (isVisible) onOpen?.();
    else onClose?.();
  }, [isVisible, onVisibilityChange, onToggle, onOpen, onClose]);

  React.useEffect(() => {
    onMount?.();
    return () => onUnmount?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once on mount/unmount only.
  }, []);

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!onResize || typeof ResizeObserver === 'undefined' || !containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) onResize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [onResize]);

  React.useEffect(() => {
    if (!onRender && !onUpdate) return;
    let rafId: number;
    let last = performance.now();
    const tick = (now: number) => {
      onRender?.();
      onUpdate?.((now - last) / 1000);
      last = now;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onRender, onUpdate]);

  return (
    <Box
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      aria-hidden={!isVisible}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClickOutside?.();
      }}
      className={cn(
        position === 'fixed' && 'fixed flex',
        position === 'screen-space' && 'absolute flex',
        position === 'world-space' && 'absolute flex',
        position !== 'world-space' && ALIGNMENT_CLASSES[alignment],
        safeArea &&
          'p-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]',
        transition && 'transition-opacity duration-200',
        !isVisible && 'opacity-0 pointer-events-none',
        className,
      )}
      style={{
        zIndex,
        ...offsetTransform(alignment, offset),
        inset: position === 'world-space' ? 0 : undefined,
      }}
    >
      {children}
    </Box>
  );
}

HUD.displayName = 'HUD';
