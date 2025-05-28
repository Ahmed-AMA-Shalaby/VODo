'use client';

import Image from 'next/image';
import Link from 'next/link';

import placeholderImage from '@/assets/placeholder.png';
import { Episode } from '@/models/episode';

import styles from './styles.module.scss';

/**
 * Props type for the Episode Details component.
 * @property {Episode} episode - The current episode data received from the server.
 * @property {Episode} prevEpisode - The previous episode data, if available.
 * @property {Episode} nextEpisode - The next episode data, if available.
 * @property {string} showId - The ID of the parent show.
 */
interface EpisodeDetailsProps {
  episode: Episode;
  prevEpisode?: Episode;
  nextEpisode?: Episode;
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
const EpisodeDetails = ({ episode, prevEpisode, nextEpisode, showId }: EpisodeDetailsProps): React.JSX.Element => {
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
          fill
          className={styles.cover}
          priority
          sizes='(max-width: 800px) 90vw, 800px'
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
        <Link
          href={`/shows/${showId}/episodes/${prevEpisode?.id}`}
          className={`${styles.navLink} ${!prevEpisode && styles.hiddenNavLink}`}
        >
          ⬅ Previous
        </Link>

        <Link
          href={`/shows/${showId}/episodes/${nextEpisode?.id}`}
          className={`${styles.navLink} ${!nextEpisode && styles.hiddenNavLink}`}
        >
          Next ➡
        </Link>
      </div>
    </div>
  );
};

export default EpisodeDetails;
