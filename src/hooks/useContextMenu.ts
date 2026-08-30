import * as React from 'react';

import { useScript } from './useScript';
import type { ContextMenuItem } from '../types';

/** Shared select-handling for `ContextMenu`/`DropdownMenu` (docs/API.md § useContextMenu). */
export function useContextMenu(options: { pcEntity?: string } = {}): {
  select: (item: ContextMenuItem) => void;
} {
  const { setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'lastMenuSelection',
  });
  const select = React.useCallback((item: ContextMenuItem) => setValue(item.id), [setValue]);
  return { select };
}
