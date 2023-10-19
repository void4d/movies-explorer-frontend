import Photo from '../../images/placeholder.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <div className="about-me">
      <div className="about-me__block">
        <h2 className="about-me__header">Студент</h2>
        <div className="about-me__details">
          <div className="about-me__details-section">
            <h3 className="about-me__subtitle">Павел</h3>
            <p className="about-me__sub-subtitle">Фронтенд-разработчик, 27 лет</p>
            <p className="about-me__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero vitae velit blandit sollicitudin.
              Nulla nec mauris eget metus fermentum consequat. Vivamus sit amet urna ut nisi aliquam venenatis. Integer
              commodo ex eu ex vestibulum, in tristique erat tincidunt.
            </p>
            <a className="about-me__github" href="https://github.com/void4d">
              Github
            </a>
          </div>
          <img className="about-me__image" src={Photo} alt="Фото разработчика"></img>
        </div>
        <Portfolio />
      </div>
    </div>
  );
}

export default AboutMe;
