import logo from '../../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header({ isLoggedIn }) {
  const location = useLocation();

  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const isProfilePage = location.pathname === '/profile';
  const isExistingPage =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile';

  const menuButton = (
    <div className="menu-button">
      <div className="menu-button__line"></div>
      <div className="menu-button__line"></div>
      <div className="menu-button__line"></div>
    </div>
  );

  const loggedInContainer = (
    <ul className="header__account-container">
      <li>
        <Link to="/movies" className="link">
          <div className={`header__movies ${isMoviesPage ? 'header__movies_clicked' : ''}`}>Фильмы</div>
        </Link>
      </li>
      <li>
        <Link to="/saved-movies" className="link">
          <div className={`header__saved-movies ${isSavedMoviesPage ? 'header__saved-movies_clicked' : ''}`}>
            Сохранённые фильмы
          </div>
        </Link>
      </li>
      <li>
        {' '}
        <Link to="/profile" className="link">
          <div className="header__account-button">
            <div className={`header__account ${isProfilePage ? 'header__account_clicked' : ''}`}>Аккаунт</div>
            <div className="header__account-icon-container">
              <div className="header__account-icon" alt="Аккаунт"></div>
            </div>
          </div>
        </Link>
      </li>
      {menuButton}
    </ul>
  );

  const loggedOutContainer = (
    <ul className="header__account-container">
      <li>
        <Link to="/signup" className="link">
          <div className="header__register-button">Регистрация</div>
        </Link>
      </li>
      <li>
        {' '}
        <Link to="/signin" className="link">
          <div className="header__login-button">
            <div className="header__login-text">Войти</div>
          </div>{' '}
        </Link>
      </li>
    </ul>
  );

  return !isExistingPage ? (
    ''
  ) : (
    <header className={`header ${isMoviesPage || isSavedMoviesPage || isProfilePage ? 'header_dark' : ''}`}>
      <nav className="header__container">
        <Link to="/" className="link">
          <img className="header__logo" src={logo} alt="Логотип"></img>
        </Link>

        {isLoggedIn ? loggedInContainer : loggedOutContainer}
      </nav>
    </header>
  );
}

export default Header;
