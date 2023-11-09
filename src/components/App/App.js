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
import { useNavigate, useLocation } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [isLoading, setIsLoading] = React.useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = React.useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);
  const [moviesCardList, setMoviesCardList] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moreButton, setMoreButton] = React.useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') ?? '');
  const [profileNotification, setProfileNotification] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccesfullUpdate, setIsSuccesfullUpdate] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';
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
          getSavedMovies();
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  function handleUpdateProfile(name, email) {
    return mainApi
      .updateProfile(name, email, jwt)
      .then((data) => {
        setCurrentUser(data);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        setIsSuccesfullUpdate(true);
        setProfileNotification('Профиль успешно обновлен');
        setTimeout(() => {
          setIsEditing(false);
          setProfileNotification('');
        }, 2000);
      })
      .catch(() => {
        setIsSuccesfullUpdate(false);
        setProfileError('При обновлении профиля произошла ошибка');
      });
  }

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
    setMoviesCardList([]);
    setSavedMovies([]);
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  }

  function turnShortMoviesOn() {
    setShortMovies(true);
    localStorage.setItem('shortMovies', true);
    filterByDuration();
  }

  function turnShortMoviesOff() {
    setShortMovies(false);
    localStorage.setItem('shortMovies', false);

    if (moviesPage) {
      const localStorageSearchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
      if (localStorageSearchedMovies && localStorageSearchedMovies.length > 0) {
        setMoviesCardList(localStorageSearchedMovies);
      } else {
        setMoviesCardList([]);
      }
    } else {
      const localStorageSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if (localStorageSavedMovies && localStorageSavedMovies.length > 0) {
        setSavedMovies(localStorageSavedMovies);
      } else {
        setSavedMovies([]);
      }
      setSavedMovies(localStorageSavedMovies);
    }
  }

  function filterByDuration() {
    if (moviesPage) {
      setMoviesCardList(moviesCardList.filter((m) => m.duration < 40));
    } else {
      setSavedMovies(savedMovies.filter((m) => m.duration < 40));
    }
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
      const filteredSavedMovies = moviesList.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      if (shortMovies) {
        return filteredSavedMovies.filter((m) => m.duration < 40);
      } else {
        return filteredSavedMovies;
      }
    } else {
      setNothingFound(true);
      return [];
    }
  }

  function findInSavedMovies(e) {
    e.preventDefault();

    if (searchQuery === '') {
      setIsFieldEmpty(true);
    } else {
      setIsFieldEmpty(false);
      const filteredSavedMovies = searchSavedMoviesInLocalStorage(searchQuery);
      if (filteredSavedMovies.length === 0) {
        setNothingFound(true);
      }

      setSavedMovies(filteredSavedMovies.reverse());
    }
  }

  function searchSavedMoviesInLocalStorage(searchQuery) {
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMovies'));

    if (savedMoviesList) {
      const filteredMovies = savedMoviesList.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      if (shortMovies) {
        return filteredMovies.filter((m) => m.duration < 40);
      } else {
        return filteredMovies;
      }
    } else {
      setNothingFound(true);
      return [];
    }
  }

  function handleSave(movie) {
    mainApi.createMovie(movie, jwt).then((m) => {
      setSavedMovies((prevSavedMovies) => {
        const updatedSavedMovies = [...prevSavedMovies, m];
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        return updatedSavedMovies;
      });
    });
  }

  function handleUnsave(movie) {
    mainApi.deleteMovie(movie._id, jwt).then((m) => {
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
        localStorage.setItem('savedMovies', JSON.stringify(movies));
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
                turnShortMoviesOn={turnShortMoviesOn}
                turnShortMoviesOff={turnShortMoviesOff}
                moviesCardList={moviesCardList}
                shortMovies={shortMovies}
                setShortMovies={setShortMovies}
                findMovie={findMovie}
                handleSearchChange={handleSearchChange}
                isLoading={isLoading}
                isFieldEmpty={isFieldEmpty}
                nothingFound={nothingFound}
                moreButton={moreButton}
                isNetworkError={isNetworkError}
                setMoreButton={setMoreButton}
                savedMovies={savedMovies}
                setIsFieldEmpty={setIsFieldEmpty}
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
                turnShortMoviesOn={turnShortMoviesOn}
                turnShortMoviesOff={turnShortMoviesOff}
                handleSearchChange={handleSearchChange}
                isFieldEmpty={isFieldEmpty}
                nothingFound={nothingFound}
                shortMovies={shortMovies}
                setShortMovies={setShortMovies}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSavedMovies={setSavedMovies}
                findInSavedMovies={findInSavedMovies}
                setIsFieldEmpty={setIsFieldEmpty}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                isLoggedIn={isLoggedIn}
                handleLogOut={handleLogOut}
                handleUpdateProfile={handleUpdateProfile}
                profileNotification={profileNotification}
                profileError={profileError}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isSuccesfullUpdate={isSuccesfullUpdate}
              />
            }
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
