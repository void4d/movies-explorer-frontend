import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
    </>
  );
}

export default SavedMovies;
