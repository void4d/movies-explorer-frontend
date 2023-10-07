import landingLogo from '../../images/landing-logo.svg'

function Main() {
  return (
    <main className="main">
      <div className="main__block">
        <div className="main__text">
          <h1 className="main__title">Учебный проект студента факультета Веб&#x2011;разработки.</h1>
          <p className="main__more">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <div className="main__more-button">
            <div className="main__more-button-text">Узнать больше</div>
          </div>
        </div>
        <img className="main__landing-logo" src={landingLogo} alt='Веб'></img>
      </div>
    </main>
  );
}

export default Main;
