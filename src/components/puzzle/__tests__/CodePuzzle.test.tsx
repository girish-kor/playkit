import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CodePuzzle } from '../CodePuzzle';

describe('CodePuzzle', () => {
  it('renders one digit input per codeLength, labeled by position', () => {
    render(<CodePuzzle codeLength={4} correctCode="1234" />);
    expect(screen.getByLabelText('Digit 1 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Digit 4 of 4')).toBeInTheDocument();
  });

  it('typing a digit auto-advances focus to the next input', async () => {
    const user = userEvent.setup();
    render(<CodePuzzle codeLength={3} correctCode="123" />);
    await user.type(screen.getByLabelText('Digit 1 of 3'), '1');
    expect(screen.getByLabelText('Digit 2 of 3')).toHaveFocus();
  });

  it('calls onCodeComplete once every digit is filled', async () => {
    const user = userEvent.setup();
    const onCodeComplete = vi.fn();
    render(<CodePuzzle codeLength={2} correctCode="12" onCodeComplete={onCodeComplete} />);
    await user.type(screen.getByLabelText('Digit 1 of 2'), '1');
    await user.type(screen.getByLabelText('Digit 2 of 2'), '2');
    expect(onCodeComplete).toHaveBeenCalledWith('12');
  });

  it('Submit calls onSubmit, and onSuccess when the code matches', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const onSubmit = vi.fn();
    render(
      <CodePuzzle codeLength={2} correctCode="12" onSuccess={onSuccess} onSubmit={onSubmit} />,
    );
    await user.type(screen.getByLabelText('Digit 1 of 2'), '1');
    await user.type(screen.getByLabelText('Digit 2 of 2'), '2');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledWith('12');
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('calls onInvalid/onFailure and clears the code on a wrong submission when clearOnInvalid', async () => {
    const user = userEvent.setup();
    const onInvalid = vi.fn();
    const onFailure = vi.fn();
    render(
      <CodePuzzle
        codeLength={2}
        correctCode="12"
        clearOnInvalid
        onInvalid={onInvalid}
        onFailure={onFailure}
      />,
    );
    await user.type(screen.getByLabelText('Digit 1 of 2'), '9');
    await user.type(screen.getByLabelText('Digit 2 of 2'), '9');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onInvalid).toHaveBeenCalledTimes(1);
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('Digit 1 of 2')).toHaveValue(null);
  });

  it('autoSubmit submits automatically once all digits are filled, without a Submit button', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    render(<CodePuzzle codeLength={2} correctCode="12" autoSubmit onSuccess={onSuccess} />);
    expect(screen.queryByRole('button', { name: 'Submit' })).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('Digit 1 of 2'), '1');
    await user.type(screen.getByLabelText('Digit 2 of 2'), '2');
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('Backspace on an empty digit moves focus to the previous input', async () => {
    const user = userEvent.setup();
    render(<CodePuzzle codeLength={3} correctCode="123" />);
    await user.type(screen.getByLabelText('Digit 1 of 3'), '1');
    const second = screen.getByLabelText('Digit 2 of 3');
    expect(second).toHaveFocus();
    await user.keyboard('{Backspace}');
    expect(screen.getByLabelText('Digit 1 of 3')).toHaveFocus();
  });

  it('Clear resets all digits and calls onClear', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<CodePuzzle codeLength={2} correctCode="12" onClear={onClear} />);
    await user.type(screen.getByLabelText('Digit 1 of 2'), '1');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('Digit 1 of 2')).toHaveValue(null);
  });

  it('accepts an array of correctCode segments, joined for comparison', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    render(<CodePuzzle codeLength={4} correctCode={['12', '34']} onSuccess={onSuccess} />);
    for (const [i, ch] of ['1', '2', '3', '4'].entries()) {
      await user.type(screen.getByLabelText(`Digit ${i + 1} of 4`), ch);
    }
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
