import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SavedMovies({
  handleUnsave,
  savedMovies,
  isLoading,
  turnShortMoviesOn,
  findInSavedMovies,
  handleSearchChange,
  shortMovies,
  isFieldEmpty,
  nothingFound,
  searchQuery,
  setSearchQuery,
  turnShortMoviesOff,
  setShortMovies,
  setSavedMovies,
  setIsFieldEmpty,
}) {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';

  useEffect(() => {
    if (moviesPage && localStorage.getItem('searchedMovies')) {
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
      setIsFieldEmpty(false);
    }

    setIsFieldEmpty(false);
    setSearchQuery('');
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('shortSavedMovies')) === true) {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, []);

  return (
    <main>
      <section>
        <SearchForm
          turnShortMoviesOn={turnShortMoviesOn}
          turnShortMoviesOff={turnShortMoviesOff}
          findInSavedMovies={findInSavedMovies}
          handleSearchChange={handleSearchChange}
          shortMovies={shortMovies}
          searchQuery={searchQuery}
        />
        <MoviesCardList
          handleUnsave={handleUnsave}
          savedMovies={savedMovies}
          isLoading={isLoading}
          isFieldEmpty={isFieldEmpty}
          nothingFound={nothingFound}
        />
      </section>
    </main>
  );
}

export default SavedMovies;
