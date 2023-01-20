import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../styles/modules/Home.module.css";
import paginationStyles from "../styles/modules/Pagination.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState<Array<any>>();
  const [searchResults, setSearchResults] = useState("");
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
    setSearchResults(data.totalResults);
    setMovies(data.Search);
    console.log(data);
  };

  const paginate = (event: any) => {
    setCurrentPage(event.selected + 1);
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
        {!movies && (
          <div className={styles.introContainer}>
            <h1>
              Welcome to the source of all things movie and series related
            </h1>
            <h2>
              Go ahead and search for a movie or series.
              <br /> You can also filter between showing movies, series or both.
            </h2>
          </div>
        )}

        <div className={styles.movieList}>
          {movies &&
            movies.map((movie: any) => {
              return (
                <Link href={`/title/${movie.imdbID}`} key={movie.imdbID}>
                  <div className={styles.movieCard}>
                    {movie.Poster !== "N/A" && (
                      <Image
                        src={`${movie.Poster}`}
                        alt={movie.Title}
                        width={300}
                        height={443}
                      />
                    )}
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                  </div>
                </Link>
              );
            })}
        </div>

        {searchResults && (
          <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(parseInt(searchResults) / 10)}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageRangeDisplayed={5}
            containerClassName={paginationStyles.pagination}
            pageClassName={paginationStyles.pageListItem}
            pageLinkClassName={paginationStyles.pageLink}
            previousLinkClassName={paginationStyles.prevButton}
            nextLinkClassName={paginationStyles.nextButton}
            activeLinkClassName={paginationStyles.activePageLink}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;
