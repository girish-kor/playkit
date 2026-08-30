import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Rating } from '../Rating';

describe('Rating', () => {
  it('renders readOnly rating with img role', () => {
    render(<Rating value={3} max={5} readOnly aria-label="Rating 3 of 5" />);
    expect(screen.getByRole('img', { name: 'Rating 3 of 5' })).toBeInTheDocument();
  });

  it('renders interactive rating with radiogroup role and radio buttons', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={2} max={5} onChange={onChange} label="Score" showValue />);
    
    expect(screen.getByText('Score')).toBeInTheDocument();
    const radioGroup = screen.getByRole('radiogroup', { name: 'Score' });
    expect(radioGroup).toBeInTheDocument();

    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);
    expect(stars[1]).toHaveAttribute('aria-checked', 'true');

    await user.click(stars[3]);
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onHover on mouse enter and clears on mouse leave', async () => {
    const user = userEvent.setup();
    const onHover = vi.fn();
    render(<Rating value={1} max={3} onChange={() => {}} onHover={onHover} />);
    const stars = screen.getAllByRole('radio');

    await user.hover(stars[2]);
    expect(onHover).toHaveBeenCalledWith(3);

    const radioGroup = screen.getByRole('radiogroup');
    await user.unhover(radioGroup);
    expect(onHover).toHaveBeenLastCalledWith(null);
  });
});
