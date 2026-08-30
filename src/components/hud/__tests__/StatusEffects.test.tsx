import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { StatusEffects } from '../StatusEffects';
import type { StatusEffect } from '../../../types';

const effects: StatusEffect[] = [
  { id: 'poison', name: 'Poison', type: 'debuff', icon: 'skull', remaining: 5 },
  { id: 'haste', name: 'Haste', type: 'buff', icon: 'zap', remaining: 10 },
];

describe('StatusEffects', () => {
  it('renders role="list" with one role="listitem" per effect', () => {
    render(<StatusEffects effects={effects} />);
    expect(screen.getByRole('list', { name: 'Status effects' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('labels each item with its name and remaining duration', () => {
    render(<StatusEffects effects={effects} />);
    expect(
      screen.getByRole('listitem', { name: 'Poison, 5 seconds remaining' }),
    ).toBeInTheDocument();
  });

  it('calls onEffectClick when a clickable effect is activated', async () => {
    const user = userEvent.setup();
    const onEffectClick = vi.fn();
    render(<StatusEffects effects={effects} onEffectClick={onEffectClick} />);
    await user.click(screen.getByRole('listitem', { name: 'Poison, 5 seconds remaining' }));
    expect(onEffectClick).toHaveBeenCalledWith('poison');
  });

  it('calls onEffectExpire once remaining crosses from > 0 to <= 0', () => {
    const onEffectExpire = vi.fn();
    const { rerender } = render(
      <StatusEffects
        effects={[{ id: 'poison', name: 'Poison', type: 'debuff', icon: 'skull', remaining: 1 }]}
        onEffectExpire={onEffectExpire}
      />,
    );
    rerender(
      <StatusEffects
        effects={[{ id: 'poison', name: 'Poison', type: 'debuff', icon: 'skull', remaining: 0 }]}
        onEffectExpire={onEffectExpire}
      />,
    );
    expect(onEffectExpire).toHaveBeenCalledWith('poison');
  });

  it('maxVisible truncates the list and shows an overflow indicator', () => {
    render(<StatusEffects effects={effects} maxVisible={1} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('showStacks renders a Badge for stacked effects', () => {
    render(
      <StatusEffects
        effects={[{ id: 'poison', name: 'Poison', type: 'debuff', icon: 'skull', stacks: 3 }]}
      />,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
