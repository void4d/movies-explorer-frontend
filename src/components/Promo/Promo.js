import landingLogo from '../../images/landing-logo.svg'

function Promo() {
  return (
    <main className="promo">
      <div className="promo__container">
        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#x2011;разработки.</h1>
          <p className="promo__more">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <div className="promo__more-button">
            <div className="promo__more-button-text">Узнать больше</div>
          </div>
        </div>
        <img className="promo__landing-logo" src={landingLogo} alt='Веб'></img>
      </div>
    </main>
  );
}

export default Promo;
