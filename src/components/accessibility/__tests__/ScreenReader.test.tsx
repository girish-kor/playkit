import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ScreenReader } from '../ScreenReader';

describe('ScreenReader', () => {
  it('renders announcement message with aria-live and priority', async () => {
    const onAnnounce = vi.fn();
    render(
      <ScreenReader
        message="Score updated to 100"
        priority="assertive"
        debounce={0}
        onAnnounce={onAnnounce}
      />,
    );

    // Wait for debounce timer (0ms)
    const el = await screen.findByText('Score updated to 100');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-live', 'assertive');
    expect(onAnnounce).toHaveBeenCalledWith({ message: 'Score updated to 100', priority: 'assertive' });
  });
});
