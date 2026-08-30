import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TreeView } from '../TreeView';
import type { TreeNode } from '../../../types';

const data: TreeNode[] = [
  { id: 'root', label: 'Root', children: [{ id: 'child', label: 'Child' }] },
  { id: 'leaf', label: 'Leaf' },
];

describe('TreeView', () => {
  it('renders root nodes with role tree/treeitem and hides children until expanded', () => {
    render(<TreeView data={data} aria-label="Files" />);
    expect(screen.getByRole('tree', { name: 'Files' })).toBeInTheDocument();
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.queryByText('Child')).not.toBeInTheDocument();
  });

  it('toggling a node with children expands it and calls onExpand/onToggle', async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();
    const onToggle = vi.fn();
    render(<TreeView data={data} onExpand={onExpand} onToggle={onToggle} aria-label="Files" />);
    await user.click(screen.getByRole('button', { name: 'Expand' }));
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(onExpand).toHaveBeenCalledWith('root');
    expect(onToggle).toHaveBeenCalledWith('root');
  });

  it('controlled expanded prop wins over internal state', () => {
    render(<TreeView data={data} expanded={['root']} aria-label="Files" />);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('clicking an item calls onItemClick and onSelect', async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    const onSelect = vi.fn();
    render(
      <TreeView data={data} onItemClick={onItemClick} onSelect={onSelect} aria-label="Files" />,
    );
    await user.click(screen.getByText('Leaf'));
    expect(onItemClick).toHaveBeenCalledWith('leaf', expect.objectContaining({ id: 'leaf' }));
    expect(onSelect).toHaveBeenCalledWith('leaf');
  });

  it('marks the selected item with aria-selected and roving tabIndex', () => {
    render(<TreeView data={data} selected="leaf" aria-label="Files" />);
    const leafItem = screen.getByText('Leaf').closest('[role="treeitem"]');
    expect(leafItem).toHaveAttribute('aria-selected', 'true');
    expect(leafItem).toHaveAttribute('tabindex', '0');
  });

  it('a custom renderItem overrides the default row rendering', () => {
    render(
      <TreeView
        data={data}
        aria-label="Files"
        renderItem={(node) => <span data-testid={`custom-${node.id}`}>{node.label}</span>}
      />,
    );
    expect(screen.getByTestId('custom-root')).toBeInTheDocument();
  });
});
