import { SHORT_MOVIES_DURATION } from './Constants';

function filterByDuration(movies) {
  return movies.filter((m) => m.duration < SHORT_MOVIES_DURATION);
}

function filterByQuery(movies, query, shortMovies) {
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );
  });

  if (shortMovies) {
    return filterByDuration(filteredMovies);
  } else {
    return filteredMovies;
  }
}

export { filterByDuration, filterByQuery };
