import type * as React from 'react';

import { useScript } from './useScript';

/** Scene-sourced tooltip content (docs/API.md § useTooltipSync) — used by `Tooltip`. */
export function useTooltipSync(options: { pcEntity?: string } = {}): {
  content: React.ReactNode;
  loading: boolean;
} {
  const { value, isLoading } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'tooltipContent',
  });
  return { content: value as React.ReactNode, loading: options.pcEntity ? isLoading : false };
}
