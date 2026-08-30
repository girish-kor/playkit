import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from '../Tabs';

const tabs = [
  { id: 'a', label: 'Tab A', content: <div>Content A</div> },
  { id: 'b', label: 'Tab B', content: <div>Content B</div> },
];

describe('Tabs', () => {
  it('uncontrolled: defaults to the first non-disabled tab and switches on click', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} aria-label="Sections" />);
    expect(screen.getByText('Content A')).toBeVisible();
    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(screen.getByText('Content B')).toBeVisible();
  });

  it('controlled: the activeTab prop wins even after a click', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} activeTab="a" onChange={() => {}} aria-label="Sections" />);
    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('data-state', 'active');
  });

  it('calls both onChange and the onTabChange alias with the same id', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onTabChange = vi.fn();
    render(
      <Tabs tabs={tabs} onChange={onChange} onTabChange={onTabChange} aria-label="Sections" />,
    );
    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b');
    expect(onTabChange).toHaveBeenCalledWith('b');
  });

  it('skips disabled tabs when choosing the default active tab', () => {
    const withDisabled = [
      { id: 'a', label: 'Tab A', content: <div>A</div>, disabled: true },
      { id: 'b', label: 'Tab B', content: <div>B</div> },
    ];
    render(<Tabs tabs={withDisabled} aria-label="Sections" />);
    expect(screen.getByText('B')).toBeVisible();
  });

  it('renders a close button per tab when canClose is true, calling onTabClose with the tab id', async () => {
    const user = userEvent.setup();
    const onTabClose = vi.fn();
    render(<Tabs tabs={tabs} canClose onTabClose={onTabClose} aria-label="Sections" />);
    await user.click(screen.getByRole('button', { name: 'Close Tab A' }));
    expect(onTabClose).toHaveBeenCalledWith('a');
  });

  it("uses Radix tabs' accessible tablist/tab/tabpanel roles", () => {
    render(<Tabs tabs={tabs} aria-label="Sections" />);
    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });
});
