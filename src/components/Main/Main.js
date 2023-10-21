import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject.js';
import Tech from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import SideMenu from '../SideMenu/SideMenu';

function Main() {
  return (
    <main className="main">
      {/* <SideMenu /> */}
      <Promo />
      <AboutProject />
      <Tech />
      <AboutMe />
    </main>
  );
}

export default Main;
