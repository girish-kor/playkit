import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('opens on hover, showing the content', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Deals 10 damage" openDelay={0}>
        <button type="button">Sword</button>
      </Tooltip>,
    );
    expect(screen.queryByText('Deals 10 damage')).not.toBeInTheDocument();
    await user.hover(screen.getByText('Sword'));
    await waitFor(() => expect(screen.getByText('Deals 10 damage')).toBeInTheDocument());
  });

  it('calls onOpenChange and onOpen on the open transition', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onOpen = vi.fn();
    render(
      <Tooltip content="tip" openDelay={0} onOpenChange={onOpenChange} onOpen={onOpen}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Trigger'));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('calls the wrapped childs own onMouseEnter/onMouseLeave alongside the tooltip trigger', async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    render(
      <Tooltip content="tip" openDelay={0} onMouseEnter={onMouseEnter}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Trigger'));
    expect(onMouseEnter).toHaveBeenCalled();
  });
});
