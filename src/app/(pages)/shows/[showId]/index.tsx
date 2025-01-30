'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import placeholderImage from '@/assets/placeholder.png';
import EpisodeCard from '@/components/EpisodeCard';
import { Episode } from '@/models/episode';
import { Show } from '@/models/show';

import styles from './styles.module.scss';

/**
 * Props type for the `ShowDetails` component.
 * @property {Show} show - The details of the TV show, including episodes.
 */
interface ShowDetailsProps {
  show: Show;
}

/**
 * Displays detailed information about a TV show, including:
 * - The show's cover image and description.
 * - A collapsible episode list, grouped by season.
 *
 * @param {ShowDetailsProps} show - The show data to display.
 * @returns {React.JSX.Element} The structured Show Details page.
 */
const ShowDetails = ({ show }: ShowDetailsProps): React.JSX.Element => {
  // Groups episodes by season into a `Map<number, Episode[]>`.
  const episodesBySeason = new Map<number, Episode[]>();

  show._embedded.episodes.forEach((episode) => {
    if (!episodesBySeason.has(episode.season)) {
      episodesBySeason.set(episode.season, []);
    }
    episodesBySeason.get(episode.season)?.push(episode);
  });

  // Sorts seasons in descending order (newest season first).
  const sortedSeasons = Array.from(episodesBySeason.entries()).sort(([a], [b]) => b - a);

  // Stores which seasons are currently expanded in the UI.
  const [expandedSeasons, setExpandedSeasons] = useState<number[]>([]);

  /**
   * Toggles the expanded/collapsed state of a season.
   *
   * @param {number} season - The season number to toggle.
   */
  const toggleSeason = (season: number): void => {
    setExpandedSeasons((prev) => (prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season]));
  };

  return (
    <div className={styles.container}>
      {/* Back to All Shows button */}
      <Link href={'/shows'} className={styles.backButton}>
        ⬅ Back to All Shows
      </Link>

      {/* Show header with cover image and description */}
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

      {/* List of seasons with collapsible episodes */}
      {sortedSeasons.map(([season, episodes]) => (
        <div key={season} className={styles.season}>
          <button
            className={styles.seasonTitle}
            onClick={() => toggleSeason(season)}
            aria-expanded={expandedSeasons.includes(season)}
          >
            Season {season}
          </button>

          {/* Renders episodes if the season is expanded */}
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
