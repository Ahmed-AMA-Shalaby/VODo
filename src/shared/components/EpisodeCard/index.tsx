import Image from 'next/image';
import Link from 'next/link';

import placeholderImage from '@/assets/placeholder.png';
import { Episode } from '@/models/episode';

import styles from './styles.module.scss';

interface EpisodeCardProps {
  episode: Episode;
  showId: string;
}

const EpisodeCard = ({ episode, showId }: EpisodeCardProps): React.JSX.Element => {
  return (
    <li className={styles.card}>
      <Link href={`/shows/${showId}/episodes/${episode.id}`} className={styles.link}>
        <div className={styles.content}>
          <Image
            src={episode.image?.original || placeholderImage.src}
            alt={episode.name || 'Episode Placeholder'}
            width={500}
            height={300}
            quality={95}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <span className={styles.title}>{episode.name}</span>
          </div>
        </div>
        <div className={styles.meta}>
          <span>Episode {episode.number}</span>
          <span>{episode.runtime} min</span>
        </div>
      </Link>
    </li>
  );
};

export default EpisodeCard;
