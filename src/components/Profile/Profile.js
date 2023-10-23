function Profile() {
  const name = 'Павел';
  const mail = 'pochta@mail.ru';

  const isEditing = false;

  const saveProfileButton = (
    <>
      <span className="profile__error-message">При обновлении профиля произошла ошибка</span>
      <button className="profile__save-button" type="submit">
        Сохранить
      </button>
    </>
  );

  const EditAndLogOutButton = (
    <>
      <div className="profile__edit-button">Редактировать</div>
      <div className="profile__logout-button">Выйти из аккаунта</div>
    </>
  );

  return (
    <div className="profile">
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
    </div>
  );
}

export default Profile;
