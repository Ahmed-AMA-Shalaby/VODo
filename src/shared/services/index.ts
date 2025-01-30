import { Episode } from '@/models/episode';
import { Show } from '@/models/show';

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
export const fetchShowById = async (showId: string): Promise<Show> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}?embed=episodes`);

  if (!res.ok) throw new Error(`Failed to fetch show with id ${showId}`);

  return res.json();
};

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
export const fetchEpisodeDetails = async (
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
};
