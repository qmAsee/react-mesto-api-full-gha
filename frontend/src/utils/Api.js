import { apiSettings } from "./apiSettings.js";

class Api {
  constructor(settings) {
    this._url = settings.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo(obj) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.profession,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  putLike(cardId, isLiked) {
    const token = localStorage.getItem('jwt');
    
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  putAvatar(avatar) {
    const token = localStorage.getItem('jwt');
    
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatar),
    }).then((res) => this._checkResponse(res));
  }

  addCard(card) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api(apiSettings);
export { api };
