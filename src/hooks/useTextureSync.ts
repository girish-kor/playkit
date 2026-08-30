import * as React from 'react';

import { useScript } from './useScript';

/**
 * Sets a PlayCanvas material/texture from an `Image`'s `src` (docs/API.md §
 * useTextureSync). `isLoaded` reflects whether the write has round-tripped through the
 * (debounced) sync, not whether the browser has decoded the image itself — `Image`
 * tracks its own DOM `onLoad` separately for that.
 */
export function useTextureSync(options: { pcEntity?: string } = {}): {
  setTexture: (src: string) => void;
  isLoaded: boolean;
} {
  const { setValue, isSynced } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'texture',
  });
  const setTexture = React.useCallback((src: string) => setValue(src), [setValue]);
  return { setTexture, isLoaded: isSynced };
}
