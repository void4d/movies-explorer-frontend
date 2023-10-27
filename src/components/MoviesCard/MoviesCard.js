import Thumbnail from '../../images/thumbnail.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  const location = useLocation();

  const isSaved = false;
  const savedMoviesPage = location.pathname === '/saved-movies';

  const saveButton = (
    <button className="movies-card__save-button">
      <div className="movies-card__save-button-text">Сохранить</div>
    </button>
  );

  const savedButton = (
    <button className="movies-card__saved-button">
      <div className="movies-card__check-mark-icon"></div>
    </button>
  );

  const deleteButton = (
    <button className="movies-card__delete-button">
      <div className="movies-card__cross-icon"></div>
    </button>
  );

  return (
    <li className="movies-card">
      <div className="movies-card__details">
        <p className="movies-card__details-name">В погоне за Бенкси</p>
        <p className="movies-card__details-duration">0ч 42м</p>
      </div>
      <img className="movies-card__thumbnail" src={Thumbnail} alt=""></img>
      {savedMoviesPage ? deleteButton : isSaved ? savedButton : saveButton}
    </li>
  );
}

export default MoviesCard;
