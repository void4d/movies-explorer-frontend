export default class MainApi {
  constructor(config) {
    this.url = config.url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies(res) {
    return fetch(`${this._url}/movies`, {
      headers: {
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  createMovie(res) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        country: res.country,
        director: res.director,
        duration: res.duration,
        year: res.year,
        description: res.description,
        image: res.image,
        trailerLink: res.trailerLink,
        thumbnail: res.thumbnail,
        movieId: res.movieId,
        nameRU: res.nameRU,
        nameEN: res.nameEN,
      }),
    }).then(this._handleResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  updateProfile(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._handleResponse);
  }
}
