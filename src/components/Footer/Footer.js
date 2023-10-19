import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isExistingPage =
    location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';

  return (
    <footer className={`footer ${!isExistingPage ? 'footer_hidden' : ''}`}>
      <div className="footer__container">
        <div className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</div>
        <div className="footer__bottom">
          <div className="footer__copyright">&copy; 2023</div>
          <div className="footer__links">
            <a className="footer__link" href="https://praktikum.yandex.ru">
              Яндекс.Практикум
            </a>
            <a className="footer__link" href="https://github.com/void4d">
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
