import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from '../App.jsx';

describe('App navigation', () => {
  it('starts on the home view with Home marked active', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Simple Pharmacy' }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' }))
      .toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Medicines' }))
      .not.toHaveAttribute('aria-current');
    expect(screen.getByRole('button', { name: /Cart/i }))
      .not.toHaveAttribute('aria-current');
  });

  it('switches visible sections through local navigation state', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Medicines' }));

    expect(screen.getByRole('heading', { name: 'Medicines' }))
      .toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Simple Pharmacy' }))
      .not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Medicines' }))
      .toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: /Cart/i }));

    expect(screen.getByRole('heading', { name: 'Review cart.' }))
      .toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Medicines' }))
      .not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cart/i }))
      .toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: 'Home' }));

    expect(screen.getByRole('heading', { name: 'Simple Pharmacy' }))
      .toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Review cart.' }))
      .not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' }))
      .toHaveAttribute('aria-current', 'page');
  });
});
