import { useState, useEffect } from "react";
import { Movie, ApiResponseMovie, Categorie, Genre, Details } from "../../types/types";

function getResponseType(URL: string): 'movies' | 'categories' | 'details' | "similar" | "topRated" | "trending" {
  if (URL.includes("/movie/now_playing")) {
      return 'movies';
  } else if (URL.includes("/genre/movie/list")) {
      return 'categories';
  } else if(URL.includes("/similar")){
    return 'similar';
  } else if(URL.includes("/top_rated")){
    return 'topRated'
  } else if(URL.includes("/movie/week")){
    return 'trending'
  } else {
      return 'details';
  }
}

export default function useMoviesAPI(URL : string) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [categorie, setCategorie] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [details, setDetails] = useState<Details>({} as Details);
    const [similar, setSimilar] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [trending, setTrending] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
              const response = await fetch(
                URL,
                {
                  headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              if (!response.ok) {
                throw new Error('Failed to fetch movies');
              }
              const responseType = getResponseType(URL);

                if (responseType === 'movies') {
                    const data: ApiResponseMovie = await response.json();
                    setMovies(data.results);
                } else if (responseType === 'categories') {
                    const data: Categorie = await response.json();
                    setCategorie(data.genres);
                } else if (responseType === 'details') {
                    const data: Details = await response.json();
                    setDetails(data);
                } else if (responseType === 'similar') {
                    const data: ApiResponseMovie = await response.json();
                    setSimilar(data.results);
                } else if (responseType === 'topRated') {
                    const data: ApiResponseMovie = await response.json();
                    setTopRated(data.results);
                } else if(responseType === 'trending') {
                    const data: ApiResponseMovie = await response.json();
                    setTrending(data.results);
                }

              setLoading(false);
            } catch (error : any) {
              setError(error.message);
              setLoading(false);
            }
          };
      
          fetchData();
        }, [URL]);

    return { movies, loading, error, categorie, details, similar, topRated, trending };

}