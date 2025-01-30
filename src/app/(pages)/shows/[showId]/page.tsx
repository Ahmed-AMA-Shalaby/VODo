import { Metadata } from 'next';

import ShowDetails from '@/pages/shows/[showId]';
import { fetchShowById } from '@/services';

/**
 * Props type for the Show Details Controller component.
 * @property {Promise<{ showId: string }>} params - The dynamic route parameter for the show ID.
 */
interface ShowDetailsControllerProps {
  params: Promise<{ showId: string }>;
}

/**
 * Generates metadata for the Show Details page dynamically.
 *
 * Uses the `showId` from `params` to fetch the show details,
 * then constructs a metadata object with:
 * - A dynamic page title including the show's name.
 * - A description derived from the show's summary (HTML tags removed).
 *
 * @param {ShowDetailsControllerProps} params - The route parameters containing `showId`.
 * @returns {Promise<Metadata>} The dynamically generated metadata object.
 */
export const generateMetadata = async ({ params }: ShowDetailsControllerProps): Promise<Metadata> => {
  const { showId } = await params;
  const show = await fetchShowById(showId);

  return {
    title: `${show.name} - VODo`,
    description: show.summary?.replace(/<[^>]+>/g, ''), // Remove HTML tags from the summary
  };
};

/**
 * Fetches and renders the details of a specific TV show.
 *
 * Uses `fetchShowById` to retrieve the show's data based on `showId`,
 * then passes the data to the `ShowDetails` component for rendering.
 *
 * @param {ShowDetailsControllerProps} params - The route parameters containing `showId`.
 * @returns {Promise<React.JSX.Element>} The ShowDetails component with fetched show data.
 */
const ShowDetailsController = async ({ params }: ShowDetailsControllerProps): Promise<React.JSX.Element> => {
  const { showId } = await params;
  const show = await fetchShowById(showId);

  return <ShowDetails show={show} />;
};

export default ShowDetailsController;
