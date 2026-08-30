import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Compass } from '../Compass';

describe('Compass', () => {
  it('renders with role="img" and the given/default aria-label', () => {
    render(<Compass />);
    expect(screen.getByRole('img', { name: 'Compass' })).toBeInTheDocument();
  });

  it('renders a marker button per entry, labeled with the marker label', () => {
    render(
      <Compass markers={[{ id: 'm1', label: 'Quest Marker', position: { x: 0, y: 0, z: 1 } }]} />,
    );
    expect(screen.getByRole('button', { name: 'Quest Marker' })).toBeInTheDocument();
  });

  it('clicking a marker calls both onMarkerSelect and onMarkerClick with its id', async () => {
    const user = userEvent.setup();
    const onMarkerSelect = vi.fn();
    const onMarkerClick = vi.fn();
    render(
      <Compass
        markers={[{ id: 'm1', label: 'Quest', position: { x: 0, y: 0, z: 1 } }]}
        onMarkerSelect={onMarkerSelect}
        onMarkerClick={onMarkerClick}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Quest' }));
    expect(onMarkerSelect).toHaveBeenCalledWith('m1');
    expect(onMarkerClick).toHaveBeenCalledWith('m1');
  });

  it('clicking the sr-only lock control toggles locked state and calls onHeadingLock', async () => {
    const user = userEvent.setup();
    const onHeadingLock = vi.fn();
    render(<Compass onHeadingLock={onHeadingLock} />);
    const lockButton = screen.getByRole('button', { name: 'Lock heading' });
    await user.click(lockButton);
    expect(onHeadingLock).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Unlock heading' })).toBeInTheDocument();
  });

  it('variant="minimal" shows a numeric heading instead of the marker layout', () => {
    render(<Compass variant="minimal" />);
    expect(screen.getByText('0°')).toBeInTheDocument();
  });

  it('clicking North calls onNorthClick', async () => {
    const user = userEvent.setup();
    const onNorthClick = vi.fn();
    render(<Compass onNorthClick={onNorthClick} />);
    await user.click(screen.getByRole('button', { name: 'North' }));
    expect(onNorthClick).toHaveBeenCalledTimes(1);
  });
});
