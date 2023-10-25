import logo from '../../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header({ isLoggedIn, onClick }) {
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
    <button className="menu-button" onClick={onClick}>
      <span className="menu-button__line"></span>
      <span className="menu-button__line"></span>
      <span className="menu-button__line"></span>
    </button>
  );

  const loggedInContainer = (
    <>
      <ul className="header__account-container">
        <li>
          <Link to="/movies" className="link">
            <p className={`header__movies ${isMoviesPage ? 'header__movies_clicked' : ''}`}>Фильмы</p>
          </Link>
        </li>
        <li>
          <Link to="/saved-movies" className="link">
            <p className={`header__saved-movies ${isSavedMoviesPage ? 'header__saved-movies_clicked' : ''}`}>
              Сохранённые фильмы
            </p>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="link">
            <div className="header__account-button">
              <p className={`header__account ${isProfilePage ? 'header__account_clicked' : ''}`}>Аккаунт</p>
              <div className="header__account-icon-container">
                <div className="header__account-icon"></div>
              </div>
            </div>
          </Link>
        </li>
      </ul>
      {menuButton}
    </>
  );

  const loggedOutContainer = (
    <ul className="header__account-container">
      <li>
        <Link to="/signup" className="link">
          <p className="header__register-button link">Регистрация</p>
        </Link>
      </li>
      <li>
        <Link to="/signin" className="link">
          <button className="header__login-button">
            <p className="header__login-text">Войти</p>
          </button>
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
