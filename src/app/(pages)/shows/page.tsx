import { Metadata } from 'next';

import Shows from '@/pages/shows';
import { fetchShowsByQuery } from '@/services';

/**
 * Metadata for the Shows page.
 * Defines the page title and description for SEO.
 */
export const metadata: Metadata = {
  title: 'Shows - VODo',
  description: 'Browse all available TV shows on VODo.',
};

/**
 * Fetches and displays the list of TV shows matching a certain query.
 *
 * Uses `fetchShowsByQuery` from the services layer to retrieve the shows
 * and passes the fetched data to the `Shows` component.
 *
 * @returns {Promise<React.JSX.Element>} The Shows component with fetched data.
 */
const ShowsController = async (): Promise<React.JSX.Element> => {
  const shows = await fetchShowsByQuery('powerpuff');

  return <Shows shows={shows} />;
};

export default ShowsController;
