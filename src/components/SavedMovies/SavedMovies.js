import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { useEffect } from 'react';

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
  setIsFieldEmpty,
  setNothingFound,
  getSavedMovies,
}) {
  useEffect(() => {
    setShortMovies(false);
    setIsFieldEmpty(false);
    setNothingFound(false);
    setSearchQuery('');
    getSavedMovies();
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
