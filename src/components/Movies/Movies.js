import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function Movies() {
  return (
    <main>
      <section>
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList />
      </section>
    </main>
  );
}

export default Movies;
