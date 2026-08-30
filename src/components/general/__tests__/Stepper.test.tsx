import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Stepper, StepperStep } from '../Stepper';

const mockSteps: StepperStep[] = [
  { id: 'step1', label: 'Personal Info', content: <div>Step 1 Content</div> },
  { id: 'step2', label: 'Shipping', content: <div>Step 2 Content</div> },
  { id: 'step3', label: 'Payment', content: <div>Step 3 Content</div> },
];

describe('Stepper', () => {
  it('renders navigation and first step content', () => {
    render(<Stepper steps={mockSteps} />);
    expect(screen.getByRole('navigation', { name: 'Progress' })).toBeInTheDocument();
    expect(screen.getByText('Step 1 Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
  });

  it('navigates to next step when Next button is clicked', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    const onStepChange = vi.fn();
    render(<Stepper steps={mockSteps} onNext={onNext} onStepChange={onStepChange} />);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onStepChange).toHaveBeenCalledWith('step2');
    expect(screen.getByText('Step 2 Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeEnabled();
  });

  it('calls onComplete on the final step when Finish is clicked', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<Stepper steps={mockSteps} defaultStep="step3" onComplete={onComplete} />);

    expect(screen.getByText('Step 3 Content')).toBeInTheDocument();
    const finishBtn = screen.getByRole('button', { name: 'Finish' });
    await user.click(finishBtn);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('validates step before moving forward if onStepValidate is provided', async () => {
    const user = userEvent.setup();
    const onStepValidate = vi.fn().mockResolvedValue(false);
    const onStepChange = vi.fn();
    render(<Stepper steps={mockSteps} onStepValidate={onStepValidate} onStepChange={onStepChange} />);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onStepValidate).toHaveBeenCalledWith('step1');
    expect(onStepChange).not.toHaveBeenCalled();
    expect(screen.getByText('Step 1 Content')).toBeInTheDocument();
  });
});
