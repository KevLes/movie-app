import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'

const MovieList = () => {
  const [movies, setMovies] = useState<Array<any>>();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm.length > 3) {
      fetchAllMovies(searchTerm);
    }
  }, [searchTerm]);

  const fetchAllMovies = async (searchTerm: string) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=72e2b6a0&s=${searchTerm}`
    );
    const data = await response.json();
    setMovies(data.Search);
    console.log(data);
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.movieList}>
        {movies &&
          movies.map((movie: any) => {
            return (
              <div className={styles.movieCard} key={movie.imdbID}>
                {movie.Poster !== "N/A" && (
                  <Image
                    src={`${movie.Poster}`}
                    alt={movie.Title}
                    width={300}
                    height={468}
                  />
                )}
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MovieList;
