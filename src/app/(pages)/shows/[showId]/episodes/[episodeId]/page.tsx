import { Metadata } from 'next';

import { fetchEpisodeDetails } from '@/services';

import EpisodeDetails from './index';

interface EpisodeDetailsProps {
  params: Promise<{ showId: string; episodeId: string }>;
}

export const generateMetadata = async ({ params }: EpisodeDetailsProps): Promise<Metadata> => {
  const { showId, episodeId } = await params;
  const { episode } = await fetchEpisodeDetails(showId, episodeId);

  return {
    title: `${episode.name} - VODo`,
    description: episode.summary?.replace(/<[^>]+>/g, '') || '',
  };
};

const EpisodeDetailsController = async ({ params }: EpisodeDetailsProps): Promise<React.JSX.Element> => {
  const { showId, episodeId } = await params;
  const { episode } = await fetchEpisodeDetails(showId, episodeId);

  return <EpisodeDetails initialEpisode={episode} showId={showId} />;
};

export default EpisodeDetailsController;
