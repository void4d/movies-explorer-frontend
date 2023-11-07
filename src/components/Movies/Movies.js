import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Movies({
  isSaved,
  handleSave,
  handleUnsave,
  searchQuery,
  setSearchQuery,
  setMoviesCardList,
  turnShortMoviesOn,
  turnShortMoviesOff,
  moviesCardList,
  shortMovies,
  findMovie,
  handleSearchChange,
  isLoading,
  isFieldEmpty,
  nothingFound,
  moreButton,
  isNetworkError,
  setMoreButton,
  savedMovies,
  setShortMovies,
}) {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';

  useEffect(() => {
    if (moviesPage) {
      if (localStorage.getItem('searchQuery') && localStorage.getItem('searchedMovies')) {
        setSearchQuery(localStorage.getItem('searchQuery'));
        setMoviesCardList(JSON.parse(localStorage.getItem('searchedMovies')));
      } else {
        setSearchQuery('');
        setMoviesCardList([]);
      }
    }

    setShortMovies(false);
  }, [moviesPage]);

  return (
    <main>
      <section>
        <SearchForm
          turnShortMoviesOn={turnShortMoviesOn}
          turnShortMoviesOff={turnShortMoviesOff}
          shortMovies={shortMovies}
          findMovie={findMovie}
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />
        <MoviesCardList
          moviesCardList={moviesCardList}
          isLoading={isLoading}
          isFieldEmpty={isFieldEmpty}
          nothingFound={nothingFound}
          moreButton={moreButton}
          isNetworkError={isNetworkError}
          setMoreButton={setMoreButton}
          isSaved={isSaved}
          handleSave={handleSave}
          handleUnsave={handleUnsave}
          savedMovies={savedMovies}
        />
      </section>
    </main>
  );
}

export default Movies;
