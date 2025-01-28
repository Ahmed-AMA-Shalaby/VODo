import { Episode } from '@/models/episode';

export type Show = {
  id: number;
  name: string;
  summary: string;
  image: { original: string };
  _embedded: {
    episodes: Episode[];
  };
};
