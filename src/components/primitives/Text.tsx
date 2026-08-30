import * as React from 'react';

import { useTextSync } from '../../hooks/useTextSync';
import { cn } from '../../internal/cn';
import { Box, type BoxProps } from './Box';

/**
 * Typography primitive with size, weight, color, alignment, and PlayCanvas text sync
 * (COMPONENTS.md § Component: Text). The single typography primitive in the library —
 * `Label` composes this with `as="label"` rather than being a separate primitive.
 */
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TextWeight = 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export interface TextProps extends Omit<BoxProps, 'color'> {
  size?: TextSize;
  weight?: TextWeight;
  /** Must be a Tailwind text-color class (e.g. `'text-red-500'`); raw CSS colors are
   * not supported here — apply those via `style` instead. */
  color?: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  /** Takes precedence over `leading` when set; applied via `style`. */
  lineHeight?: number | string;
  truncate?: boolean;
  lineClamp?: number;
  ellipsis?: 'clip' | 'ellipsis';
  selectable?: boolean;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline';
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  htmlFor?: string;
  /** Renders raw HTML, mirroring React's native prop. Bypasses `children`; the
   * caller is responsible for sanitizing the HTML before passing it in
   * (docs/SECURITY.md's XSS-surface rule — the only raw-HTML injection point in the
   * library). */
  dangerouslySetInnerHTML?: { __html: string };
}

const TEXT_DECORATION_CLASS: Record<NonNullable<TextProps['textDecoration']>, string> = {
  none: 'no-underline',
  underline: 'underline',
  'line-through': 'line-through',
  overline: 'overline',
};

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  {
    as = 'span',
    size = 'base',
    weight = 'normal',
    color,
    fontFamily,
    align,
    transform,
    tracking,
    leading,
    lineHeight,
    truncate,
    lineClamp,
    ellipsis,
    selectable = true,
    fontStyle,
    textDecoration,
    whiteSpace,
    htmlFor,
    dangerouslySetInnerHTML,
    className,
    style,
    children,
    pcEntity,
    ...rest
  },
  ref,
) {
  const { setText } = useTextSync({ pcEntity });
  React.useEffect(() => {
    if (pcEntity && typeof children === 'string') setText(children);
  }, [pcEntity, children, setText]);

  const classes = cn(
    `text-${size}`,
    `font-${weight}`,
    color,
    fontFamily && `font-${fontFamily}`,
    align && `text-${align}`,
    transform,
    tracking && `tracking-${tracking}`,
    leading && `leading-${leading}`,
    truncate && 'truncate',
    lineClamp !== undefined && `line-clamp-${lineClamp}`,
    ellipsis && (ellipsis === 'ellipsis' ? 'text-ellipsis' : 'text-clip'),
    !selectable && 'select-none',
    fontStyle === 'italic' && 'italic',
    fontStyle === 'normal' && 'not-italic',
    textDecoration && TEXT_DECORATION_CLASS[textDecoration],
    whiteSpace && `whitespace-${whiteSpace}`,
    className,
  );

  const mergedStyle: React.CSSProperties | undefined =
    lineHeight !== undefined || fontStyle === 'oblique'
      ? { lineHeight, fontStyle: fontStyle === 'oblique' ? 'oblique' : undefined, ...style }
      : style;

  if (dangerouslySetInnerHTML) {
    return (
      <Box
        ref={ref}
        as={as}
        pcEntity={pcEntity}
        className={classes}
        style={mergedStyle}
        htmlFor={htmlFor}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...rest}
      />
    );
  }

  return (
    <Box
      ref={ref}
      as={as}
      pcEntity={pcEntity}
      className={classes}
      style={mergedStyle}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </Box>
  );
});

Text.displayName = 'Text';
