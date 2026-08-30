import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Icon } from '../Icon';

describe('Icon', () => {
  it('resolves a kebab-case name to the matching Lucide icon and renders an svg', () => {
    const { container } = render(<Icon name="star" aria-label="star icon" />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders nothing for an unrecognized icon name (documented no-throw degradation)', () => {
    const { container } = render(<Icon name="not-a-real-icon-xyz" />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('is clickable and reports role="button" when onClick is given', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Icon name="star" onClick={onClick} aria-label="favorite" />);
    await user.click(screen.getByRole('button', { name: 'favorite' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not interactive (no button role) when onClick is not given', () => {
    render(<Icon name="star" aria-label="star" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies a rotate transform when rotate is given', () => {
    const { container } = render(<Icon name="star" rotate={90} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('style') ?? '').toContain('rotate(90deg)');
  });
});
