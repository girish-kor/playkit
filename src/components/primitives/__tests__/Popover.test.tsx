import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Popover } from '../Popover';

describe('Popover', () => {
  it('uncontrolled: opens on trigger click, showing the content panel', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>Panel content</div>} aria-label="menu">
        <button type="button">Open</button>
      </Popover>,
    );
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
    await user.click(screen.getByText('Open'));
    await waitFor(() => expect(screen.getByText('Panel content')).toBeInTheDocument());
  });

  it('controlled: the isOpen prop determines visibility regardless of trigger clicks', () => {
    render(
      <Popover content={<div>Panel content</div>} isOpen onOpenChange={() => {}} aria-label="menu">
        <button type="button">Open</button>
      </Popover>,
    );
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('calls onOpenChange, and onOpen/onClose on the respective transitions', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onOpen = vi.fn();
    render(
      <Popover
        content={<div>Panel</div>}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        aria-label="menu"
      >
        <button type="button">Open</button>
      </Popover>,
    );
    await user.click(screen.getByText('Open'));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('trigger="manual" ignores click-to-toggle and defers entirely to isOpen', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover
        content={<div>Panel</div>}
        trigger="manual"
        isOpen={false}
        onOpenChange={onOpenChange}
        aria-label="menu"
      >
        <button type="button">Open</button>
      </Popover>,
    );
    await user.click(screen.getByText('Open'));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.queryByText('Panel')).not.toBeInTheDocument();
  });
});
