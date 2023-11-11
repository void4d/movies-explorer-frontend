import Logo from '../../images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/Validation';

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;

    if (email && password) {
      handleLogin(email, password).then((res) => {
        if (res) {
          resetForm();
        }
      });
    }
  }

  return (
    <main>
      <form className="login" onSubmit={handleSubmit} noValidate autoComplete="off">
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
              name="email"
              value={values.email || ''}
              onChange={handleChange}
            ></input>
            <span className="login__error-message">{errors.email}</span>
          </div>
          <div className="login__input-container">
            <p className="login__input-name">Пароль</p>
            <input
              className="login__input"
              type="password"
              minLength="6"
              placeholder="Введите пароль"
              name="password"
              value={values.password || ''}
              onChange={handleChange}
            ></input>
            <span className="login__error-message">{errors.password}</span>
          </div>
        </div>
        <div className="login__bottom">
          <button
            className={`login__button ${isValid ? '' : 'login__button_disabled'}`}
            disabled={!isValid}
            type="submit"
          >
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
