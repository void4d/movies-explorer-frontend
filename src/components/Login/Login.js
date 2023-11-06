import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React from 'react';

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(email, password);
  }

  return (
    <main>
      <form className="login" onSubmit={handleSubmit}>
        <div className="login__top">
          <Link to="/" className="link">
            <img className="login__logo" src={Logo} alt="Логотип"></img>
          </Link>
          <h1 className="login__welcome">Рады видеть!</h1>
        </div>
        <div className="login__inputs">
          <div className="login__input-container">
            <p className="login__input-name">E-mail</p>
            <input
              className="login__input"
              type="email"
              minLength="2"
              placeholder="Введите E-mail"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <span className="login__error-message"></span>
          </div>
          <div className="login__input-container">
            <p className="login__input-name">Пароль</p>
            <input
              className="login__input"
              type="password"
              minLength="6"
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span className="login__error-message"></span>
          </div>
        </div>
        <div className="login__bottom">
          <button className="login__button" type="submit">
            Войти
          </button>
          <p className="login__not-registered">
            Ещё не зарегистрированы?{' '}
            <Link to="/signup" className="link">
              <span className="login__register">Регистрация</span>
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Login;
