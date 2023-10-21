import { Link, useLocation } from 'react-router-dom';

function SideMenu() {
  const location = useLocation();

  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="side-menu-overlay">
      <div className="side-menu__close-button"></div>
      <ul className="side-menu">
        <li>
          <Link to="/" className="link">
            <div className={`side-menu__main ${isSavedMoviesPage ? 'side-menu__main_clicked' : ''}`}>Главная</div>
          </Link>
        </li>
        <li>
          <Link to="/movies" className="link">
            <div className={`side-menu__movies ${isMoviesPage ? 'side-menu__movies_clicked' : ''}`}>Фильмы</div>
          </Link>
        </li>
        <li>
          <Link to="/saved-movies" className="link">
            <div className={`side-menu__saved-movies ${isSavedMoviesPage ? 'side-menu__saved-movies_clicked' : ''}`}>
              Сохранённые фильмы
            </div>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="link">
            <div className="side-menu__account-container">
              <div className="side-menu__account-button">
                <div className={`side-menu__account ${isProfilePage ? 'side-menu__account_clicked' : ''}`}>Аккаунт</div>
                <div className="side-menu__account-icon-container">
                  <div className="side-menu__account-icon" alt="Аккаунт"></div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;
