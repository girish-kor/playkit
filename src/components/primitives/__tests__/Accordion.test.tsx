import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Accordion } from '../Accordion';

const items = [
  { id: 'a', header: 'Section A', content: <div>Content A</div> },
  { id: 'b', header: 'Section B', content: <div>Content B</div> },
];

describe('Accordion', () => {
  it('type="single": expanding one section collapses any previously open one', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" defaultExpanded={['a']} aria-label="FAQ" />);
    expect(screen.getByText('Content A')).toBeVisible();
    await user.click(screen.getByText('Section B'));
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    expect(screen.getByText('Content B')).toBeVisible();
  });

  it('type="multiple": independently expanding sections keeps both open', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="multiple" aria-label="FAQ" />);
    await user.click(screen.getByText('Section A'));
    await user.click(screen.getByText('Section B'));
    expect(screen.getByText('Content A')).toBeVisible();
    expect(screen.getByText('Content B')).toBeVisible();
  });

  it('controlled: the expanded prop wins even after a click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={items}
        type="single"
        expanded={['a']}
        onChange={() => {}}
        aria-label="FAQ"
      />,
    );
    await user.click(screen.getByText('Section B'));
    expect(screen.getByText('Content A')).toBeVisible();
  });

  it('calls onToggle with the id whose expansion changed, and onChange with the full list', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onChange = vi.fn();
    render(
      <Accordion
        items={items}
        type="single"
        onToggle={onToggle}
        onChange={onChange}
        aria-label="FAQ"
      />,
    );
    await user.click(screen.getByText('Section A'));
    expect(onToggle).toHaveBeenCalledWith('a');
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('a disabled item cannot be expanded', async () => {
    const user = userEvent.setup();
    const disabledItems = [
      { id: 'a', header: 'Section A', content: <div>Content A</div>, disabled: true },
    ];
    render(<Accordion items={disabledItems} aria-label="FAQ" />);
    await user.click(screen.getByText('Section A'));
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });
});
