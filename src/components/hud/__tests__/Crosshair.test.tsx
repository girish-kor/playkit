import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../../test/pcMocks';
import { pcWrapper } from '../../../test/renderWithPC';
import { Crosshair } from '../Crosshair';

describe('Crosshair', () => {
  it('is aria-hidden with role="none" when no aria-label is given (purely decorative)', () => {
    const { container } = render(<Crosshair />);
    const el = container.firstElementChild!;
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).toHaveAttribute('role', 'none');
  });

  it('uses role="img" with the given aria-label when provided', () => {
    render(<Crosshair aria-label="Reticle" />);
    expect(screen.getByRole('img', { name: 'Reticle' })).toBeInTheDocument();
  });

  it('calls onTargetEnter/onTargetChange when the raycaster starts hitting something, and onTargetLeave when it stops', () => {
    vi.useFakeTimers();
    const cameraComponent = {
      screenToWorld: () => ({ x: 0, y: 0, z: 0 }),
      farClip: 1000,
    };
    const cameraEntity = createMockEntity({ guid: 'cam' });
    (cameraEntity as unknown as { camera: unknown }).camera = cameraComponent;
    const hitEntity = { id: 'enemy' };
    const app = createMockApp({ entities: { cam: cameraEntity } });
    (app as unknown as { systems: unknown }).systems = {
      rigidbody: { raycastFirst: () => ({ entity: hitEntity }) },
    };
    const onTargetEnter = vi.fn();
    const onTargetChange = vi.fn();

    render(
      <Crosshair
        pcEntity="cam"
        throttleRate={20}
        onTargetEnter={onTargetEnter}
        onTargetChange={onTargetChange}
      />,
      {
        wrapper: pcWrapper({ app }),
      },
    );

    act(() => vi.advanceTimersByTime(50));
    expect(onTargetChange).toHaveBeenCalledWith({ entity: hitEntity, distance: 0 });
    expect(onTargetEnter).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('calls onInteract with the current target on click', async () => {
    const user = userEvent.setup();
    const onInteract = vi.fn();
    const { container } = render(<Crosshair onInteract={onInteract} />);
    await user.click(container.firstElementChild!);
    expect(onInteract).toHaveBeenCalledWith(null);
  });

  it('type: "custom" renders via the render prop', () => {
    render(
      <Crosshair
        type="custom"
        aria-label="Reticle"
        render={() => <span data-testid="custom-reticle" />}
      />,
    );
    expect(screen.getByTestId('custom-reticle')).toBeInTheDocument();
  });
});
