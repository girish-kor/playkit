import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { InteractionPrompt } from '../InteractionPrompt';

describe('InteractionPrompt', () => {
  it('renders nothing when there is no target (documented no-op)', () => {
    const { container } = render(<InteractionPrompt target={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders role="status" with a label including the key hint', () => {
    render(<InteractionPrompt target={{ entity: {}, label: 'Open door' }} keyHint="F" />);
    expect(screen.getByRole('status', { name: 'Open door, press F' })).toBeInTheDocument();
  });

  it('defaults the key hint to "E" when none is given', () => {
    render(<InteractionPrompt target={{ entity: {}, label: 'Open door' }} />);
    expect(screen.getByRole('status', { name: 'Open door, press E' })).toBeInTheDocument();
  });

  it('calls onInteract on click when there is no hold duration', async () => {
    const user = userEvent.setup();
    const onInteract = vi.fn();
    render(
      <InteractionPrompt target={{ entity: {}, label: 'Open door' }} onInteract={onInteract} />,
    );
    await user.click(screen.getByRole('status'));
    expect(onInteract).toHaveBeenCalledTimes(1);
  });

  it('with a hold duration, onInteract only fires once holdProgress reaches 1', async () => {
    const user = userEvent.setup();
    const onInteract = vi.fn();
    const { rerender } = render(
      <InteractionPrompt
        target={{ entity: {}, label: 'Open door', holdDuration: 1000 }}
        holdProgress={0.5}
        onInteract={onInteract}
      />,
    );
    await user.click(screen.getByRole('status'));
    expect(onInteract).not.toHaveBeenCalled();
    rerender(
      <InteractionPrompt
        target={{ entity: {}, label: 'Open door', holdDuration: 1000 }}
        holdProgress={1}
        onInteract={onInteract}
      />,
    );
    await user.click(screen.getByRole('status'));
    expect(onInteract).toHaveBeenCalledTimes(1);
  });

  it('calls onHoldStart/onHoldCancel on pointer down/up when hold-interactable', () => {
    const onHoldStart = vi.fn();
    const onHoldCancel = vi.fn();
    render(
      <InteractionPrompt
        target={{ entity: {}, label: 'Open door', holdDuration: 1000 }}
        onHoldStart={onHoldStart}
        onHoldCancel={onHoldCancel}
      />,
    );
    const el = screen.getByRole('status');
    act(() => {
      el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    });
    expect(onHoldStart).toHaveBeenCalledTimes(1);
    act(() => {
      el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    });
    expect(onHoldCancel).toHaveBeenCalledTimes(1);
  });

  it('variant="compact" hides the label text', () => {
    render(<InteractionPrompt target={{ entity: {}, label: 'Open door' }} variant="compact" />);
    expect(screen.queryByText('Open door')).not.toBeInTheDocument();
  });
});
