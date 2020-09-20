import { data } from "autoprefixer";

export class Api {
    constructor(options) {
        this._url = options.url
        this._headers = options.headers
    }

    updateAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: "PATCH",
                headers: {
                    authorization: this._headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "avatar": data }),
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    updateProfileInfo(data) {
        return fetch(`${this._url}/users/me`, {
                method: "PATCH",
                headers: {
                    authorization: this._headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${data.name}`,
                    about: `${data.about}`
                }),
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                method: "GET",
                headers: {
                    authorization: this._headers,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                method: "GET",
                headers: {
                    authorization: this._headers
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
    }

    postNewCard(card) {
        return fetch(`${this._url}/cards`, {
                method: "POST",
                headers: {
                    authorization: this._headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: card.name,
                    link: card.link
                }),
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: this._headers,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: "PUT",
                headers: {
                    authorization: this._headers,
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
    deliteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: this._headers,
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }

    _getResponseData(data) {
        if (data.ok) {
            return data.json()
        }
    }
}