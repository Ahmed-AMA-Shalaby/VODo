'use client';

import Image from 'next/image';
import Link from 'next/link';

import placeholderImage from '@/assets/placeholder.png';
import { Show } from '@/models/show';

import styles from './styles.module.scss';

/**
 * Props type for the `Shows` component.
 * @property {Show[]} shows - Array of TV shows to be displayed.
 */
interface ShowsProps {
  shows: Show[];
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
const Shows = ({ shows }: ShowsProps): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Shows</h1>

      <ul className={styles.showList}>
        {shows.map((show) => (
          <li key={show.id} className={styles.showItem}>
            {/* Clickable card linking to show details */}
            <Link href={`/shows/${show.id}`} className={styles.card}>
              {/* Show Cover Image */}
              <Image
                src={show.image?.original || placeholderImage.src}
                alt={show.name}
                width={200}
                height={250}
                className={styles.image}
                priority
              />
              {/* Overlay displaying the show name on hover */}
              <div className={styles.overlay}>
                <span className={styles.showName}>{show.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shows;
