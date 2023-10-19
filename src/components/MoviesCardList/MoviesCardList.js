import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList() {
  const moreThanThree = false;
  const nothingFound = false;

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
        <div
          className={`movies-card-list__more-button ${
            !nothingFound && moreThanThree ? '' : 'movies-card-list__more-button_hidden'
          }`}
        >
          Ещё
        </div>
      </div>
    </>
  );
}

export default MoviesCardList;
