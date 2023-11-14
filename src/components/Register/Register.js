import Logo from '../../images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/Validation';

function Register({ handleRegister, registerError }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { username, email, password } = values;

    if (username && email && password) {
      handleRegister(username, email, password).then((res) => {
        if (res) {
          resetForm();
        }
      });
    }
  }

  return (
    <main>
      <form className="register" onSubmit={handleSubmit} autoComplete="off">
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
              name="username"
              pattern="^[\p{L}\p{M}\-]+( ?[\p{L}\p{M}\-]+)*$"
              value={values.username || ''}
              onChange={handleChange}
            ></input>
            <span className="register__error-message">{errors.username}</span>
          </div>
          <div className="register__input-container">
            <p className="register__input-name">E-mail</p>
            <input
              className="register__input"
              type="email"
              minLength="2"
              placeholder="Введите E-mail"
              name="email"
              pattern="^.+@.+\..+$"
              value={values.email || ''}
              onChange={handleChange}
            ></input>
            <span className="register__error-message">{errors.email}</span>
          </div>
          <div className="register__input-container">
            <p className="register__input-name">Пароль</p>
            <input
              className="register__input"
              type="password"
              minLength="6"
              placeholder="Введите пароль"
              name="password"
              value={values.password || ''}
              onChange={handleChange}
            ></input>
            <span className="register__error-message">{errors.password}</span>
          </div>
        </div>
        <div className="register__bottom">
          <span className="register__general-error-message">{registerError}</span>
          <button
            className={`register__button ${isValid ? '' : 'register__button_disabled'}`}
            type="submit"
            disabled={!isValid}
          >
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
