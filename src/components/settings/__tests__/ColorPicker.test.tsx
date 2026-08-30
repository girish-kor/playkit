import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ColorPicker } from '../ColorPicker';

describe('ColorPicker', () => {
  it('renders swatch button with color value', () => {
    render(<ColorPicker value="#ff0000" onChange={() => {}} label="Theme Color" />);
    expect(screen.getByText('Theme Color')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Color: #ff0000' })).toBeInTheDocument();
  });

  it('opens popover and triggers onChange when preset is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const presets = ['#000000', '#ffffff'];
    render(<ColorPicker value="#ff0000" onChange={onChange} presets={presets} label="Color" />);
    
    await user.click(screen.getByRole('button', { name: 'Color: #ff0000' }));
    const presetBtn = screen.getByRole('button', { name: '#ffffff' });
    expect(presetBtn).toBeInTheDocument();

    await user.click(presetBtn);
    expect(onChange).toHaveBeenCalledWith('#ffffff');
  });

  it('respects disabled prop', () => {
    render(<ColorPicker value="#ff0000" onChange={() => {}} disabled />);
    expect(screen.getByRole('button', { name: 'Color: #ff0000' })).toBeDisabled();
  });
});
