import { useScript } from './useScript';

/**
 * Scene-driven expand/collapse (docs/API.md § useModalSync) — used by `Modal`,
 * `Popover`, and `Accordion` for optional PlayCanvas-triggered open/close.
 */
export function useModalSync(options: { pcEntity?: string } = {}): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'isOpen',
    initialValue: false,
  });
  return {
    isOpen: Boolean(value),
    open: () => setValue(true),
    close: () => setValue(false),
  };
}
