import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { A11y, useA11yContext } from '../A11y';

function TestConsumer() {
  const ctx = useA11yContext();
  return (
    <div>
      <span data-testid="motion">{String(ctx?.prefersReducedMotion)}</span>
      <span data-testid="contrast">{String(ctx?.prefersHighContrast)}</span>
      <button onClick={() => ctx?.announce('test_key')}>Announce</button>
    </div>
  );
}

describe('A11y', () => {
  it('provides accessibility context with announcements and preferences', async () => {
    const onAnnounce = vi.fn();
    const onPreferenceChange = vi.fn();
    const announcements = { test_key: 'Test announcement message' };

    render(
      <A11y
        announcements={announcements}
        reducedMotion={true}
        highContrast={false}
        onAnnounce={onAnnounce}
        onPreferenceChange={onPreferenceChange}
      >
        <TestConsumer />
      </A11y>,
    );

    expect(screen.getByTestId('motion')).toHaveTextContent('true');
    expect(screen.getByTestId('contrast')).toHaveTextContent('false');

    const btn = screen.getByRole('button', { name: 'Announce' });
    await act(async () => {
      btn.click();
    });

    expect(onAnnounce).toHaveBeenCalledWith('Test announcement message');
  });
});
