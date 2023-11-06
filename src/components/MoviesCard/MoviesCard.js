import { useLocation } from 'react-router-dom';
import React from 'react';

function MoviesCard({ movie, handleSave, handleUnsave, savedMovies }) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';
  const [isSaved, setIsSaved] = React.useState(false);

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч ${minutes}мин`;
  }

  const movieDuration = formatDuration(movie.duration);

  const isSavedMovie = savedMovies.some((m) => movie.id === m.movieId);
  const isSavedInStorage = JSON.parse(localStorage.getItem('savedMovies')).some((m) => movie.id === m.id);

  function handleSaveButtonClick() {
    if (!isSaved) {
      handleSave(movie);
      setIsSaved(true);
    } else {
      setIsSaved(false);
      handleUnsave(savedMovies.find((m) => m.movieId === movie.id));
    }
  }

  function onDelete() {
    handleUnsave(movie);
    setIsSaved(false);
  }

  React.useEffect(() => {
    if (isSavedMovie || isSavedInStorage) {
      setIsSaved(true);
    }
  }, []);

  const saveButton = (
    <button className="movies-card__save-button" onClick={handleSaveButtonClick}>
      <div className="movies-card__save-button-text">Сохранить</div>
    </button>
  );

  const savedButton = (
    <button className="movies-card__saved-button" onClick={handleSaveButtonClick}>
      <div className="movies-card__check-mark-icon"></div>
    </button>
  );

  const deleteButton = (
    <button className="movies-card__delete-button" onClick={onDelete}>
      <div className="movies-card__cross-icon"></div>
    </button>
  );

  return (
    <li className="movies-card">
      <div className="movies-card__details">
        <p className="movies-card__details-name">{movie.nameRU}</p>
        <p className="movies-card__details-duration">{movieDuration}</p>
      </div>

      <a href={movie.trailerLink}>
        <img
          className="movies-card__thumbnail"
          src={savedMoviesPage ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`}
          alt={movie.nameRU}
        ></img>
      </a>
      {savedMoviesPage ? deleteButton : isSaved ? savedButton : saveButton}
    </li>
  );
}

export default MoviesCard;
