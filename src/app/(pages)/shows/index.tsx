'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import placeholderImage from '@/assets/placeholder.png';
import { Show } from '@/models/show';

import styles from './styles.module.scss';

/**
 * Props type for the `Shows` component.
 * @property {number} page - Page number for pagination.
 * @property {Show[]} shows - Optional array of TV shows to be displayed.
 * @property {Show[]} nextShows - Optional array of next shows for pagination.
 * @property {Show[]} prevShows - Optional array of previous shows for pagination.
 */
interface ShowsProps {
  page: number;
  shows?: Show[];
  nextShows?: Show[];
  prevShows?: Show[];
}

/**
 * Displays a list of TV shows in a grid layout.
 *
 * Each show is presented as a clickable card containing:
 * - A show cover image (fallback to a placeholder if unavailable)
 * - The show's name displayed on hover
 *
 * @param {ShowsProps} shows - List of shows to render.
 * @returns {React.JSX.Element} A grid of clickable show cards.
 */
const Shows = ({ page, shows, nextShows, prevShows }: ShowsProps): React.JSX.Element => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Shows</h1>

      <ul className={styles.showList}>
        {shows?.map((show) => (
          <li key={show.id} className={styles.showItem}>
            {/* Clickable card linking to show details */}
            <Link href={`/shows/${show.id}`} className={styles.card}>
              {/* Show Cover Image */}
              <Image
                src={show.image?.original || placeholderImage.src}
                alt={show.name}
                fill
                className={styles.image}
                priority
                sizes='(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw'
              />
              {/* Overlay displaying the show name on hover */}
              <div className={styles.overlay}>
                <span className={styles.showName}>{show.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* No results messages */}
      {!query && (!shows || shows.length === 0) && <p className={styles.noShowsMessage}>No shows available.</p>}

      {query && shows && shows.length === 0 && (
        <p className={styles.noShowsMessage}>{`No shows found for "${query}". Please try a different search term.`}</p>
      )}

      {/* Previous & Next Shows Navigation */}
      <div className={styles.navigation}>
        <Link
          href={`/shows?page=${page - 1}`}
          className={`${styles.navLink} ${(!prevShows || query) && styles.hiddenNavLink}`}
        >
          ⬅ Previous
        </Link>

        <Link
          href={`/shows?page=${page + 1}`}
          className={`${styles.navLink} ${(!nextShows || query) && styles.hiddenNavLink}`}
        >
          Next ➡
        </Link>
      </div>
    </div>
  );
};

export default Shows;
