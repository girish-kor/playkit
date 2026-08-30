import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Objective } from '../Objective';
import type { Objective as ObjectiveData } from '../../../types';

const objective: ObjectiveData = {
  id: 'find-key',
  name: 'Find the key',
  progress: 0,
  maxProgress: 1,
};

describe('Objective', () => {
  it('renders role="listitem" labeled with the objective name', () => {
    render(<Objective objective={objective} />);
    expect(screen.getByRole('listitem', { name: 'Find the key' })).toBeInTheDocument();
  });

  it('calls onClick/onDoubleClick from the row', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onDoubleClick = vi.fn();
    render(<Objective objective={objective} onClick={onClick} onDoubleClick={onDoubleClick} />);
    await user.click(screen.getByRole('button', { name: 'Find the key' }));
    expect(onClick).toHaveBeenCalledWith('find-key');
    await user.dblClick(screen.getByRole('button', { name: 'Find the key' }));
    expect(onDoubleClick).toHaveBeenCalledWith('find-key');
  });

  it('applies completed styling when isCompleted is true', () => {
    render(<Objective objective={objective} isCompleted />);
    expect(screen.getByRole('listitem').className).toContain('line-through');
  });

  it('derives completed from progress >= maxProgress when isCompleted is not given', () => {
    render(<Objective objective={{ ...objective, progress: 1 }} />);
    expect(screen.getByRole('listitem').className).toContain('line-through');
  });

  it('shows a Progress bar reflecting progress/maxProgress when showProgress (default true)', () => {
    render(<Objective objective={{ ...objective, progress: 1, maxProgress: 2 }} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  });

  it('subtasks: expand/collapse toggles visibility and calls onExpand/onCollapse/onToggle', async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();
    const onToggle = vi.fn();
    const withSubtasks: ObjectiveData = {
      ...objective,
      subtasks: [{ id: 'sub1', name: 'Search the drawer', completed: false }],
    };
    render(<Objective objective={withSubtasks} onExpand={onExpand} onToggle={onToggle} />);
    expect(screen.queryByText('Search the drawer')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Expand' }));
    expect(screen.getByText('Search the drawer')).toBeInTheDocument();
    expect(onExpand).toHaveBeenCalledWith('find-key');
    expect(onToggle).toHaveBeenCalledWith('find-key');
  });

  it('checking a subtask calls onSubtaskComplete and onSubtaskToggle', async () => {
    const user = userEvent.setup();
    const onSubtaskComplete = vi.fn();
    const onSubtaskToggle = vi.fn();
    const withSubtasks: ObjectiveData = {
      ...objective,
      subtasks: [{ id: 'sub1', name: 'Search the drawer', completed: false }],
    };
    render(
      <Objective
        objective={withSubtasks}
        variant="with-subtasks"
        onSubtaskComplete={onSubtaskComplete}
        onSubtaskToggle={onSubtaskToggle}
      />,
    );
    await user.click(screen.getByRole('checkbox', { name: 'Search the drawer' }));
    expect(onSubtaskComplete).toHaveBeenCalledWith('sub1');
    expect(onSubtaskToggle).toHaveBeenCalledWith('sub1');
  });
});
