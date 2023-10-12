import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject.js';
import Tech from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Tech />
      <AboutMe />
    </main>
  );
}

export default Main;
