import * as React from 'react';

import { createPCStore, type PCStoreApi } from './pcStore';

/**
 * Default store used by any bridge hook called with no `PCProvider` ancestor at all.
 * Static and never mutated — docs/ARCHITECTURE.md's binding model requires every
 * component to be "fully renderable and usable as pure React/DOM UI with zero
 * PlayCanvas present," so bridge hooks must resolve to their documented no-op state
 * (`entity: null`, `isReady: false`, ...) rather than throwing when unwrapped.
 */
const noProviderStore = createPCStore({ isLoading: false });

export const PCContext = React.createContext<PCStoreApi>(noProviderStore);

export function usePCStore(): PCStoreApi {
  return React.useContext(PCContext);
}
