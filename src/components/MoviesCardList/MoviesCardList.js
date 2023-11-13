import { useEffect, React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader.js';
import {
  DESKTOP_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  DESKTOP_TOTAL_MOVIES,
  TABLET_TOTAL_MOVIES,
  MOBILE_TOTAL_MOVIES,
  DESKTOP_ADDITIONAL_MOVIES,
  TABLET_ADDITIONAL_MOVIES,
  MOBILE_ADDITIONAL_MOVIES,
} from '../../utils/Constants.js';

function MoviesCardList({
  moviesCardList,
  isLoading,
  isFieldEmpty,
  nothingFound,
  moreButton,
  setMoreButton,
  isNetworkError,
  handleSave,
  handleUnsave,
  isSaved,
  savedMovies,
}) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';
  const moviesPage = location.pathname === '/movies';

  const [visibleMovies, setVisibleMovies] = useState(12);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const movieCards = (
    <ul className="movies-card-list__container">
      {!savedMoviesPage
        ? moviesCardList
            .slice(0, visibleMovies)
            .map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
                isSaved={isSaved}
                savedMovies={savedMovies}
              />
            ))
        : savedMovies.map((movie) => (
            <MoviesCard movie={movie} key={movie._id} handleUnsave={handleUnsave} savedMovies={savedMovies} />
          ))}
    </ul>
  );

  function showMoreMovies() {
    if (windowSize >= DESKTOP_SCREEN_WIDTH) {
      setVisibleMovies(visibleMovies + DESKTOP_ADDITIONAL_MOVIES);
    } else if (windowSize <= DESKTOP_SCREEN_WIDTH && windowSize >= TABLET_SCREEN_WIDTH) {
      setVisibleMovies(visibleMovies + TABLET_ADDITIONAL_MOVIES);
    } else if (windowSize <= TABLET_SCREEN_WIDTH) {
      setVisibleMovies(visibleMovies + MOBILE_ADDITIONAL_MOVIES);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (windowSize >= DESKTOP_SCREEN_WIDTH) {
        setVisibleMovies(DESKTOP_TOTAL_MOVIES);
      } else if (windowSize <= DESKTOP_SCREEN_WIDTH && windowSize >= TABLET_SCREEN_WIDTH) {
        setVisibleMovies(TABLET_TOTAL_MOVIES);
      } else if (windowSize <= TABLET_SCREEN_WIDTH) {
        setVisibleMovies(MOBILE_TOTAL_MOVIES);
      }
    }, 500);
  }, [windowSize, moreButton]);

  useEffect(() => {
    function handleWindowSizeChange() {
      setWindowSize(window.innerWidth);
    }

    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  });

  useEffect(() => {
    if (!savedMoviesPage) {
      if (moviesCardList.length <= visibleMovies) {
        setMoreButton(false);
      } else {
        setMoreButton(true);
      }
    }
  }, [moviesCardList, visibleMovies, setMoreButton, moviesPage]);

  const noResultsMessage = <div className="no-results">Поиск не дал результатов</div>;
  const noKeyWordMessage = <div className="no-results">Введите ключевое слово</div>;
  const networkErrorMessage = (
    <div className="no-results">
      Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и
      попробуйте ещё раз.
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className="movies-card-list">
            {isNetworkError
              ? networkErrorMessage
              : isFieldEmpty
              ? noKeyWordMessage
              : nothingFound
              ? noResultsMessage
              : movieCards}
          </div>
          <div className="more-container">
            {savedMoviesPage && <div className="more-container__divider"></div>}
            {!savedMoviesPage && moreButton ? (
              <button className="more-container__button" onClick={showMoreMovies}>
                Ещё
              </button>
            ) : (
              <div className="more-container__divider"></div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default MoviesCardList;
