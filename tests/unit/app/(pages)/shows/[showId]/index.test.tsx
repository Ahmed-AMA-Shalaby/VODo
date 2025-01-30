import { fireEvent, render, screen } from '@testing-library/react';

import { Show } from '@/models/show';
import ShowDetails from '@/pages/shows/[showId]';

const mockShow: Show = {
  id: 1,
  name: 'Powerpuff Girls',
  image: { original: 'https://via.placeholder.com/500x300' },
  summary: 'A superhero show about three girls saving the city.',
  _embedded: {
    episodes: [
      {
        id: 101,
        name: 'Episode 1',
        season: 1,
        number: 1,
        runtime: 30,
        image: { original: 'https://via.placeholder.com/500x300' },
        summary: 'This is a test episode.',
        airdate: '2024-01-01',
      },
    ],
  },
};

describe('ShowDetails Component', () => {
  test('renders show details and episodes', () => {
    render(<ShowDetails show={mockShow} />);

    expect(screen.getByText('Powerpuff Girls')).toBeInTheDocument();
    expect(screen.getByText('A superhero show about three girls saving the city.')).toBeInTheDocument();

    // Expand the season section before checking for the episode
    fireEvent.click(screen.getByText('Season 1'));

    expect(screen.getAllByText('Episode 1').length).toEqual(2);
  });
});
