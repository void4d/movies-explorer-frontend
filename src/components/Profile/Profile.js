import React, { useState, useRef, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ handleLogOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setName(localStorage.getItem('name'));
    setEmail(localStorage.getItem('email'));
  }, []);

  const editProfileData = (
    <>
      <div className="profile__data">
        <div className="profile__username-container">
          <div className="profile__username">Имя</div>
          <input
            ref={inputRef}
            className="profile__username input"
            placeholder="Введите имя"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="profile__email-container">
          <div className="profile__email">E-mail</div>
          <input
            className="profile__email input"
            placeholder="Введите E-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
      </div>
      <span className="profile__error-message profile__error-message_hidden">
        При обновлении профиля произошла ошибка
      </span>
      <button className="profile__save-button" type="submit" onClick={handleEditClick}>
        Сохранить
      </button>
    </>
  );

  const profileData = (
    <>
      <div className="profile__data">
        <div className="profile__username-container">
          <div className="profile__username">Имя</div>
          <div className="profile__username">{name}</div>
        </div>
        <div className="profile__email-container">
          <div className="profile__email">E-mail</div>
          <div className="profile__email">{email}</div>
        </div>
      </div>
      <button className="profile__edit-button" onClick={handleEditClick}>
        Редактировать
      </button>
      <button className="profile__logout-button" onClick={handleLogOut}>
        Выйти из аккаунта
      </button>
    </>
  );

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__greeting">Привет, {name}!</h2>
          {isEditing ? editProfileData : profileData}
        </div>
      </section>
    </main>
  );
}

export default Profile;
