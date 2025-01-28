import { Metadata } from 'next';

import ShowDetails from '@/pages/shows/[showId]';
import { fetchShowById } from '@/services';

interface ShowDetailsControllerProps {
  params: Promise<{ showId: string }>;
}

export const generateMetadata = async ({ params }: ShowDetailsControllerProps): Promise<Metadata> => {
  const { showId } = await params;
  const show = await fetchShowById(showId);

  return {
    title: `${show.name} - VODo`,
    description: show.summary?.replace(/<[^>]+>/g, ''), // Remove HTML tags from the summary
  };
};

const ShowDetailsController = async ({ params }: ShowDetailsControllerProps): Promise<React.JSX.Element> => {
  const { showId } = await params;
  const show = await fetchShowById(showId);

  return <ShowDetails show={show} />;
};

export default ShowDetailsController;
