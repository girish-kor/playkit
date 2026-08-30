import { useScript } from './useScript';

/** Scene-driven expand/collapse for `Accordion` (docs/API.md § useAccordionSync). */
export function useAccordionSync(options: { pcEntity?: string } = {}): {
  expanded: string[];
  setExpanded: (ids: string[]) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'expanded',
    initialValue: [] as string[],
  });
  return {
    expanded: (value as string[] | undefined) ?? [],
    setExpanded: (ids: string[]) => setValue(ids),
  };
}
