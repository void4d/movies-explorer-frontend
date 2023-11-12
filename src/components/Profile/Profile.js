import { useRef, useEffect, useContext } from 'react';
import { useForm, useFormWithValidation } from '../../utils/Validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({
  handleLogOut,
  handleUpdateProfile,
  profileNotification,
  isEditing,
  setIsEditing,
  profileError,
  isSuccesfullUpdate,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm();

  const inputRef = useRef(null);

  function enableEditing() {
    setIsEditing(true);
  }

  function endEditing(e) {
    e.preventDefault();
    const { name, email } = values;

    console.log(name);

    if (name !== currentUser.name && email !== currentUser.email) {
      handleUpdateProfile(name, email);
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setValues({ name: localStorage.getItem('name'), email: localStorage.getItem('email') });
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
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            autoComplete="off"
            pattern="^[\p{L}\p{M}\-]+( ?[\p{L}\p{M}\-]+)*$"
          ></input>
        </div>
        <div className="profile__email-container">
          <div className="profile__email">E-mail</div>
          <input
            className="profile__email input"
            placeholder="Введите E-mail"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            autoComplete="off"
            pattern="^.+@.+\..+$"
          ></input>
        </div>
      </div>
      <span className={`profile__error-message ${isSuccesfullUpdate ? 'profile__success-message' : ''}`}>
        {isSuccesfullUpdate ? profileNotification : profileError}
      </span>
      <button className="profile__save-button" type="submit">
        Сохранить
      </button>
    </>
  );

  const profileData = (
    <>
      <div className="profile__data">
        <div className="profile__username-container">
          <div className="profile__username">Имя</div>
          <div className="profile__username">{currentUser.name}</div>
        </div>
        <div className="profile__email-container">
          <div className="profile__email">E-mail</div>
          <div className="profile__email">{currentUser.email}</div>
        </div>
      </div>
      <button className="profile__edit-button" onClick={enableEditing}>
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
        <form className="profile__container" onSubmit={endEditing} noValidate>
          <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
          {isEditing ? editProfileData : profileData}
        </form>
      </section>
    </main>
  );
}

export default Profile;
