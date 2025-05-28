import { cache } from 'react';

import { Episode } from '@/models/episode';
import { Show } from '@/models/show';

/**
 * Fetches a paginated list of TV shows from the TVMaze API.
 *
 * - Calls the TVMaze API to retrieve shows for a specific page.
 * - Also fetches the previous and next pages of shows if they exist.
 *
 * @param {number} pageNumber - The page number to fetch shows for.
 * @returns {Promise<{ shows?: Show[]; prevShows?: Show[]; nextShows?: Show[] }>} An object containing the shows for the requested page, and optionally the previous and next pages.
 */
export const fetchShowsByPage = async (
  pageNumber: number,
): Promise<{ shows?: Show[]; prevShows?: Show[]; nextShows?: Show[] }> => {
  const showsRes = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber}`);

  if (!showsRes.ok) {
    if (showsRes.status === 404) {
      return { shows: undefined, prevShows: undefined, nextShows: undefined };
    }

    throw new Error(`Failed to fetch paginated shows: ${showsRes.status} ${showsRes.statusText}`);
  }

  const shows: Show[] = await showsRes.json();

  let prevShows, nextShows;

  // Fetch the previous shows if they exists
  const prevRes = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber - 1}`);

  if (prevRes.ok) prevShows = await prevRes.json();

  // Fetch the next shows if they exists
  const nextRes = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber + 1}`);

  if (nextRes.ok) nextShows = await nextRes.json();

  return { shows, prevShows, nextShows };
};

/**
 * Fetches a list of TV shows based on a search query.
 *
 * - Calls the TVMaze API to retrieve matching shows.
 * - Extracts the `show` property from each search result.
 *
 * @param {string} query - The search term used to find shows.
 * @returns {Promise<Show[]>} A list of shows matching the query.
 */
export const fetchShowsByQuery = async (query: string): Promise<Show[]> => {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status} ${response.statusText}`);
  }

  const searchResults: { show: Show }[] = await response.json();

  return searchResults.map((result) => result.show);
};

/**
 * Fetches details of a specific show by its ID.
 *
 * - Calls the TVMaze API to retrieve show information.
 * - Includes embedded episode data.
 *
 * @param {string} showId - The ID of the show to fetch.
 * @returns {Promise<Show>} The fetched show details.
 */
export const fetchShowById = cache(async (showId: string): Promise<Show> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}?embed=episodes`);

  if (!res.ok) throw new Error(`Failed to fetch show with id ${showId}`);

  return res.json();
});

/**
 * Fetches details of a specific episode along with its previous and next episodes.
 *
 * - Calls the TVMaze API to retrieve episode details.
 * - Determines the previous and next episodes in the same season.
 *
 * @param {string} showId - The ID of the show the episode belongs to.
 * @param {string} episodeId - The ID of the episode to fetch.
 * @returns {Promise<{ episode: Episode; prevEpisode?: Episode; nextEpisode?: Episode }>} The fetched episode details and optionally the previous/next episodes.
 */
export const fetchEpisodeDetails = cache(
  async (
    showId: string,
    episodeId: string,
  ): Promise<{ episode: Episode; prevEpisode?: Episode; nextEpisode?: Episode }> => {
    const episodeRes = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);

    if (!episodeRes.ok) {
      throw new Error(`Failed to fetch episode details: ${episodeRes.status} ${episodeRes.statusText}`);
    }

    const episode: Episode = await episodeRes.json();

    let prevEpisode, nextEpisode;

    // Fetch the previous episode if it exists
    if (episode.number > 1) {
      const prevRes = await fetch(
        `https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${episode.season}&number=${episode.number - 1}`,
      );

      if (prevRes.ok) prevEpisode = await prevRes.json();
    }

    // Fetch the next episode if it exists
    const nextRes = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${episode.season}&number=${episode.number + 1}`,
    );

    if (nextRes.ok) nextEpisode = await nextRes.json();

    return { episode, prevEpisode, nextEpisode };
  },
);
