import { useScript } from './useScript';

/** Scene-gated tutorial-step sync (docs/API.md § useStepperSync) — used by `Stepper`. */
export function useStepperSync(options: { pcEntity?: string } = {}): {
  activeStep: number;
  setStep: (step: number) => void;
} {
  const { value, setValue } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'activeStep',
    initialValue: 0,
  });
  return { activeStep: (value as number | undefined) ?? 0, setStep: (v: number) => setValue(v) };
}
