import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/MovieSinglePage.module.css";
import Image from "next/image";

interface MovieInfoProps {
  imdbID: string;
  Title: string;
  Plot: string;
  Poster: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Metascore: string;
  imdbRating: string;
}

const MovieInfoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movieInfo, setMovieInfo] = useState<MovieInfoProps>();

  useEffect(() => {
    getMovieData(id);
  }, [id]);

  const getMovieData = async (id: any) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=72e2b6a0&i=${id}`
    );
    const data = await response.json();
    setMovieInfo(data);
  };

  return (
    movieInfo && (
      <div>
        <Link href="/">Go back</Link>
        <div className={styles.movieDetailsWrapper}>
          {movieInfo.Poster !== "N/A" && (
            <Image
              src={`${movieInfo.Poster}`}
              alt={movieInfo.Title}
              width={300}
              height={443}
            />
          )}
          <div className={styles.movieDetailsContainer}>
            <div className={styles.movieDetailsHeader}>
              <h1>{movieInfo.Title}</h1>
              <ul className={styles.headerListInfo}>
                <li>{movieInfo.Year}</li>
                <li>{movieInfo.Rated}</li>
                <li>{movieInfo.Runtime}</li>
                <li>{movieInfo.imdbRating}/10</li>
              </ul>
            </div>
            <div className={styles.movieDetails}>
              <p>{movieInfo.Plot}</p>
              <p>Director: {movieInfo.Director}</p>
              <p>Writers: {movieInfo.Writer}</p>
              <p>Actors: {movieInfo.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieInfoPage;
