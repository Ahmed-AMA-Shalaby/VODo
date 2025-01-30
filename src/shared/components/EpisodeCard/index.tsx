import Image from 'next/image';
import Link from 'next/link';

import placeholderImage from '@/assets/placeholder.png';
import { Episode } from '@/models/episode';

import styles from './styles.module.scss';

/**
 * Props type for the EpisodeCard component.
 * @property {Episode} episode - The episode data to be displayed.
 * @property {string} showId - The ID of the show the episode belongs to.
 */
interface EpisodeCardProps {
  episode: Episode;
  showId: string;
}

/**
 * Displays an individual episode as a card.
 *
 * The episode card includes:
 * - A clickable link that navigates to the episode details page.
 * - An episode cover image (fallback to a placeholder if unavailable).
 * - The episode title displayed on hover.
 * - Metadata showing the episode number and runtime.
 *
 * @param {EpisodeCardProps} episode - The episode data to display.
 * @param {string} showId - The parent show's ID for generating the correct link.
 * @returns {React.JSX.Element} A clickable episode card.
 */
const EpisodeCard = ({ episode, showId }: EpisodeCardProps): React.JSX.Element => {
  return (
    <li className={styles.card}>
      {/* Clickable link to episode details */}
      <Link href={`/shows/${showId}/episodes/${episode.id}`} className={styles.link}>
        <div className={styles.content}>
          {/* Episode Cover Image */}
          <Image
            src={episode.image?.original || placeholderImage.src}
            alt={episode.name || 'Episode Placeholder'}
            width={500}
            height={300}
            quality={95}
            className={styles.image}
          />
          {/* Overlay with episode title on hover */}
          <div className={styles.overlay}>
            <span className={styles.title}>{episode.name}</span>
          </div>
        </div>
        {/* Episode Metadata */}
        <div className={styles.meta}>
          <span>Episode {episode.number}</span>
          <span>{episode.runtime} min</span>
        </div>
      </Link>
    </li>
  );
};

export default EpisodeCard;
