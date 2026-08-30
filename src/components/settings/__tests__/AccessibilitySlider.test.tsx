import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AccessibilitySlider } from '../AccessibilitySlider';

describe('AccessibilitySlider', () => {
  it('renders label and slider with preview text', () => {
    render(
      <AccessibilitySlider
        label="Text Scale"
        value={16}
        min={12}
        max={24}
        onChange={() => {}}
        previewText="Sample text"
      />,
    );
    expect(screen.getAllByText('Text Scale')[0]).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Text Scale' })).toBeInTheDocument();
    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });

  it('calls onChange when slider value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AccessibilitySlider
        label="Text Scale"
        value={16}
        min={12}
        max={24}
        step={2}
        onChange={onChange}
      />,
    );
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(18);
  });

  it('resets to defaultValue when reset button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AccessibilitySlider
        label="Text Scale"
        value={20}
        min={12}
        max={24}
        defaultValue={16}
        resettable={true}
        onChange={onChange}
      />,
    );
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    await user.click(resetButton);
    expect(onChange).toHaveBeenCalledWith(16);
  });
});
