import * as React from 'react';

import { useAvatarSync } from '../../hooks/useAvatarSync';
import { cn } from '../../internal/cn';
import { Image } from './Image';
import { Text } from './Text';

/**
 * Circular (or square) portrait image with fallback initials and status indicator
 * (COMPONENTS.md § Component: Avatar).
 */
export type AvatarVariant = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface AvatarProps {
  src?: string;
  alt: string;
  name?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
  statusPosition?: 'top-right' | 'bottom-right';
  pcEntity?: string;
  className?: string;
  onError?: () => void;
  onClick?: () => void;
}

const SIZE_CLASSES: Record<Exclude<AvatarSize, number>, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const VARIANT_CLASSES: Record<AvatarVariant, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
};

const STATUS_CLASSES: Record<Exclude<AvatarStatus, 'none'>, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  fallback,
  size = 'md',
  variant = 'circle',
  status = 'none',
  statusPosition = 'bottom-right',
  pcEntity,
  className,
  onError,
  onClick,
}: AvatarProps): React.JSX.Element {
  const [hasError, setHasError] = React.useState(false);
  const synced = useAvatarSync({ pcEntity });
  const resolvedSrc = pcEntity ? synced.src : src;
  const resolvedStatus = pcEntity && synced.status ? (synced.status as AvatarStatus) : status;

  const sizeClass = typeof size === 'number' ? undefined : SIZE_CLASSES[size];
  const sizeStyle: React.CSSProperties | undefined =
    typeof size === 'number' ? { width: size, height: size } : undefined;

  const showImage = resolvedSrc && !hasError;

  const Wrapper = onClick ? 'button' : 'span';

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      className={cn(
        'relative inline-flex items-center justify-center bg-gray-700 text-white',
        VARIANT_CLASSES[variant],
        sizeClass,
        onClick && 'cursor-pointer',
        className,
      )}
      style={sizeStyle}
      role={onClick ? undefined : 'img'}
      aria-label={alt}
      onClick={onClick}
    >
      {showImage ? (
        <Image
          src={resolvedSrc}
          alt={alt}
          variant={variant === 'circle' ? 'circle' : 'rounded'}
          className="w-full h-full"
          onError={() => {
            setHasError(true);
            onError?.();
          }}
        />
      ) : (
        <Text as="span" weight="medium" className="select-none">
          {fallback ?? (name ? initialsFromName(name) : '')}
        </Text>
      )}
      {status !== 'none' && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute w-2.5 h-2.5 rounded-full ring-2 ring-gray-900',
            statusPosition === 'top-right' ? 'top-0 right-0' : 'bottom-0 right-0',
            STATUS_CLASSES[resolvedStatus === 'none' ? 'offline' : resolvedStatus],
          )}
        />
      )}
    </Wrapper>
  );
}

Avatar.displayName = 'Avatar';
