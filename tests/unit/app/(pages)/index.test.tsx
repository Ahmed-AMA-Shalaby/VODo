import { fireEvent, render, screen } from '@testing-library/react';

import Header from '@/app';

describe('Header', () => {
  it('renders the logo and search input when page param exists', () => {
    render(<Header />);

    expect(screen.getByText('VODo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Find your next binge-worthy show..')).toBeInTheDocument();
  });

  it('clears the search input when clear button is clicked', () => {
    render(<Header />);

    const input = screen.getByPlaceholderText('Find your next binge-worthy show..');

    fireEvent.change(input, { target: { value: 'test' } });

    expect((input as HTMLInputElement).value).toBe('test');
    const clearButton = screen.getByRole('button', { name: /clear search/i });

    fireEvent.click(clearButton);

    expect((input as HTMLInputElement).value).toBe('');
  });
});
