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
      <div className="more-container">
        {savedMoviesPage ? (
          <div className="more-container__divider"></div>
        ) : (
          <button className="more-container__button">Ещё</button>
        )}
      </div>
    </>
  );
}

export default MoviesCardList;
