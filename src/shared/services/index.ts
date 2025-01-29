import { Episode } from '@/models/episode';
import { Show } from '@/models/show';

export const fetchShowsByQuery = async (query: string): Promise<Show[]> => {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status} ${response.statusText}`);
  }

  const searchResults: { show: Show }[] = await response.json();

  return searchResults.map((result) => result.show);
};

export const fetchShowById = async (showId: string): Promise<Show> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}?embed=episodes`);

  if (!res.ok) throw new Error(`Failed to fetch show with id ${showId}`);

  return res.json();
};

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

  if (episode.number > 1) {
    const prevRes = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${episode.season}&number=${episode.number - 1}`,
    );

    if (prevRes.ok) prevEpisode = await prevRes.json();
  }

  const nextRes = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${episode.season}&number=${episode.number + 1}`,
  );

  if (nextRes.ok) nextEpisode = await nextRes.json();

  return { episode, prevEpisode, nextEpisode };
};
