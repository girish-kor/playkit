import * as React from 'react';

import { useTextureSync } from '../../hooks/useTextureSync';
import { cn } from '../../internal/cn';

/** Optimized image with fallback and PlayCanvas texture sync (COMPONENTS.md § Component: Image). */
export type ImageVariant = 'rounded' | 'circle' | 'thumbnail';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  pcEntity?: string;
  className?: string;
  variant?: ImageVariant;
  onLoad?: () => void;
  onError?: () => void;
  fallback?: string;
  placeholder?: string;
  lazy?: boolean | 'lazy' | 'eager';
  srcSet?: string;
  sizes?: string;
  decoding?: 'sync' | 'async' | 'auto';
  role?: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onLoadStart?: () => void;
  blurDataURL?: string;
  priority?: boolean;
}

const VARIANT_CLASSES: Record<ImageVariant, string> = {
  rounded: 'rounded-lg',
  circle: 'rounded-full',
  thumbnail: 'rounded-md',
};

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    width,
    height,
    objectFit = 'cover',
    objectPosition,
    pcEntity,
    className,
    variant = 'rounded',
    onLoad,
    onError,
    fallback,
    placeholder,
    lazy = true,
    srcSet,
    sizes,
    decoding = 'async',
    role = 'img',
    crossOrigin,
    referrerPolicy,
    onLoadStart,
    blurDataURL,
    priority = false,
  },
  ref,
) {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setError(false);
    onLoadStart?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onLoadStart intentionally fires once per new `src`.
  }, [src]);

  const { setTexture } = useTextureSync({ pcEntity });
  React.useEffect(() => {
    if (pcEntity) setTexture(currentSrc);
  }, [pcEntity, currentSrc, setTexture]);

  const handleError = () => {
    setError(true);
    onError?.();
    if (fallback && currentSrc !== fallback) setCurrentSrc(fallback);
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const loading = typeof lazy === 'string' ? lazy : lazy ? 'lazy' : 'eager';

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      role={role}
      srcSet={srcSet}
      sizes={sizes}
      decoding={decoding}
      loading={loading}
      crossOrigin={crossOrigin || undefined}
      referrerPolicy={referrerPolicy}
      fetchPriority={priority ? 'high' : undefined}
      onLoad={handleLoad}
      onError={handleError}
      className={cn(VARIANT_CLASSES[variant], !isLoaded && placeholder && 'blur-sm', className)}
      style={{
        objectFit,
        objectPosition,
        backgroundImage: !isLoaded && blurDataURL ? `url(${blurDataURL})` : undefined,
        backgroundSize: 'cover',
      }}
      data-error={error || undefined}
    />
  );
});

Image.displayName = 'Image';
