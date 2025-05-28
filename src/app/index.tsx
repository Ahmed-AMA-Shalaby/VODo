'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import styles from './styles.module.scss';

/**
 * Renders the main header for the application, including the logo and a search input.
 *
 * - Displays the logo as a link to the shows page, resetting the search term on navigation.
 * - Conditionally renders a search input and clear button if the `page` query parameter is present.
 * - The search input allows users to filter shows by a search term.
 * - The clear button resets the search term to an empty string.
 *
 * @returns {React.JSX.Element} The rendered header component.
 */
const HeaderContent = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const page = searchParams.get('page');
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleClearOrLogo = (): void => {
    setQuery('');
  };

  // Debounce query and update the URL's query param
  useEffect(() => {
    // Only debounce and update URL if 'page' param exists
    if (!page) {
      if (query) handleClearOrLogo();

      return;
    }

    const debounceTimeout = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      // Always reset to first page when searching
      params.set('page', '0');

      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }

      push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(debounceTimeout);
    // Only depend on relevant values
  }, [push, query, page, searchParams]);

  return (
    <header className={styles.header}>
      <Link href='/shows?page=0' className={styles.logo} onNavigate={handleClearOrLogo}>
        VODo
      </Link>

      {page && (
        <div className={styles.searchContainer}>
          <input
            type='text'
            placeholder='Find your next binge-worthy show..'
            className={styles.searchInput}
            value={query}
            onChange={handleInputChange}
          />
          {query && (
            <button type='button' className={styles.clearButton} onClick={handleClearOrLogo} aria-label='Clear search'>
              {'\u00d7'}
            </button>
          )}
        </div>
      )}
    </header>
  );
};

const Header = (): React.JSX.Element => {
  return (
    <Suspense>
      <HeaderContent />
    </Suspense>
  );
};

export default Header;
