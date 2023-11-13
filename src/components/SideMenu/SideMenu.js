import { Link, useLocation } from 'react-router-dom';

function SideMenu({ isOpen, onClose }) {
  const location = useLocation();

  const isMainPage = location.pathname === '/';
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className={`side-menu-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`side-menu ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="side-menu__close-button" onClick={onClose}></button>
        <ul className="side-menu__navigation">
          <li>
            <Link to="/" className="link" onClick={onClose}>
              <p className={`side-menu__main ${isMainPage ? 'side-menu__main_clicked' : ''}`}>Главная</p>
            </Link>
          </li>
          <li>
            <Link to="/movies" className="link" onClick={onClose}>
              <p className={`side-menu__movies ${isMoviesPage ? 'side-menu__movies_clicked' : ''}`}>Фильмы</p>
            </Link>
          </li>
          <li>
            <Link to="/saved-movies" className="link" onClick={onClose}>
              <p className={`side-menu__saved-movies ${isSavedMoviesPage ? 'side-menu__saved-movies_clicked' : ''}`}>
                Сохранённые фильмы
              </p>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link" onClick={onClose}>
              <div className="side-menu__account-container">
                <div className="side-menu__account-button">
                  <div className={`side-menu__account ${isProfilePage ? 'side-menu__account_clicked' : ''}`}>
                    Аккаунт
                  </div>
                  <div className="side-menu__account-icon-container">
                    <div className="side-menu__account-icon"></div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
