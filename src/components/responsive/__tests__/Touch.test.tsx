import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Touch } from '../Touch';
import type { TouchControl } from '../../../types';

const mockControls: TouchControl[] = [
  { id: 'j1', type: 'joystick', label: 'Move Joystick' },
  { id: 'b1', type: 'button', label: 'Jump Button' },
];

describe('Touch', () => {
  it('renders touch controls container and controls', () => {
    render(<Touch controls={mockControls} aria-label="Touch Pad" />);
    expect(screen.getByRole('group', { name: 'Touch Pad' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Move Joystick' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Jump Button' })).toBeInTheDocument();
  });
});
