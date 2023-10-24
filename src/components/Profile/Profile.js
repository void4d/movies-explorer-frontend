import { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  const name = 'Павел';
  const mail = 'pochta@mail.ru';

  const saveProfileButton = (
    <>
      <span className="profile__error-message profile__error-message_hidden">
        При обновлении профиля произошла ошибка
      </span>
      <button className="profile__save-button" type="submit" onClick={handleEditClick}>
        Сохранить
      </button>
    </>
  );

  const EditAndLogOutButton = (
    <>
      <div className="profile__edit-button" onClick={handleEditClick}>
        Редактировать
      </div>
      <div className="profile__logout-button">Выйти из аккаунта</div>
    </>
  );

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__greeting">Привет, {name}!</h2>
          <div className="profile__data">
            <div className="profile__username-container">
              <div className="profile__username">Имя</div>
              <div className="profile__username">{name}</div>
            </div>
            <div className="profile__email-container">
              <div className="profile__email">E-mail</div>
              <div className="profile__email">{mail}</div>
            </div>
          </div>
          {isEditing ? saveProfileButton : EditAndLogOutButton}
        </div>
      </section>
    </main>
  );
}

export default Profile;
