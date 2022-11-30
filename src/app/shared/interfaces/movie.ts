export interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path?: string;
  release_date: string;
  adult: boolean;
  original_language: string;
}
