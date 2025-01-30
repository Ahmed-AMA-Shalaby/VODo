import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Episode } from '@/models/episode';
import EpisodeDetails from '@/pages/shows/[showId]/episodes/[episodeId]';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({ episodeId: '1' })),
}));

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

describe('EpisodeDetails Component', () => {
  test('renders episode details', () => {
    render(<EpisodeDetails initialEpisode={mockEpisode} showId='1' />);

    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 1 | 30 min')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });
});
