import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader.js';
import { useEffect, React, useState } from 'react';

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

  const [visibleMovies, setVisibleMovies] = useState(12);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const movieCards = (
    <ul className="movies-card-list__container">
      {!savedMoviesPage
        ? moviesCardList
            .slice(0, visibleMovies)
            .map((movie, index) => (
              <MoviesCard
                movie={movie}
                key={index}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
                isSaved={isSaved}
                savedMovies={savedMovies}
              />
            ))
        : savedMovies.map((movie, index) => (
            <MoviesCard movie={movie} key={index} handleUnsave={handleUnsave} savedMovies={savedMovies} />
          ))}
    </ul>
  );

  function showMoreMovies() {
    let increment = 0;
    if (windowSize > 1279) {
      increment = 3;
    } else if (windowSize < 1280 && windowSize > 480) {
      increment = 2;
    } else if (windowSize <= 480) {
      increment = 1;
    }

    setVisibleMovies(visibleMovies + increment);
  }

  useEffect(() => {
    setTimeout(() => {
      if (windowSize > 1279) {
        setVisibleMovies(12);
      } else if (windowSize < 1280 && windowSize > 480) {
        setVisibleMovies(8);
      } else if (windowSize <= 480) {
        setVisibleMovies(5);
      }
    }, 500);
  }, [windowSize]);

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
  }, [moviesCardList, visibleMovies, setMoreButton]);

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
