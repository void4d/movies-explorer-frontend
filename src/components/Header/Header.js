import logo from '../../images/logo.svg';

function Header() {
  const isLoggedIn = true;
  const MoviesComponent = false;
  const savedMoviesComponent = true;

  const loggedInContainer = (
    <div className="header__account-container">
      <div className={`header__movies ${MoviesComponent ? 'header__movies_clicked' : ''}`}>Фильмы</div>
      <div className={`header__saved-movies ${savedMoviesComponent ? 'header__saved-movies_clicked' : ''}`}>Сохранённые фильмы</div>
      <div className="header__account-button">
        <div className="header__account">Аккаунт</div>
        <div className="header__account-icon-container">
          <div className="header__account-icon" alt="Аккаунт"></div>
        </div>
      </div>
    </div>
  );

  const loggedOutContainer = (
    <div className="header__account-container">
      <div className="header__register-button">Регистрация</div>
      <div className="header__login-button">
        <div className="header__login-text">Войти</div>
      </div>
    </div>
  );

  return (
    <header className={`header ${MoviesComponent || savedMoviesComponent ? 'header_dark' : ''}`}>
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип"></img>
        {isLoggedIn ? loggedInContainer : loggedOutContainer}
      </div>
    </header>
  );
}

export default Header;
