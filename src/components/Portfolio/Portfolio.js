import ArrowIcon from '../../images/icon-arrow.svg';

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__header">Портфолио</h4>
      <div className="portfolio__link-container">
        <a className="portfolio__link">Статичный сайт</a>
        <img className="portfolio__arrow" src={ArrowIcon} alt="Стрелка" />
      </div>
      <div className="portfolio__link-container">
        <a className="portfolio__link">Адаптивный сайт</a>
        <img className="portfolio__arrow" src={ArrowIcon} alt="Стрелка" />
      </div>
      <div className="portfolio__link-container">
        <a className="portfolio__link">Одностраничное приложение</a>
        <img className="portfolio__arrow" src={ArrowIcon} alt="Стрелка" />
      </div>
    </div>
  );
}

export default Portfolio;
