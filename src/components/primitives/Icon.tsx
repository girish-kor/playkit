import * as React from 'react';
import * as LucideIcons from 'lucide-react';

import { useIconSync } from '../../hooks/useIconSync';
import { cn } from '../../internal/cn';

/**
 * SVG icon wrapper with size/color control and PlayCanvas icon sync (COMPONENTS.md §
 * Component: Icon). `name` is a plain `string` against a runtime-resolved registry
 * (Lucide by default), not a compile-time union — an unrecognized name renders nothing
 * rather than throwing (docs/VALIDATION.md).
 */
export type IconVariant = 'outline' | 'solid' | 'mini';

export interface IconProps {
  name: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  strokeColor?: string;
  fill?: string;
  rotate?: number;
  mirror?: boolean;
  pcEntity?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: IconVariant;
  'aria-label'?: string;
  role?: string;
  title?: string;
  viewBox?: string;
  strokeLinecap?: 'round' | 'butt' | 'square';
  strokeLinejoin?: 'round' | 'miter' | 'bevel';
}

function sizeClasses(size: number | string): string {
  const token = typeof size === 'number' ? size : size;
  return `w-${token} h-${token}`;
}

// kebab-case name -> PascalCase Lucide export name (e.g. "arrow-right" -> "ArrowRight").
function toPascalCase(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

const iconRegistryWarned = new Set<string>();

export function Icon(props: IconProps): React.JSX.Element | null {
  const {
    name,
    size = 5,
    color = 'currentColor',
    strokeWidth = 2,
    strokeColor,
    fill,
    rotate,
    mirror = false,
    pcEntity,
    children,
    className,
    onClick,
    variant = 'outline',
    'aria-label': ariaLabel,
    role,
    title,
    viewBox = '0 0 24 24',
    strokeLinecap,
    strokeLinejoin,
  } = props;

  const { setIcon } = useIconSync({ pcEntity });
  React.useEffect(() => {
    if (pcEntity) setIcon(name);
  }, [pcEntity, name, setIcon]);

  const isInteractive = Boolean(onClick);
  const resolvedRole = role ?? (isInteractive ? 'button' : ariaLabel ? 'img' : undefined);

  const transformParts = [
    rotate !== undefined && `rotate(${rotate}deg)`,
    mirror && 'scaleX(-1)',
  ].filter(Boolean);
  const style: React.CSSProperties = transformParts.length
    ? { transform: transformParts.join(' ') }
    : {};

  if (children) {
    return (
      <svg
        viewBox={viewBox}
        className={cn(sizeClasses(size), 'flex-shrink-0', color, className)}
        style={style}
        stroke={strokeColor ?? color}
        fill={variant === 'solid' ? (fill ?? color) : 'none'}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        role={resolvedRole}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel && !isInteractive ? true : undefined}
        onClick={onClick}
      >
        {title && <title>{title}</title>}
        {children}
      </svg>
    );
  }

  const LucideIcon = (
    LucideIcons as unknown as Record<string, React.ComponentType<Record<string, unknown>>>
  )[toPascalCase(name)];

  if (!LucideIcon) {
    if (process.env.NODE_ENV !== 'production' && !iconRegistryWarned.has(name)) {
      iconRegistryWarned.add(name);
      console.warn(`Icon: no icon registered for name "${name}".`);
    }
    return null;
  }

  return (
    <LucideIcon
      className={cn(sizeClasses(size), 'flex-shrink-0', color, className)}
      style={style}
      stroke={strokeColor ?? color}
      fill={variant === 'solid' ? (fill ?? color) : 'none'}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      role={resolvedRole}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel && !isInteractive ? true : undefined}
      onClick={onClick}
      title={title}
    />
  );
}

Icon.displayName = 'Icon';
