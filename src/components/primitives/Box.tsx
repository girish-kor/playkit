import * as React from 'react';

import { useEntity } from '../../hooks/useEntity';
import { cn } from '../../internal/cn';
import { Slot } from './Slot';

/**
 * Foundational layout container with optional PlayCanvas entity binding and
 * `asChild` polymorphism (COMPONENTS.md § Component: Box). Every other primitive and
 * feature component composes this, directly or transitively (docs/ARCHITECTURE.md).
 */
export type BoxVariant = 'solid' | 'outline' | 'ghost' | 'transparent';

// `AllHTMLAttributes` isn't used here despite Box's polymorphic `as` -- too many of
// its element-specific attribute names (`wrap`, `cols`, `size`, ...) collide with
// unrelated typed props already documented on other primitives that compose Box
// (Flex.wrap, Grid.cols, Button.size, ...). Instead: the common HTMLAttributes plus an
// explicit, small set of element-specific DOM attributes actually passed through by
// composing primitives (Button's `form*`/`href`/`type`, Image's `src`/`alt`, ...).
export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  pcEntity?: string;
  /** Sync position/rotation/scale every frame (default: `false`). */
  syncTransform?: boolean;
  /** Render `Slot` instead of the element from `as`, merging props onto the single
   * child element (default: `false`). */
  asChild?: boolean;
  variant?: BoxVariant;
  'data-testid'?: string;
  /** Only meaningful when `as="label"`; passed through to the DOM otherwise. */
  htmlFor?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: string;
  form?: string;
  formAction?: string;
  formMethod?: string;
  formTarget?: string;
  formEncType?: string;
  src?: string;
  alt?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  name?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
}

const VARIANT_CLASSES: Record<BoxVariant, string> = {
  solid: 'bg-gray-800 border border-transparent',
  outline: 'bg-transparent border border-gray-700',
  ghost: 'bg-transparent border border-transparent',
  transparent: 'bg-transparent border-0',
};

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as,
    asChild = false,
    variant = 'solid',
    pcEntity,
    syncTransform = false,
    className,
    style,
    ...rest
  },
  ref,
) {
  const Component: React.ElementType = asChild ? Slot : (as ?? 'div');

  // Per docs/ARCHITECTURE.md's binding model: `pcEntity` is a silent no-op until an
  // entity with that id appears; this hook call is unconditional (Rules of Hooks) and
  // itself already implements that no-op contract when `pcEntity` is unset.
  const { transform } = useEntity({ entityId: pcEntity ?? '', sync: syncTransform });

  const mergedStyle =
    syncTransform && transform.position ? { ...transformToStyle(transform), ...style } : style;

  return (
    <Component
      ref={ref}
      className={cn(VARIANT_CLASSES[variant], className)}
      style={mergedStyle}
      {...rest}
    />
  );
});

Box.displayName = 'Box';

function transformToStyle(transform: {
  position: { x: number; y: number; z: number } | null;
  rotation: { x: number; y: number; z: number } | null;
  scale: { x: number; y: number; z: number } | null;
}): React.CSSProperties {
  const p = transform.position;
  const r = transform.rotation;
  const s = transform.scale;
  if (!p) return {};
  const translate = `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`;
  const rotate = r ? ` rotateX(${r.x}deg) rotateY(${r.y}deg) rotateZ(${r.z}deg)` : '';
  const scale = s ? ` scale3d(${s.x}, ${s.y}, ${s.z})` : '';
  return { transform: `${translate}${rotate}${scale}` };
}
