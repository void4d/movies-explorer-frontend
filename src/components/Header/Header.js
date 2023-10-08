import logo from '../../images/logo.svg';

function Header() {
  const isLoggedIn = false;

  const loggedInBlock = (
    <div className="header__account-block">
      <div className="header__movies">Фильмы</div>
      <div className="header__saved-movies">Сохранённые фильмы</div>
      <div className="header__account-button">
        <div className="header__account">Аккаунт</div>
        <div className="header__account-icon-container">
          <div className="header__account-icon" alt="Аккаунт"></div>
        </div>
      </div>
    </div>
  );

  const loggedOutBlock = (
    <div className="header__account-block">
      <div className="header__register-button">Регистрация</div>
      <div className="header__login-button">
        <div className="header__login-text">Войти</div>
      </div>
    </div>
  );

  return (
    <header className="header">
      <div className="header__block">
        <img className="header__logo" src={logo} alt="Логотип"></img>
        {isLoggedIn ? loggedInBlock : loggedOutBlock}
      </div>
    </header>
  );
}

export default Header;
