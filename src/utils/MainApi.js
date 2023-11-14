import { MAIN_API_URL } from './Constants';

export default class MainApi {
  constructor(config) {
    this._url = config.url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  createMovie(res, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: res.country,
        director: res.director,
        duration: res.duration,
        year: res.year,
        description: res.description,
        image: `https://api.nomoreparties.co/${res.image.url}`,
        trailerLink: res.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${res.image.formats.thumbnail.url}`,
        movieId: res.id,
        nameRU: res.nameRU,
        nameEN: res.nameEN,
      }),
    }).then(this._handleResponse);
  }

  deleteMovie(movieId, token) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  getProfile(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  updateProfile(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._handleResponse);
  }
}

export const mainApi = new MainApi({
  url: MAIN_API_URL,
});
