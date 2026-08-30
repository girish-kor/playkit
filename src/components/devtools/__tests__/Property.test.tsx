import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Property } from '../Property';
import type { PropertyDef } from '../../../types';

const mockProperties: PropertyDef[] = [
  { key: 'active', label: 'Active', type: 'boolean' },
  { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 100 },
  { key: 'title', label: 'Title', type: 'string' },
  { key: 'tint', label: 'Tint', type: 'color' },
];

describe('Property', () => {
  it('renders property form and controls', () => {
    render(
      <Property
        entity={{}}
        properties={mockProperties}
        onChange={() => {}}
        onApply={() => {}}
        onRevert={() => {}}
      />,
    );
    expect(screen.getByRole('form', { name: 'Property editor' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Speed' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
  });

  it('calls onChange when a property input changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Property
        entity={{}}
        properties={mockProperties}
        onChange={onChange}
        onApply={() => {}}
        onRevert={() => {}}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Active' });
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledWith('active', true, mockProperties[0]);
  });
});
