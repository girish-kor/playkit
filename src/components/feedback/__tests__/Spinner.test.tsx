import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders role="status" with aria-busy and the default "Loading" label', () => {
    render(<Spinner />);
    const el = screen.getByRole('status');
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(el).toHaveAttribute('aria-label', 'Loading');
  });

  it('supports a custom label', () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole('status', { name: 'Saving' })).toBeInTheDocument();
  });

  it('calls onProgress on progress changes, and onLoad/onComplete once it reaches 1', () => {
    const onProgress = vi.fn();
    const onLoad = vi.fn();
    const onComplete = vi.fn();
    const { rerender } = render(
      <Spinner progress={0.2} onProgress={onProgress} onLoad={onLoad} onComplete={onComplete} />,
    );
    rerender(
      <Spinner progress={1} onProgress={onProgress} onLoad={onLoad} onComplete={onComplete} />,
    );
    expect(onProgress).toHaveBeenCalledWith(1);
    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('showProgress renders the rounded percentage text', () => {
    render(<Spinner progress={0.42} showProgress />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('variant="dots" renders three bouncing dots instead of the spin ring', () => {
    const { container } = render(<Spinner variant="dots" />);
    expect(container.querySelectorAll('.animate-bounce')).toHaveLength(3);
  });

  it('variant="pulse" renders a single pulsing indicator', () => {
    const { container } = render(<Spinner variant="pulse" />);
    expect(container.querySelector('.animate-pulse')).not.toBeNull();
  });
});
