import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState<Array<any>>();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (searchTerm.length > 3) {
      fetchAllMovies(searchTerm);
    }
  }, [searchTerm, typeFilter, currentPage]);

  console.log(currentPage);
  

  const fetchAllMovies = async (searchTerm: string) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=72e2b6a0&s=${searchTerm}&type=${typeFilter}&page=${currentPage}`
    );
    const data = await response.json();
    setMovies(data.Search);
    console.log(data);
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchBar}
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.selectFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value=" ">Choose type</option>
          <option value=" ">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
      </div>
      <div className={styles.movieListContainer}>
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
                      height={443}
                    />
                  )}
                  <h3>
                    <Link href={`/title/${movie.imdbID}`}>{movie.Title}</Link>
                  </h3>
                  <p>{movie.Year}</p>
                </div>
              );
            })}
        </div>
        {movies && (
          <div>
            {currentPage !== 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>Back</button>}
            {movies?.length === 10 && <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
