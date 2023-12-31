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
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SideMenu from '../SideMenu/SideMenu';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { auth } from '../../utils/Auth';
import { filterByDuration, filterByQuery } from '../../utils/Utils.js';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [isLoading, setIsLoading] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [moviesCardList, setMoviesCardList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moreButton, setMoreButton] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') ?? '');
  const [profileNotification, setProfileNotification] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccesfullUpdate, setIsSuccesfullUpdate] = useState('');
  const [initialSavedMovies, setInitialSavedMovies] = useState([]);
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';
  const jwt = localStorage.getItem('jwt');

  function logoutIfNoToken() {
    handleLogOut();
    navigate('/');
  }

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!jwt) {
      logoutIfNoToken();
    }
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
  }, [isLoggedIn, jwt]);

  function getSavedMovies() {
    if (!jwt) {
      logoutIfNoToken();
      return;
    }
    setIsLoading(true);
    return mainApi
      .getSavedMovies(jwt)
      .then((movies) => {
        setIsLoading(false);
        setSavedMovies(movies);
        setInitialSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateProfile(name, email) {
    if (!jwt) {
      logoutIfNoToken();
      return;
    }

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
      .catch((err) => {
        setIsSuccesfullUpdate(false);
        setProfileError('При обновлении профиля произошла ошибка');
        if (err === 'Ошибка: 409') {
          setProfileError('Такой email уже существует');
        }
      });
  }

  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setRegisterError('Такой email уже существует.');
        } else {
          setRegisterError('При регистрации произошла ошибка.');
        }
      });
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
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setLoginError('Вы ввели неправильный логин или пароль.');
        }
      });
  }

  function handleLogOut() {
    setMoviesCardList([]);
    setSavedMovies([]);
    setSearchQuery('');
    setShortMovies(false);
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  }

  function turnShortMoviesOn() {
    setShortMovies(true);

    if (moviesPage) {
      localStorage.setItem('shortMovies', true);
      setMoviesCardList(filterByDuration(moviesCardList));
    } else {
      if (filterByDuration(savedMovies).length === 0) {
        setNothingFound(true);
      } else {
        setSavedMovies(filterByDuration(savedMovies));
      }
    }
  }

  function turnShortMoviesOff() {
    const moviesList = JSON.parse(localStorage.getItem('moviesList'));

    setShortMovies(false);

    if (moviesPage) {
      localStorage.setItem('shortMovies', false);

      if (moviesList && moviesList.length > 0) {
        const filteredMovies = filterByQuery(moviesList, searchQuery, false);
        setMoviesCardList(filteredMovies);
      } else {
        setMoviesCardList([]);
      }
    } else {
      setNothingFound(false);
      setSavedMovies(filterByQuery(initialSavedMovies, searchQuery, false));
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

  function filterSearchedMovies() {
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
        filterSearchedMovies();
      })
      .catch(() => {
        setIsLoading(false);
        setIsNetworkError(true);
      });
  }

  function searchMoviesInLocalStorage(searchQuery) {
    const moviesList = JSON.parse(localStorage.getItem('moviesList'));

    if (moviesList) {
      return filterByQuery(moviesList, searchQuery, shortMovies);
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
      const filteredSavedMovies = searchInSavedMovies(searchQuery);
      if (filteredSavedMovies.length === 0) {
        setNothingFound(true);
      }

      setSavedMovies(filteredSavedMovies);
    }
  }

  function searchInSavedMovies(searchQuery) {
    if (savedMovies) {
      return filterByQuery(savedMovies, searchQuery, shortMovies);
    } else {
      setNothingFound(true);
      return [];
    }
  }

  function handleSave(movie) {
    if (!jwt) {
      logoutIfNoToken();
    }
    return mainApi.createMovie(movie, jwt).then((m) => {
      setSavedMovies((prevSavedMovies) => {
        const updatedSavedMovies = [...prevSavedMovies, m];
        return updatedSavedMovies;
      });
    });
  }

  function handleUnsave(movie) {
    if (!jwt) {
      logoutIfNoToken();
    }
    return mainApi.deleteMovie(movie._id, jwt).then((m) => {
      setSavedMovies((prevSavedMovies) => {
        const updatedSavedMovies = prevSavedMovies.filter((m) => {
          return m._id !== movie._id;
        });
        return updatedSavedMovies;
      });
    });
  }

  function openSideMenu() {
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
                setNothingFound={setNothingFound}
                initialSavedMovies={initialSavedMovies}
                getSavedMovies={getSavedMovies}
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
                setProfileError={setProfileError}
                setIsSuccesfullUpdate={setIsSuccesfullUpdate}
              />
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register handleRegister={handleRegister} handleLogin={handleLogin} registerError={registerError} />
              )
            }
          />
          <Route
            path="/signin"
            element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} loginError={loginError} />}
          />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
        <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
