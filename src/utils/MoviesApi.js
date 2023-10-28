import { moviesApiUrl } from './Constants';

export default class MoviesApi {
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

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }
}

export const moviesApi = new MoviesApi({
  url: moviesApiUrl,
});
