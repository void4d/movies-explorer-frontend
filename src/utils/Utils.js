function filterByDuration(movies) {
  return movies.filter((m) => m.duration < 40);
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
