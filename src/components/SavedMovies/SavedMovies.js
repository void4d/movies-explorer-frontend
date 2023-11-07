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
  getSavedMovies,
  isLoading,
  toggleShortMovies,
  findInSavedMovies,
  handleSearchChange,
  shortMovies,
  isFieldEmpty,
  nothingFound,
  searchQuery,
  setSearchQuery,
}) {
  React.useEffect(() => {
    getSavedMovies();
    setSearchQuery('');
  }, []);

  return (
    <main>
      <section>
        <SearchForm
          toggleShortMovies={toggleShortMovies}
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
