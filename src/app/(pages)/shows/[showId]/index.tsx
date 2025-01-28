'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import placeholderImage from '@/assets/placeholder.png';
import EpisodeCard from '@/components/EpisodeCard';
import { Episode } from '@/models/episode';
import { Show } from '@/models/show';

import styles from './styles.module.scss';

interface ShowDetailsProps {
  show: Show;
}

const ShowDetails = ({ show }: ShowDetailsProps): React.JSX.Element => {
  const episodesBySeason = new Map<number, Episode[]>();

  show._embedded.episodes.forEach((episode) => {
    if (!episodesBySeason.has(episode.season)) {
      episodesBySeason.set(episode.season, []);
    }
    episodesBySeason.get(episode.season)?.push(episode);
  });

  const sortedSeasons = Array.from(episodesBySeason.entries()).sort(([a], [b]) => b - a);

  const [expandedSeasons, setExpandedSeasons] = useState<number[]>([]);

  const toggleSeason = (season: number): void => {
    setExpandedSeasons((prev) => (prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season]));
  };

  return (
    <div className={styles.container}>
      <Link href={'/shows'} className={styles.backButton}>
        ⬅ Back to All Shows
      </Link>

      <div className={styles.header}>
        <Image
          src={show.image?.original || placeholderImage.src}
          alt={`${show.name} cover`}
          width={400}
          height={600}
          className={styles.cover}
          priority
        />
        <div className={styles.details}>
          <h1 className={styles.title}>{show.name}</h1>
          {show.summary && <p className={styles.description}>{show.summary.replace(/<[^>]+>/g, '')}</p>}
        </div>
      </div>
      {sortedSeasons.map(([season, episodes]) => (
        <div key={season} className={styles.season}>
          <button
            className={styles.seasonTitle}
            onClick={() => toggleSeason(season)}
            aria-expanded={expandedSeasons.includes(season)}
          >
            Season {season}
          </button>
          {expandedSeasons.includes(season) && (
            <ul className={styles.episodesList}>
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} showId={show.id.toString()} />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowDetails;
