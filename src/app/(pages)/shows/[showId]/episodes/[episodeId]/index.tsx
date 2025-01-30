'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import placeholderImage from '@/assets/placeholder.png';
import { Episode } from '@/models/episode';
import { fetchEpisodeDetails } from '@/services';

import styles from './styles.module.scss';

/**
 * Props type for the Episode Details component.
 * @property {Episode} initialEpisode - The initial episode data received from the server.
 * @property {string} showId - The ID of the parent show.
 */
interface EpisodeDetailsProps {
  initialEpisode: Episode;
  showId: string;
}

/**
 * Displays the details of a specific episode.
 *
 * Includes:
 * - Episode cover image.
 * - Title, season number, episode number, runtime, and air date.
 * - Episode summary.
 * - Navigation buttons for Previous/Next episodes.
 *
 * @param {EpisodeDetailsProps} initialEpisode - The initial episode data.
 * @param {string} showId - The show ID to fetch related episodes.
 * @returns {React.JSX.Element} The structured Episode Details page.
 */
const EpisodeDetails = ({ initialEpisode, showId }: EpisodeDetailsProps): React.JSX.Element => {
  const params = useParams();
  const { episodeId } = params as { episodeId: string };

  // State to store the current episode, previous episode, and next episode
  const [episode, setEpisode] = useState<Episode>(initialEpisode);
  const [prevEpisode, setPrevEpisode] = useState<Episode | undefined>(undefined);
  const [nextEpisode, setNextEpisode] = useState<Episode | undefined>(undefined);

  /**
   * Fetches updated episode details when the episode ID or show ID changes.
   * Retrieves:
   * - The current episode.
   * - The previous episode (if available).
   * - The next episode (if available).
   */
  const updateEpisode = useCallback(async (): Promise<void> => {
    const { episode, prevEpisode, nextEpisode } = await fetchEpisodeDetails(showId, episodeId);

    setEpisode(episode);
    setPrevEpisode(prevEpisode);
    setNextEpisode(nextEpisode);
  }, [episodeId, showId]);

  useEffect(() => {
    updateEpisode();
  }, [updateEpisode]);

  return (
    <div className={styles.container}>
      {/* Back to Show button */}
      <Link href={`/shows/${showId}`} className={styles.backButton}>
        ⬅ Back to Show
      </Link>

      {/* Episode Cover Image */}
      <div className={styles.header}>
        <Image
          src={episode.image?.original || placeholderImage.src}
          alt={episode.name}
          width={800}
          height={450}
          className={styles.cover}
          priority
        />
      </div>

      {/* Episode Metadata */}
      <div className={styles.details}>
        <h1 className={styles.title}>{episode.name}</h1>
        <p className={styles.meta}>
          {`Episode ${episode.number} | ${episode.runtime} min`}
          {episode.airdate && <span className={styles.airdate}>{episode.airdate}</span>}
        </p>

        {episode.summary && <p className={styles.summary}>{episode.summary.replace(/<[^>]+>/g, '')}</p>}
      </div>

      {/* Previous & Next Episode Navigation */}
      <div className={styles.navigation}>
        {prevEpisode && (
          <Link href={`/shows/${showId}/episodes/${prevEpisode.id}`} className={styles.navLink}>
            ⬅ Previous
          </Link>
        )}

        {nextEpisode && (
          <Link href={`/shows/${showId}/episodes/${nextEpisode.id}`} className={styles.navLink}>
            Next ➡
          </Link>
        )}
      </div>
    </div>
  );
};

export default EpisodeDetails;
