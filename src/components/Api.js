export class Api {
  constructor(options) {
    this._headers = options.headers;
    this._serverURL = options.serverURL;
    /** возвращает ответ / ошибку после выполнения промиса */
    this._handlePromiseReturn = ((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  /** Работа с данными пользователя */

  /** Получает инфо о пользователе с сервера */
  getUserInfo() {
    return fetch(`${this._serverURL}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Отправляет инфо о пользователе на сервер */
  sendUserInfo(data) {
    return fetch(`${this._serverURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Обновляет аватар пользователя на сервере  */
  updateAvatar(avatar) {
    return fetch(`${this._serverURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Работа с карточками */

  /** Получает карточки с сервера */
  getCards() {
    return fetch(`${this._serverURL}/cards`, {
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Отправляет данные о новой карточке на сервер */
  sendCard(data) {
    return fetch(`${this._serverURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Удаляет карточку с сервера */
  deleteCard(cardID) {
    return fetch(`${this._serverURL}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  /** Ставит лайк */
  setLike(cardID) {
    return fetch(`${this._serverURL}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Удаляет лайк */
  deleteLike(cardID) {
    return fetch(`${this._serverURL}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

}
