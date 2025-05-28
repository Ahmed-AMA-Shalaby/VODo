import { Metadata } from 'next';

import { Show } from '@/models/show';
import Shows from '@/pages/shows';
import { fetchShowsByPage, fetchShowsByQuery } from '@/services';

/**
 * Props type for the Shows Controller component.
 * @property {Promise<{ page: string; query?: string }>} searchParams - The search parameters containing the current page number & query string for filtering shows.
 */
interface ShowsControllerProps {
  searchParams: Promise<{ page: string; query?: string }>;
}

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
 * Uses `fetchShowsByPage` from the services layer to retrieve the shows
 * and passes the fetched data to the `Shows` component.
 *
 * @returns {Promise<React.JSX.Element>} The Shows component with fetched data.
 */
const ShowsController = async ({ searchParams }: ShowsControllerProps): Promise<React.JSX.Element> => {
  let { page, query } = await searchParams;

  let fetchedShows: Show[] | undefined;

  if (query && query.length > 0) {
    fetchedShows = await fetchShowsByQuery(query);
  }

  if (page && isNaN(Number(page))) {
    page = '0';
  }

  const { shows, nextShows, prevShows } = await fetchShowsByPage(+page);

  fetchedShows = fetchedShows && fetchedShows.length > 0 ? fetchedShows : shows;

  if (!shows || shows.length === 0) {
    return <Shows page={+page} />;
  }

  return <Shows page={+page} shows={fetchedShows} nextShows={nextShows} prevShows={prevShows} />;
};

export default ShowsController;
