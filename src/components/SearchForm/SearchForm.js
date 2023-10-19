import { useState } from 'react';

function SearchForm() {
  const [isTumblerOn, setIsTumblerOn] = useState(true);

  function toggleTumbler() {
    setIsTumblerOn(!isTumblerOn);
  }

  return (
    <div className="search-form">
      <div className="search-form__container">
        <div className="search-form__field">
          <input className="search-form__input" placeholder="Фильм"></input>
          <button className="search-form__search-button" type="submit">
            Поиск
          </button>
        </div>

        <div className="search-form__short-container">
          <div
            className={`search-form__short-tumbler ${isTumblerOn ? '' : 'search-form__short-tumbler_off'}`}
            onClick={toggleTumbler}
          ></div>
          <p className="search-form__short-text">Короткометражки</p>
        </div>
        <div className="search-form__divider"></div>
      </div>
    </div>
  );
}

export default SearchForm;
