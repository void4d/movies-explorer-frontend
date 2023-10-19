function Profile() {
  const name = 'Павел';
  const mail = 'pochta@mail.ru';

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
        <div className="profile__edit-button">Редактировать</div>
        <div className="profile__logout-button">Выйти из аккаунта</div>
      </div>
    </div>
  );
}

export default Profile;
