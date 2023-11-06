import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { mainApi } from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies({ handleUnsave, savedMovies, getSavedMovies, isLoading }) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';

  const [isFieldEmpty, setIsFieldEmpty] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);
  const [shortMovies, setShortMovies] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNetworkError, setIsNetworkError] = useState(false);

  React.useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <main>
      <section>
        <SearchForm />
        <MoviesCardList handleUnsave={handleUnsave} savedMovies={savedMovies} isLoading={isLoading} />
      </section>
    </main>
  );
}

export default SavedMovies;
