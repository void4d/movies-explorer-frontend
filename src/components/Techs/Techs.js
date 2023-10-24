function Tech() {
  return (
    <section className="tech-project">
      <div className="tech-project__container">
        <h2 className="tech-project__header">Технологии</h2>
        <div className="tech-project__details">
          <div className="tech-project__details-section">
            <h3 className="tech-project__subtitle">7 технологий</h3>
            <p className="tech-project__text">
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <ul className="tech-project__techs">
              <li className="tech-project__tech">HTML</li>
              <li className="tech-project__tech">CSS</li>
              <li className="tech-project__tech">JS</li>
              <li className="tech-project__tech">React</li>
              <li className="tech-project__tech">Git</li>
              <li className="tech-project__tech">Express.js</li>
              <li className="tech-project__tech">mongoDB</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tech;
