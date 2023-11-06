import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { Routes, Route } from 'react-router-dom';
import SideMenu from '../SideMenu/SideMenu';
import { useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { auth } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [isLoading, setIsLoading] = React.useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);
  const [moviesCardList, setMoviesCardList] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moreButton, setMoreButton] = React.useState(false);
  const [shortMovies, setShortMovies] = useState(true);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') ?? '');
  const [isNetworkError, setIsNetworkError] = useState(false);

  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  React.useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getProfile(jwt)
        .then((data) => {
          setCurrentUser(data);
          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email, password) {
    return auth
      .login(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          navigate('/movies');
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  }

  function toggleShortMovies(e) {
    setShortMovies(!shortMovies);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function findMovie(e) {
    e.preventDefault();

    if (searchQuery === '') {
      setIsFieldEmpty(true);
      setMoreButton(false);
    } else {
      setMoreButton(false);
      setIsFieldEmpty(false);
      saveMoviesInLocalStorage();
    }
  }

  function saveMoviesInLocalStorage() {
    setIsNetworkError(false);
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((res) => {
        localStorage.setItem('moviesList', JSON.stringify(res));
        localStorage.setItem('searchQuery', searchQuery);
        setIsLoading(false);

        const filteredMovies = searchMoviesInLocalStorage(searchQuery);
        if (filteredMovies.length === 0) {
          setNothingFound(true);
        } else {
          if (filteredMovies.length > 12) {
            setMoreButton(true);
          } else {
            setMoreButton(false);
          }
          setNothingFound(false);
          setMoviesCardList(filteredMovies);
          localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsNetworkError(true);
      });
  }

  function searchMoviesInLocalStorage(searchQuery) {
    const moviesList = JSON.parse(localStorage.getItem('moviesList'));

    if (moviesList) {
      const filteredMovies = moviesList.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      return filteredMovies;
    } else {
      setNothingFound(true);
      return [];
    }
  }

  function handleSave(movie) {
    mainApi.createMovie(movie, jwt).then((m) => {
      setSavedMovies((prevSavedMovies) => {
        const updatedSavedMovies = [m, ...prevSavedMovies];
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        return updatedSavedMovies;
      });
    });
  }

  function handleUnsave(movie) {
    mainApi.deleteMovie(movie._id, jwt).then(() => {
      setSavedMovies((prevSavedMovies) => {
        const updatedSavedMovies = prevSavedMovies.filter((m) => {
          return m._id !== movie._id;
        });
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        return updatedSavedMovies;
      });
    });
  }

  function getSavedMovies() {
    setIsLoading(true);
    mainApi
      .getSavedMovies(jwt)
      .then((movies) => {
        setIsLoading(false);
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  }

  function openSideMenu(e) {
    setIsSideMenuOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeSideMenu() {
    setIsSideMenuOpen(false);
    document.body.style.overflow = 'unset';
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onClick={openSideMenu} />
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                isLoggedIn={isLoggedIn}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setMoviesCardList={setMoviesCardList}
                toggleShortMovies={toggleShortMovies}
                moviesCardList={moviesCardList}
                shortMovies={shortMovies}
                findMovie={findMovie}
                handleSearchChange={handleSearchChange}
                isLoading={isLoading}
                isFieldEmpty={isFieldEmpty}
                nothingFound={nothingFound}
                moreButton={moreButton}
                isNetworkError={isNetworkError}
                setMoreButton={setMoreButton}
                savedMovies={savedMovies}
                getSavedMovies={getSavedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
                handleUnsave={handleUnsave}
                savedMovies={savedMovies}
                isLoading={isLoading}
                getSavedMovies={getSavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />}
          />
          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
        <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
