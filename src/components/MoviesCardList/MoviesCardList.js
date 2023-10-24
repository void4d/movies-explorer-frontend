import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList() {
  const location = useLocation();
  const nothingFound = false;

  const savedMoviesPage = location.pathname === '/saved-movies';

  const movieCards = (
    <ul className="movies-card-list__container">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </ul>
  );

  const noResults = <div className="no-results">Поиск не дал результатов</div>;

  return (
    <>
      <div className="movies-card-list">{nothingFound ? noResults : movieCards}</div>
      <div className="movies-card-list__more">
        {savedMoviesPage ? (
          <div className="movies-card-list__divider"></div>
        ) : (
          <div className="movies-card-list__more-button">Ещё</div>
        )}
      </div>
    </>
  );
}

export default MoviesCardList;
