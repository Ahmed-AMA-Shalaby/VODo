export type Episode = {
  id: number;
  name: string;
  summary: string;
  image: { original: string };
  airdate: string;
  runtime: number;
  season: number;
  number: number;
};
