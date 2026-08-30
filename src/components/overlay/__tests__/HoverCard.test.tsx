import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { HoverCard } from '../HoverCard';

describe('HoverCard', () => {
  it('opens on hover, showing role="dialog" content with a default aria-label', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard content="Level 12 Warrior" openDelay={0}>
        <button type="button">PlayerName</button>
      </HoverCard>,
    );
    await user.hover(screen.getByText('PlayerName'));
    await waitFor(() =>
      expect(screen.getByRole('dialog', { name: 'Item preview' })).toBeInTheDocument(),
    );
    expect(screen.getByText('Level 12 Warrior')).toBeInTheDocument();
  });

  it('supports a custom aria-label', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard content="details" openDelay={0} aria-label="Player details">
        <button type="button">Trigger</button>
      </HoverCard>,
    );
    await user.hover(screen.getByText('Trigger'));
    await waitFor(() =>
      expect(screen.getByRole('dialog', { name: 'Player details' })).toBeInTheDocument(),
    );
  });

  it('calls onOpenChange/onOpen on the open transition', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onOpen = vi.fn();
    render(
      <HoverCard content="tip" openDelay={0} onOpenChange={onOpenChange} onOpen={onOpen}>
        <button type="button">Trigger</button>
      </HoverCard>,
    );
    await user.hover(screen.getByText('Trigger'));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
