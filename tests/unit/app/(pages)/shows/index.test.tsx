import { render, screen } from '@testing-library/react';

import { Show } from '@/models/show';
import Shows from '@/pages/shows';

const mockShows: Show[] = [
  {
    id: 1,
    name: 'Powerpuff Girls',
    image: { original: 'https://via.placeholder.com/500x300' },
    summary: 'A superhero show about three girls saving the city.',
    _embedded: { episodes: [] },
  },
];

describe('Shows Component', () => {
  test('renders a list of shows', () => {
    render(<Shows shows={mockShows} />);

    expect(screen.getByText('All Shows')).toBeInTheDocument();
    expect(screen.getByText('Powerpuff Girls')).toBeInTheDocument();
  });
});
