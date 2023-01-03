import Image from "next/image";
import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState<Array<any>>();
  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=72e2b6a0&s=batman`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data)

  };

  return (
    <div>
      {movies &&
        movies.map((movie: any) => {
          return (
            <div key={movie.imdbID}>
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
              <Image src={`${movie.Poster}`} alt={movie.Title} width={300} height={468} />
            </div>
          );
        })}
    </div>
  );
};

export default MovieList;
