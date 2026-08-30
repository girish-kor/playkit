import * as React from 'react';

import { useStepperSync } from '../../hooks/useStepperSync';
import { cn } from '../../internal/cn';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import { Progress } from '../feedback/Progress';
import { Text } from '../primitives/Text';

/** Multi-step workflow UI (COMPONENTS.md § Component: Stepper). */
export type StepperVariant = 'horizontal' | 'vertical' | 'dots';

export interface StepperStep {
  id: string;
  label: string;
  content: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep?: string;
  defaultStep?: string;
  pcEntity?: string;
  linear?: boolean;
  variant?: StepperVariant;
  className?: string;
  onStepChange?: (stepId: string) => void;
  onNext?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  onStepValidate?: (stepId: string) => boolean | Promise<boolean>;
  'aria-label'?: string;
  showStepNumbers?: boolean;
  allowSkipOptional?: boolean;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  {
    steps,
    activeStep: controlledStep,
    defaultStep,
    pcEntity,
    linear = true,
    variant = 'horizontal',
    className,
    onStepChange,
    onNext,
    onBack,
    onComplete,
    onStepValidate,
    'aria-label': ariaLabel = 'Progress',
    showStepNumbers = true,
    allowSkipOptional = true,
  },
  ref,
) {
  const [uncontrolledStep, setUncontrolledStep] = React.useState(defaultStep ?? steps[0]?.id);
  const isControlled = controlledStep !== undefined;
  const activeStep = controlledStep ?? uncontrolledStep;

  const [completedSteps, setCompletedSteps] = React.useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = React.useState(false);

  const { activeStep: pcStep, setStep: setPcStep } = useStepperSync({ pcEntity });
  const onStepChangeRef = useLatest(onStepChange);
  const onCompleteRef = useLatest(onComplete);

  const activeIndex = steps.findIndex((s) => s.id === activeStep);

  const syncedFromPcRef = React.useRef(false);
  React.useEffect(() => {
    if (!pcEntity) return;
    const stepAtIndex = steps[pcStep]?.id;
    if (stepAtIndex && stepAtIndex !== activeStep) {
      syncedFromPcRef.current = true;
      goToStep(stepAtIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcStep]);

  function goToStep(stepId: string): void {
    if (!isControlled) setUncontrolledStep(stepId);
    onStepChangeRef.current?.(stepId);
    const index = steps.findIndex((s) => s.id === stepId);
    if (pcEntity && index >= 0) setPcStep(index);
  }

  async function handleNext(): Promise<void> {
    const current = steps[activeIndex];
    if (!current) return;

    if (onStepValidate) {
      setIsValidating(true);
      const valid = await onStepValidate(current.id);
      setIsValidating(false);
      if (!valid) return;
    }

    setCompletedSteps((prev) => new Set(prev).add(current.id));
    onNext?.();

    if (activeIndex === steps.length - 1) {
      onCompleteRef.current?.();
      return;
    }
    goToStep(steps[activeIndex + 1]!.id);
  }

  function handleBack(): void {
    if (activeIndex <= 0) return;
    onBack?.();
    goToStep(steps[activeIndex - 1]!.id);
  }

  function canJumpTo(index: number): boolean {
    if (!linear) return true;
    if (index <= activeIndex) return true;
    for (let i = activeIndex; i < index; i += 1) {
      const step = steps[i];
      if (!step) continue;
      if (!completedSteps.has(step.id) && !(step.optional && allowSkipOptional)) return false;
    }
    return true;
  }

  const currentStep = steps[activeIndex];

  return (
    <Box ref={ref} className={cn(className)}>
      <Flex
        as="nav"
        role="navigation"
        aria-label={ariaLabel}
        direction={variant === 'vertical' ? 'col' : 'row'}
        align="center"
        gap={2}
      >
        {steps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isCompleted = completedSteps.has(step.id);
          const clickable = canJumpTo(index);
          return (
            <React.Fragment key={step.id}>
              {index > 0 && variant !== 'dots' && <Box className="flex-1 h-0.5 bg-gray-700" />}
              <Button
                variant="ghost"
                size="sm"
                disabled={!clickable}
                aria-current={isActive ? 'step' : undefined}
                aria-label={step.label}
                onPress={() => clickable && goToStep(step.id)}
                className={cn(
                  'rounded-full flex items-center justify-center',
                  variant === 'dots' ? 'w-2.5 h-2.5 p-0' : 'w-8 h-8',
                  isCompleted && 'bg-green-500',
                  isActive && 'bg-blue-500 ring-2',
                  !isActive && !isCompleted && 'bg-gray-700',
                )}
              >
                {variant !== 'dots' && showStepNumbers && index + 1}
              </Button>
              {variant !== 'dots' && (
                <Text
                  id={`${step.id}-label`}
                  size="sm"
                  className={cn(isActive ? 'text-white' : 'text-gray-400')}
                >
                  {step.label}
                </Text>
              )}
            </React.Fragment>
          );
        })}
      </Flex>
      {variant === 'dots' && (
        <Progress
          value={activeIndex + 1}
          max={steps.length}
          variant="segmented"
          segments={steps.length}
          aria-label="Step progress"
        />
      )}
      {currentStep && (
        <Box role="region" aria-labelledby={`${currentStep.id}-label`} className="mt-4">
          {currentStep.content}
        </Box>
      )}
      <Flex justify="between" className="mt-4">
        <Button variant="secondary" onPress={handleBack} disabled={activeIndex <= 0}>
          Back
        </Button>
        <Button variant="primary" onPress={handleNext} loading={isValidating}>
          {activeIndex === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Flex>
    </Box>
  );
});

Stepper.displayName = 'Stepper';
