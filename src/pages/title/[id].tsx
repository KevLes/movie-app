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

  const splitAndJoinStrings = (value: string) => {
    const splitedValue = value.split(",");
    return splitedValue.join(" | ");
  }

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
                <li>{movieInfo.imdbRating}/10 <Image src="/star.png" width={18} height={18} alt="IMDd rating" /></li>
              </ul>
            </div>
            <div className={styles.movieDetails}>
              <p>{movieInfo.Plot}</p>
              <p><span>Director</span> {movieInfo.Director}</p>
              <p><span>Writers</span> {splitAndJoinStrings(movieInfo.Writer)}</p>
              <p><span>Actors</span> {splitAndJoinStrings(movieInfo.Actors)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieInfoPage;
