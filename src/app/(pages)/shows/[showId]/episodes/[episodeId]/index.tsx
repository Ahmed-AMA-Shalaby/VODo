'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import placeholderImage from '@/assets/placeholder.png';
import { Episode } from '@/models/episode';
import { fetchEpisodeDetails } from '@/services';

import styles from './styles.module.scss';

interface EpisodeDetailsProps {
  initialEpisode: Episode;
  showId: string;
}

const EpisodeDetails = ({ initialEpisode, showId }: EpisodeDetailsProps): React.JSX.Element => {
  const params = useParams();
  const { episodeId } = params as { episodeId: string };

  const [episode, setEpisode] = useState<Episode>(initialEpisode);
  const [prevEpisode, setPrevEpisode] = useState<Episode | undefined>(undefined);
  const [nextEpisode, setNextEpisode] = useState<Episode | undefined>(undefined);

  useEffect(() => {
    const updateEpisode = async (): Promise<void> => {
      const { episode, prevEpisode, nextEpisode } = await fetchEpisodeDetails(showId, episodeId);

      setEpisode(episode);
      setPrevEpisode(prevEpisode);
      setNextEpisode(nextEpisode);
    };

    updateEpisode();
  }, [episodeId, showId]);

  return (
    <div className={styles.container}>
      <Link href={`/shows/${showId}`} className={styles.backButton}>
        ⬅ Back to Show
      </Link>

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

      <div className={styles.details}>
        <h1 className={styles.title}>{episode.name}</h1>
        <p className={styles.meta}>
          {`Episode ${episode.number} | ${episode.runtime} min`}
          {episode.airdate && <span className={styles.airdate}>{episode.airdate}</span>}
        </p>
        {episode.summary && <p className={styles.summary}>{episode.summary.replace(/<[^>]+>/g, '')}</p>}
      </div>

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
