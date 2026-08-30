import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SkipLink } from '../SkipLink';

describe('SkipLink', () => {
  it('renders skip link with correct href and label', () => {
    render(<SkipLink targetId="main-content" label="Skip to main" />);
    const link = screen.getByRole('link', { name: 'Skip to main' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('calls onSkip when activated', async () => {
    const user = userEvent.setup();
    const onSkip = vi.fn();
    render(<SkipLink targetId="main-content" label="Skip" onSkip={onSkip} />);
    const link = screen.getByRole('link', { name: 'Skip' });
    await user.click(link);
    expect(onSkip).toHaveBeenCalledWith({ targetId: 'main-content' });
  });
});
