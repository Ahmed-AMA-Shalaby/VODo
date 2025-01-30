import './globals.css';

import Link from 'next/link';

import styles from './styles.module.scss';

/**
 * Metadata for the application.
 * Defines the default page title and description for SEO.
 */
export const metadata = {
  title: 'VODo - Your Streaming Hub',
  description: 'Explore and stream your favorite shows and episodes on VODo.',
};

/**
 * Props type for the RootLayout component.
 */
type Props = {
  children: React.JSX.Element;
};

/**
 * Root layout component that wraps the entire application.
 * It includes:
 * - A **header** with the VODo logo.
 * - A **main** section where the routed page content is rendered.
 * - A **footer** displaying copyright information.
 *
 * @param {Props} children - The page content to be displayed within the layout.
 * @returns {React.JSX.Element} The structured HTML layout.
 */
const RootLayout = ({ children }: Props): React.JSX.Element => {
  return (
    <html lang='en'>
      <body suppressHydrationWarning>
        {/* Header Section with Logo */}
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <Link href='/' className={styles.logo}>
              VODo
            </Link>
          </div>
        </header>

        {/* Main Content Section */}
        <main className={styles.main}>{children}</main>

        {/* Footer Section */}
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} VODo. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
