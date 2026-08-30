import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Objectives } from '../Objectives';
import type { Objective as ObjectiveData } from '../../../types';

const objectives: ObjectiveData[] = [
  { id: 'a', name: 'Objective A', progress: 0, maxProgress: 1 },
  { id: 'b', name: 'Objective B', progress: 1, maxProgress: 1 },
];

describe('Objectives', () => {
  it('renders role="navigation" with one Objective row per objective', () => {
    render(<Objectives objectives={objectives} />);
    expect(screen.getByRole('navigation', { name: 'Objectives' })).toBeInTheDocument();
    expect(screen.getByText('Objective A')).toBeInTheDocument();
    expect(screen.getByText('Objective B')).toBeInTheDocument();
  });

  it('renders the emptyState (or a default message) when there are no objectives', () => {
    const { rerender } = render(<Objectives objectives={[]} />);
    expect(screen.getByText('No objectives')).toBeInTheDocument();
    rerender(<Objectives objectives={[]} emptyState={<span>Nothing to do</span>} />);
    expect(screen.getByText('Nothing to do')).toBeInTheDocument();
  });

  it('showCompleted: false filters out already-complete objectives', () => {
    render(<Objectives objectives={objectives} showCompleted={false} />);
    expect(screen.getByText('Objective A')).toBeInTheDocument();
    expect(screen.queryByText('Objective B')).not.toBeInTheDocument();
  });

  it('sortOrder="alphabetical" sorts objectives by name', () => {
    const unsorted: ObjectiveData[] = [
      { id: 'z', name: 'Zebra quest' },
      { id: 'a', name: 'Aardvark quest' },
    ];
    render(<Objectives objectives={unsorted} sortOrder="alphabetical" />);
    const names = screen.getAllByRole('listitem').map((el) => el.textContent);
    expect(names[0]).toContain('Aardvark quest');
    expect(names[1]).toContain('Zebra quest');
  });

  it('calls onComplete/onObjectiveComplete once when an objective transitions to complete', () => {
    const onComplete = vi.fn();
    const onObjectiveComplete = vi.fn();
    const { rerender } = render(
      <Objectives
        objectives={[{ id: 'a', name: 'A', progress: 0, maxProgress: 1 }]}
        onComplete={onComplete}
        onObjectiveComplete={onObjectiveComplete}
      />,
    );
    rerender(
      <Objectives
        objectives={[{ id: 'a', name: 'A', progress: 1, maxProgress: 1 }]}
        onComplete={onComplete}
        onObjectiveComplete={onObjectiveComplete}
      />,
    );
    expect(onComplete).toHaveBeenCalledWith('a');
    expect(onObjectiveComplete).toHaveBeenCalledWith('a');
  });

  it('calls onObjectiveAdd/onObjectiveRemove when the objectives list changes membership', () => {
    const onObjectiveAdd = vi.fn();
    const onObjectiveRemove = vi.fn();
    const { rerender } = render(
      <Objectives
        objectives={[{ id: 'a', name: 'A' }]}
        onObjectiveAdd={onObjectiveAdd}
        onObjectiveRemove={onObjectiveRemove}
      />,
    );
    rerender(
      <Objectives
        objectives={[{ id: 'b', name: 'B' }]}
        onObjectiveAdd={onObjectiveAdd}
        onObjectiveRemove={onObjectiveRemove}
      />,
    );
    expect(onObjectiveAdd).toHaveBeenCalledWith(expect.objectContaining({ id: 'b' }));
    expect(onObjectiveRemove).toHaveBeenCalledWith('a');
  });
});
