import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__block">
        <img className="header__logo" src={logo} alt="Логотип"></img>
        <div className="header__account-block">
          <div className="header__movies">Фильмы</div>
          <div className="header__saved-movies">Сохранённые фильмы</div>
          <div className="header__account">Аккаунт</div>
          <div className="header__account-icon-container">
            <div className="header__account-icon" alt="Аккаунт"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
