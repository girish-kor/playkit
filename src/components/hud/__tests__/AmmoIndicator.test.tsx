import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AmmoIndicator } from '../AmmoIndicator';

describe('AmmoIndicator', () => {
  it('renders role="status" with a descriptive default aria-label', () => {
    render(<AmmoIndicator current={12} magazineSize={30} reserve={90} />);
    expect(
      screen.getByRole('status', { name: '12 of 30 rounds (+90 reserve)' }),
    ).toBeInTheDocument();
  });

  it('calls onLowAmmo once when crossing the lowAmmoThreshold, and onEmpty at 0', () => {
    const onLowAmmo = vi.fn();
    const onEmpty = vi.fn();
    const { rerender } = render(
      <AmmoIndicator
        current={30}
        magazineSize={30}
        lowAmmoThreshold={0.25}
        onLowAmmo={onLowAmmo}
        onEmpty={onEmpty}
      />,
    );
    rerender(
      <AmmoIndicator
        current={5}
        magazineSize={30}
        lowAmmoThreshold={0.25}
        onLowAmmo={onLowAmmo}
        onEmpty={onEmpty}
      />,
    );
    expect(onLowAmmo).toHaveBeenCalledTimes(1);
    rerender(
      <AmmoIndicator
        current={0}
        magazineSize={30}
        lowAmmoThreshold={0.25}
        onLowAmmo={onLowAmmo}
        onEmpty={onEmpty}
      />,
    );
    expect(onEmpty).toHaveBeenCalledTimes(1);
  });

  it('calls onReloadStart/onReloadComplete on isReloading transitions', () => {
    const onReloadStart = vi.fn();
    const onReloadComplete = vi.fn();
    const { rerender } = render(
      <AmmoIndicator
        current={10}
        magazineSize={30}
        isReloading={false}
        onReloadStart={onReloadStart}
        onReloadComplete={onReloadComplete}
      />,
    );
    rerender(
      <AmmoIndicator
        current={10}
        magazineSize={30}
        isReloading
        onReloadStart={onReloadStart}
        onReloadComplete={onReloadComplete}
      />,
    );
    expect(onReloadStart).toHaveBeenCalledTimes(1);
    rerender(
      <AmmoIndicator
        current={30}
        magazineSize={30}
        isReloading={false}
        onReloadStart={onReloadStart}
        onReloadComplete={onReloadComplete}
      />,
    );
    expect(onReloadComplete).toHaveBeenCalledTimes(1);
  });

  it('variant="bullets" renders one indicator per magazine slot', () => {
    const { container } = render(<AmmoIndicator current={3} magazineSize={6} variant="bullets" />);
    expect(container.querySelectorAll('span.h-3')).toHaveLength(6);
  });

  it('applies a low-ammo visual treatment once at/under the threshold', () => {
    render(
      <AmmoIndicator current={2} magazineSize={30} lowAmmoThreshold={0.25} data-testid="ammo" />,
    );
    expect(screen.getByRole('status').className).toContain('text-red-500');
  });
});
