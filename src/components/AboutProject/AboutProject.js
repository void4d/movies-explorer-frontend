function AboutProject() {
  return (
    <div className="about-project">
      <div className="about-project__container">
        <h2 className="about-project__header" id='about-project'>О проекте</h2>
        <div className="about-project__details">
          <div className="about-project__details-section">
            <h3 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__details-section">
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>

        <div className="about-project__progress-bar">
          <div className="about-project__progress-done">1 неделя</div>
          <div className="about-project__progress-left">4 недели</div>
        </div>

        <div className="about-project__progress-bar-labels">
          <div className="about-project__progress-label-done">Back-end</div>
          <div className="about-project__progress-label-left">Front-end</div>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
