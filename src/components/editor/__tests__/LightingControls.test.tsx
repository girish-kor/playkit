import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LightingControls } from '../LightingControls';

describe('LightingControls', () => {
  it('renders lighting controls form with color picker and intensity slider', () => {
    render(
      <LightingControls
        lightType="directional"
        color="#ffffff"
        intensity={1.0}
        direction={{ x: 0, y: -1, z: 0 }}
        castShadows={true}
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole('form', { name: 'Lighting controls' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Color: #ffffff' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Intensity' })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Cast Shadows' })).toBeInTheDocument();
  });

  it('calls onIntensityChange when intensity slider changes', async () => {
    const user = userEvent.setup();
    const onIntensityChange = vi.fn();
    render(
      <LightingControls
        lightType="ambient"
        color="#ffffff"
        intensity={1.0}
        onIntensityChange={onIntensityChange}
      />,
    );

    const slider = screen.getByRole('slider', { name: 'Intensity' });
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onIntensityChange).toHaveBeenCalled();
  });

  it('renders direction sliders for directional light', () => {
    render(
      <LightingControls
        lightType="directional"
        color="#ffffff"
        intensity={1.0}
        direction={{ x: 0, y: -1, z: 0 }}
      />,
    );
    expect(screen.getByRole('slider', { name: 'X' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Y' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Z' })).toBeInTheDocument();
  });
});
