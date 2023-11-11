import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { filterByDuration } from '../../utils/Utils.js';

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
  setIsFieldEmpty,
}) {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';

  const localStorageSearchQuery = localStorage.getItem('searchQuery');
  const localStorageSearchedMovies = localStorage.getItem('searchedMovies');
  const localStorageMoviesList = localStorage.getItem('moviesList');
  const localStorageShortState = localStorage.getItem('shortMovies');

  useEffect(() => {
    if (moviesPage && localStorageSearchQuery && localStorageSearchedMovies) {
      setSearchQuery(localStorageSearchQuery);
      setMoviesCardList(JSON.parse(localStorageSearchedMovies));
    } else if (moviesPage && !localStorageSearchQuery && !localStorageSearchedMovies) {
      setMoviesCardList([]);
    } else {
      setMoviesCardList(JSON.parse(localStorageMoviesList));
    }

    setIsFieldEmpty(false);
  }, []);

  useEffect(() => {
    setShortMovies(false);
    if (moviesPage && localStorageSearchedMovies) {
      if (JSON.parse(localStorageShortState) === true) {
        setShortMovies(true);
        setMoviesCardList(filterByDuration(JSON.parse(localStorageSearchedMovies)));
      } else {
        setShortMovies(false);
      }
    } else {
      setMoviesCardList([]);
    }
  }, []);

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
