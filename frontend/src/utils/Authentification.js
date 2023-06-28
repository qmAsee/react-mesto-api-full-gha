import { authSettings } from "./authSettings";

class Authentification {
  constructor(settings) {
    this._baseUrl = settings.url;
    this._headers = settings.headers;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  signUp(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  }
}

export const auth = new Authentification(authSettings);
