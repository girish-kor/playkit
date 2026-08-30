import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders the numeric content', () => {
    render(<Badge content={3} aria-label="unread" />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('caps numeric content at max, appending a plus sign', () => {
    render(<Badge content={150} max={99} aria-label="unread" />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('hides a zero count by default, shows it when showZero is true', () => {
    const { rerender } = render(<Badge content={0} aria-label="unread" />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    rerender(<Badge content={0} showZero aria-label="unread" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('the dot variant renders regardless of content', () => {
    const { container } = render(<Badge variant="dot" aria-label="status" />);
    expect(container.querySelector('.w-2.h-2')).not.toBeNull();
  });

  it('overlays on children rather than replacing them when children are given', () => {
    render(
      <Badge content={2} aria-label="unread">
        <span data-testid="icon" />
      </Badge>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
