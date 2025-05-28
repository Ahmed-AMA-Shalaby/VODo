import { redirect } from 'next/navigation';

/**
 * Home component that immediately redirects users to the shows page with the first page selected.
 * Utilizes the `redirect` function to navigate to `/shows?page=0`.
 *
 * @returns {void} This component does not render any JSX; it only performs a redirect.
 */
const Home = (): void => {
  redirect('/shows?page=0');
};

export default Home;
