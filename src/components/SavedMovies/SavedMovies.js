import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { mainApi } from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';

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
}) {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';

  React.useEffect(() => {
    if (moviesPage && localStorage.getItem('searchedMovies')) {
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
    }

    setSearchQuery('');
    setShortMovies(false);
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
