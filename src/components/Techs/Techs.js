function Tech() {
  return (
    <div className="tech-project">
      <div className="tech-project__container">
        <h2 className="tech-project__header">Технологии</h2>
        <div className="tech-project__details">
          <div className="tech-project__details-section">
            <h3 className="tech-project__subtitle">7 технологий</h3>
            <p className="tech-project__text">
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <div className="tech-project__techs">
              <div className="tech-project__tech">HTML</div>
              <div className="tech-project__tech">CSS</div>
              <div className="tech-project__tech">JS</div>
              <div className="tech-project__tech">React</div>
              <div className="tech-project__tech">Git</div>
              <div className="tech-project__tech">Express.js</div>
              <div className="tech-project__tech">mongoDB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tech;
