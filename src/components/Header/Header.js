import logo from '../../images/logo.svg';

function Header() {
  const isLoggedIn = false;
  const moviesComponent = false;
  const savedMoviesComponent = false;
  const profileComponent = false;
  const authComponent = true;

  const loggedInContainer = (
    <div className="header__account-container">
      <div className={`header__movies ${moviesComponent ? 'header__movies_clicked' : ''}`}>Фильмы</div>
      <div className={`header__saved-movies ${savedMoviesComponent ? 'header__saved-movies_clicked' : ''}`}>Сохранённые фильмы</div>
      <div className="header__account-button">
        <div className={`header__account ${profileComponent ? 'header__account_clicked' : ''}`}>Аккаунт</div>
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
    authComponent ? '' :
    <header className={`header ${moviesComponent || savedMoviesComponent || profileComponent ? 'header_dark' : ''}`}>
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип"></img>
        {isLoggedIn ? loggedInContainer : loggedOutContainer}
      </div>
    </header>
  );
}

export default Header;
