import { Link, useLocation } from 'react-router-dom';

function SideMenu({ isOpen, onClose }) {
  const location = useLocation();

  const isMainPage = location.pathname === '/';
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className={`side-menu-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <ul className={`side-menu ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="side-menu__close-button" onClick={onClose}></div>
        <li>
          <Link to="/" className="link">
            <div className={`side-menu__main ${isMainPage ? 'side-menu__main_clicked' : ''}`}>Главная</div>
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
                  <div className="side-menu__account-icon"></div>
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
