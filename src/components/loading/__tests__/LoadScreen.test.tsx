import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LoadScreen } from '../LoadScreen';

describe('LoadScreen', () => {
  it('renders progressbar with default aria-label "Loading"', () => {
    render(<LoadScreen onLoadComplete={() => {}} />);
    const el = screen.getByRole('progressbar', { name: 'Loading' });
    expect(el).toBeInTheDocument();
  });

  it('calls onLoadStart on mount', () => {
    const onLoadStart = vi.fn();
    render(<LoadScreen onLoadStart={onLoadStart} onLoadComplete={() => {}} />);
    expect(onLoadStart).toHaveBeenCalledTimes(1);
  });

  it('renders tips when variant is with-tips or full and tips are provided', () => {
    const tips = ['Tip 1: Explore the world', 'Tip 2: Craft items'];
    render(<LoadScreen variant="with-tips" tips={tips} onLoadComplete={() => {}} />);
    expect(screen.getByText('Tip 1: Explore the world')).toBeInTheDocument();
  });

  it('renders logo when variant is with-logo and logo prop is provided', () => {
    render(
      <LoadScreen
        variant="with-logo"
        logo="/assets/logo.png"
        onLoadComplete={() => {}}
      />,
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/assets/logo.png');
  });

  it('calls onSkip when clicked if onSkip is provided', async () => {
    const user = userEvent.setup();
    const onSkip = vi.fn();
    render(<LoadScreen onSkip={onSkip} onLoadComplete={() => {}} />);
    const progressbar = screen.getByRole('progressbar', { name: 'Loading' });
    await user.click(progressbar);
    expect(onSkip).toHaveBeenCalledWith(expect.objectContaining({ progressAtSkip: expect.any(Number) }));
  });
});
