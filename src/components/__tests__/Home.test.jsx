import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Home from '../Home.jsx';

describe('Home', () => {
  it('shows the Simple Pharmacy initial view content and actions', () => {
    render(<Home onNavigate={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Simple Pharmacy' }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Browse medicines' }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View cart' }))
      .toBeInTheDocument();
  });

  it('requests section navigation from its calls to action', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<Home onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Browse medicines' }));
    await user.click(screen.getByRole('button', { name: 'View cart' }));

    expect(onNavigate).toHaveBeenNthCalledWith(1, 'medicines');
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'cart');
  });
});
