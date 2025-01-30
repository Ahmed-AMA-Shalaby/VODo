import { render, screen } from '@testing-library/react';

import EpisodeCard from '@/components/EpisodeCard';
import { Episode } from '@/models/episode';

const mockEpisode: Episode = {
  id: 1,
  name: 'Episode 1',
  season: 1,
  number: 1,
  runtime: 30,
  image: { original: 'https://via.placeholder.com/500x300' },
  summary: 'This is a test episode.',
  airdate: '2024-01-01',
};

describe('EpisodeCard Component', () => {
  test('renders episode title and metadata', () => {
    render(<EpisodeCard episode={mockEpisode} showId='1' />);

    expect(screen.getAllByText('Episode 1').length).toEqual(2);
  });
});
