import { redirect } from 'next/navigation';

/**
 * Homepage component that redirects users to the Shows page.
 *
 * This ensures that when users visit the root URL (`/`), they are
 * automatically taken to the `/shows` page, where all available shows are listed.
 */
const Home = (): void => {
  redirect('/shows');
};

export default Home;
