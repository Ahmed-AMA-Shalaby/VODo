import { Metadata } from 'next';

import { fetchEpisodeDetails } from '@/services';

import EpisodeDetails from './index';

/**
 * Props type for the Episode Details Controller component.
 * @property {Promise<{ showId: string; episodeId: string }>} params - The dynamic route parameters containing `showId` and `episodeId`.
 */
interface EpisodeDetailsProps {
  params: Promise<{ showId: string; episodeId: string }>;
}

/**
 * Generates metadata for the Episode Details page dynamically.
 *
 * Uses the `showId` and `episodeId` from `params` to fetch the episode details,
 * then constructs a metadata object with:
 * - A dynamic page title including the episode's name.
 * - A description derived from the episode's summary (HTML tags removed).
 *
 * @param {EpisodeDetailsProps} params - The route parameters containing `showId` and `episodeId`.
 * @returns {Promise<Metadata>} The dynamically generated metadata object.
 */
export const generateMetadata = async ({ params }: EpisodeDetailsProps): Promise<Metadata> => {
  const { showId, episodeId } = await params;
  const { episode } = await fetchEpisodeDetails(showId, episodeId);

  return {
    title: `${episode.name} - VODo`,
    description: episode.summary?.replace(/<[^>]+>/g, '') || '',
  };
};

/**
 * Fetches and renders the details of a specific episode.
 *
 * Uses `fetchEpisodeDetails` to retrieve the episode's data based on `showId` and `episodeId`,
 * then passes the data to the `EpisodeDetails` component for rendering.
 *
 * @param {EpisodeDetailsProps} params - The route parameters containing `showId` and `episodeId`.
 * @returns {Promise<React.JSX.Element>} The EpisodeDetails component with fetched episode data.
 */
const EpisodeDetailsController = async ({ params }: EpisodeDetailsProps): Promise<React.JSX.Element> => {
  const { showId, episodeId } = await params;
  const { episode } = await fetchEpisodeDetails(showId, episodeId);

  return <EpisodeDetails initialEpisode={episode} showId={showId} />;
};

export default EpisodeDetailsController;
