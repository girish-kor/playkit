import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../Button';

describe('Button', () => {
  it('renders a real <button> by default with type="button"', () => {
    render(<Button>Click</Button>);
    const el = screen.getByRole('button', { name: 'Click' });
    expect(el.tagName).toBe('BUTTON');
    expect(el).toHaveAttribute('type', 'button');
  });

  it('calls onPress on click/activation (the preferred handler over onClick)', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('also fires a deprecated onClick alongside onPress when both are given', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    const onClick = vi.fn();
    render(
      <Button onPress={onPress} onClick={onClick}>
        Click
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled prevents onPress from firing and sets aria-disabled', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Button disabled onPress={onPress}>
        Click
      </Button>,
    );
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('aria-disabled', 'true');
    await user.click(el);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('loading renders a busy indicator and treats the button as disabled', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Button loading onPress={onPress}>
        Save
      </Button>,
    );
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('aria-busy', 'true');
    await user.click(el);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('href renders as an anchor element under the hood (role stays "button" by default)', () => {
    render(<Button href="/somewhere">Go</Button>);
    const el = screen.getByRole('button', { name: 'Go' });
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '/somewhere');
  });

  it('applies the documented default variant/size classes (primary/md)', () => {
    render(<Button>Click</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('bg-blue-600');
    expect(cls).toContain('px-4');
  });

  it('supports keyboard activation via Enter/Space (react-aria useButton)', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Click</Button>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
