import type * as React from 'react';

/** Merges a forwarded ref with an internally-needed ref (e.g. for react-aria hooks
 * that require a concrete RefObject). */
export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(value);
      else (ref as React.MutableRefObject<T | null>).current = value;
    }
  };
}
