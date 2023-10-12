import logo from '../../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header({ isLoggedIn }) {
  const location = useLocation();

  const moviesComponent = location.pathname === '/movies';
  const savedMoviesComponent = location.pathname === '/saved-movies';
  const profileComponent = location.pathname === '/profile';
  const notAuthComponent =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/';

  const loggedInContainer = (
    <div className="header__account-container">
      <Link to="/movies">
        <div className={`header__movies ${moviesComponent ? 'header__movies_clicked' : ''}`}>Фильмы</div>
      </Link>
      <Link to="/saved-movies">
        <div className={`header__saved-movies ${savedMoviesComponent ? 'header__saved-movies_clicked' : ''}`}>
          Сохранённые фильмы
        </div>
      </Link>

      <div className="header__account-button">
        <Link to="/profile">
          <div className={`header__account ${profileComponent ? 'header__account_clicked' : ''}`}>Аккаунт</div>
        </Link>

        <div className="header__account-icon-container">
          <div className="header__account-icon" alt="Аккаунт"></div>
        </div>
      </div>
    </div>
  );

  const loggedOutContainer = (
    <div className="header__account-container">
      <Link to="/signup">
        <div className="header__register-button">Регистрация</div>
      </Link>

      <div className="header__login-button">
        <Link to="/signin">
          <div className="header__login-text">Войти</div>
        </Link>
      </div>
    </div>
  );

  return !notAuthComponent ? (
    ''
  ) : (
    <header className={`header ${moviesComponent || savedMoviesComponent || profileComponent ? 'header_dark' : ''}`}>
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Логотип"></img>
        </Link>

        {isLoggedIn ? loggedInContainer : loggedOutContainer}
      </div>
    </header>
  );
}

export default Header;
