import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Minimap } from '../Minimap';

describe('Minimap', () => {
  it('renders with role="img" and a default aria-label', () => {
    render(<Minimap />);
    expect(screen.getByRole('img', { name: 'Minimap' })).toBeInTheDocument();
  });

  it('renders one marker button per entry, and calls onMarkerClick with its id', async () => {
    const user = userEvent.setup();
    const onMarkerClick = vi.fn();
    render(
      <Minimap
        markers={[{ id: 'm1', label: 'Chest', position: { x: 1, y: 0, z: 1 } }]}
        onMarkerClick={onMarkerClick}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Chest' }));
    expect(onMarkerClick).toHaveBeenCalledWith('m1');
  });

  it('variant="minimal" suppresses marker rendering', () => {
    render(
      <Minimap
        variant="minimal"
        markers={[{ id: 'm1', label: 'Chest', position: { x: 1, y: 0, z: 1 } }]}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Chest' })).not.toBeInTheDocument();
  });

  it('the corner-variant expand button toggles fullscreen and calls onToggleFullscreen', async () => {
    const user = userEvent.setup();
    const onToggleFullscreen = vi.fn();
    render(<Minimap variant="corner" onToggleFullscreen={onToggleFullscreen} />);
    await user.click(screen.getByRole('button', { name: 'Expand minimap' }));
    expect(onToggleFullscreen).toHaveBeenCalledTimes(1);
  });

  it('the sr-only zoom controls call onZoomChange', async () => {
    const user = userEvent.setup();
    const onZoomChange = vi.fn();
    render(<Minimap onZoomChange={onZoomChange} />);
    await user.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(onZoomChange).toHaveBeenCalled();
  });
});
