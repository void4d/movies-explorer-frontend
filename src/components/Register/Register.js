import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <form className="register">
      <div className="register__top">
        <img className="register__logo" src={Logo} alt="Логотип"></img>
        <h1 className="register__welcome">Добро пожаловать!</h1>
      </div>
      <div className="register__inputs">
        <div className="register__input-container">
          <p className="register__input-name">Имя</p>
          <input className="register__input" minlength="2"></input>
          <span className="register__error-message"></span>
        </div>
        <div className="register__input-container">
          <p className="register__input-name">E-mail</p>
          <input className="register__input" type="email" minlength="2"></input>
          <span className="register__error-message"></span>
        </div>
        <div className="register__input-container">
          <p className="register__input-name">Пароль</p>
          <input className="register__input" type="password" minlength="6"></input>
          <span className="register__error-message"></span>
        </div>
      </div>
      <div className="register__bottom">
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="register__already-registered">
          Уже зарегистрированы?{' '}
          <Link to="/signin" className="link">
            <span className="register__enter">Войти</span>
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
