import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React from 'react';

function Register({ handleRegister }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(name, email, password);
  }

  return (
    <main>
      <form className="register" onSubmit={handleSubmit}>
        <div className="register__top">
          <Link to="/" className="link">
            <img className="register__logo" src={Logo} alt="Логотип"></img>
          </Link>
          <h1 className="register__welcome">Добро пожаловать!</h1>
        </div>
        <div className="register__inputs">
          <div className="register__input-container">
            <p className="register__input-name">Имя</p>
            <input
              className="register__input"
              minLength="2"
              placeholder="Введите имя"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <span className="register__error-message"></span>
          </div>
          <div className="register__input-container">
            <p className="register__input-name">E-mail</p>
            <input
              className="register__input"
              type="email"
              minLength="2"
              placeholder="Введите E-mail"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <span className="register__error-message"></span>
          </div>
          <div className="register__input-container">
            <p className="register__input-name">Пароль</p>
            <input
              className="register__input"
              type="password"
              minLength="6"
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
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
    </main>
  );
}

export default Register;
