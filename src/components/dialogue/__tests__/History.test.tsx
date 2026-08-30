import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { History } from '../History';
import type { HistoryEntry } from '../../../types';

const entries: HistoryEntry[] = [
  { text: 'Hello there', timestamp: '2024-01-01T00:00:00.000Z', speaker: 'NPC' },
  { text: 'General Kenobi', timestamp: '2024-01-01T00:00:05.000Z', speaker: 'Player' },
];

describe('History', () => {
  it('renders role="log" with an entry-count aria-label and each entry text', () => {
    render(<History entries={entries} />);
    expect(screen.getByRole('log', { name: 'Dialogue history, 2 entries' })).toBeInTheDocument();
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('General Kenobi')).toBeInTheDocument();
  });

  it('maxEntries truncates to only the most recent entries', () => {
    render(<History entries={entries} maxEntries={1} />);
    expect(screen.queryByText('Hello there')).not.toBeInTheDocument();
    expect(screen.getByText('General Kenobi')).toBeInTheDocument();
  });

  it('calls onEntryClick with the clicked entry', async () => {
    const user = userEvent.setup();
    const onEntryClick = vi.fn();
    render(<History entries={entries} onEntryClick={onEntryClick} />);
    await user.click(screen.getByText('Hello there'));
    expect(onEntryClick).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'Hello there', speaker: 'NPC' }),
      expect.anything(),
    );
  });

  it('Clear/Toggle/Export buttons call onClear/onToggle/onExport', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onToggle = vi.fn();
    const onExport = vi.fn();
    render(<History entries={entries} onClear={onClear} onToggle={onToggle} onExport={onExport} />);
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    await user.click(screen.getByRole('button', { name: 'Export' }));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onExport).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ text: 'Hello there' })]),
    );
  });

  it('searchable filters entries and calls onSearch', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<History entries={entries} searchable onSearch={onSearch} />);
    await user.type(screen.getByRole('searchbox', { name: 'Search history' }), 'General');
    expect(onSearch).toHaveBeenCalled();
    expect(screen.queryByText('Hello there')).not.toBeInTheDocument();
    expect(screen.getByText('General Kenobi')).toBeInTheDocument();
  });

  it('isOpen: false hides the panel from the accessibility tree via aria-hidden', () => {
    render(<History entries={entries} isOpen={false} />);
    expect(screen.getByRole('log', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
  });
});
