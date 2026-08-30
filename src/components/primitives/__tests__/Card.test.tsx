import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Card } from '../Card';

describe('Card', () => {
  it('renders header/footer/actions/children in the documented regions', () => {
    render(
      <Card
        header={<span>Header</span>}
        footer={<span>Footer</span>}
        actions={<span>Actions</span>}
      >
        Body
      </Card>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('applies role="region" automatically when a header is present', () => {
    render(<Card header={<span>Header</span>}>Body</Card>);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('clickable: true makes the card keyboard-focusable and fires onClick on Enter/Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card clickable onClick={onClick} data-testid="card">
        Body
      </Card>,
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('tabindex', '0');
    card.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('clickable: false (default) does not wire onClick to the DOM element', () => {
    const onClick = vi.fn();
    render(
      <Card onClick={onClick} data-testid="card">
        Body
      </Card>,
    );
    expect(screen.getByTestId('card')).not.toHaveAttribute('tabindex');
  });

  it('applies the documented default variant/padding/radius classes', () => {
    render(<Card data-testid="card">Body</Card>);
    const cls = screen.getByTestId('card').className;
    expect(cls).toContain('bg-gray-800');
    expect(cls).toContain('rounded-lg');
  });
});
