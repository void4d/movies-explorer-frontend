import ArrowIcon from '../../images/icon-arrow.svg';

function Portfolio() {
  return (
    <>
      <h4 className="portfolio__header">Портфолио</h4>
      <ul className="portfolio">
        <li className="portfolio__link-container">
          <a
            className="portfolio__link"
            href="https://void4d.github.io/how-to-learn/index.html"
            rel="noreferrer"
            target="_blank"
          >
            Статичный сайт
          </a>
          <a href="https://void4d.github.io/how-to-learn/index.html" rel="noreferrer" target="_blank">
            <img className="portfolio__arrow" src={ArrowIcon} alt="Стрелка" />
          </a>
        </li>
        <li className="portfolio__link-container">
          <a
            className="portfolio__link"
            href="https://void4d.github.io/russian-travel/index.html"
            rel="noreferrer"
            target="_blank"
          >
            Адаптивный сайт
          </a>
          <a href="https://void4d.github.io/russian-travel/index.html" rel="noreferrer" target="_blank">
            <img className="portfolio__arrow" src={ArrowIcon} alt="Стрелка" />
          </a>
        </li>
        <li className="portfolio__link-container">
          <a className="portfolio__link" href="https://github.com/void4d/mesto-react" rel="noreferrer" target="_blank">
            Одностраничное приложение
          </a>
          <a href="https://github.com/void4d/mesto-react" rel="noreferrer" target="_blank">
            <img className="portfolio__arrow" src={ArrowIcon} alt="Стрелка" />
          </a>
        </li>
      </ul>
    </>
  );
}

export default Portfolio;
