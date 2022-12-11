class Api {
    constructor(baseUrl, token) {
      this._baseUrl = baseUrl;
      this._token = token;
    }

    _checkwork(res){
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(this._checkwork)
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(this._checkwork)
    }

    editUserInfo(title, job) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          name: title,
          about: job
        })
      })
      .then(this._checkwork)
    }

    addNewCard(title, url) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          name: title,
          link: url
        })
      })
      .then(this._checkwork)
    }

    editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(this._checkwork)
    }

    removeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(this._checkwork)
    }

    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(this._checkwork)
    }

    addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(this._checkwork)
    }
};

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-49', 'e6d7cecd-3ca4-4cc6-be79-debc6308da26');

export default api;