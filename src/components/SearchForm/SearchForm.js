function SearchForm({ toggleShortMovies, shortMovies, findMovie, handleSearchChange, searchQuery }) {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <div className="search-form__field">
          <input
            className="search-form__input"
            placeholder="Фильм"
            onChange={handleSearchChange}
            value={searchQuery}
          ></input>
          <button className="search-form__search-button" type="submit" onClick={findMovie}>
            Поиск
          </button>
        </div>

        <div className="search-form__short-container">
          <button
            className={`search-form__short-tumbler ${shortMovies ? '' : 'search-form__short-tumbler_off'}`}
            onClick={toggleShortMovies}
            type="button"
          ></button>
          <p className="search-form__short-text">Короткометражки</p>
        </div>
        <div className="search-form__divider"></div>
      </div>
    </form>
  );
}

export default SearchForm;
