import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TerrainPainter } from '../TerrainPainter';
import type { TerrainTexture } from '../TerrainPainter';

const mockTextures: TerrainTexture[] = [
  { id: 'grass', name: 'Grass', thumbnail: '/grass.png' },
  { id: 'dirt', name: 'Dirt', thumbnail: '/dirt.png' },
];

describe('TerrainPainter', () => {
  it('renders terrain painter toolbar with mode buttons and sliders', () => {
    render(
      <TerrainPainter
        mode="height"
        brushSize={10}
        brushStrength={0.5}
        textures={mockTextures}
        onModeChange={() => {}}
      />,
    );
    expect(screen.getByRole('toolbar', { name: 'Terrain painter' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'height' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'texture' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'smooth' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Brush size' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Brush strength' })).toBeInTheDocument();
  });

  it('calls onModeChange when mode button is clicked', async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();
    render(
      <TerrainPainter
        mode="height"
        onModeChange={onModeChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'smooth' }));
    expect(onModeChange).toHaveBeenCalledWith('smooth');
  });

  it('renders texture buttons when mode is texture', async () => {
    const user = userEvent.setup();
    const onTextureSelect = vi.fn();
    render(
      <TerrainPainter
        mode="texture"
        textures={mockTextures}
        activeTexture="grass"
        onTextureSelect={onTextureSelect}
        onModeChange={() => {}}
      />,
    );

    const grassBtn = screen.getByRole('button', { name: 'Grass' });
    expect(grassBtn).toBeInTheDocument();
    expect(grassBtn).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Dirt' }));
    expect(onTextureSelect).toHaveBeenCalledWith('dirt');
  });
});
