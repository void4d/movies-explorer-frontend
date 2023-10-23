import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isExistingPage =
    location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';

  return (
    <footer className={`footer ${!isExistingPage ? 'footer_hidden' : ''}`}>
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <nav className="footer__bottom">
          <div className="footer__copyright">&copy; 2023</div>
          <ul className="footer__links">
            <li>
              <a className="footer__link" href="https://praktikum.yandex.ru">
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a className="footer__link" href="https://github.com/void4d">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
