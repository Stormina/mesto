class Api {
  constructor(options) {
   this._baseUrl = options.baseUrl;
   this._headers = options.headers;
  }

  _promiseReject(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
    headers: this._headers
    })
    .then(res => {
      this._promiseReject(res)
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headers
  })
    .then(res => {
      this._promiseReject(res)
    });
  }

  patchUserProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => {
      this._promiseReject(res)
    });
  }

  postNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => {
        this._promiseReject(res)
      });
  }

  deleteUserCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        this._promiseReject(res)
    });
  }

  putLikesCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        this._promiseReject(res)
    });
  }

  deleteLikesCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        this._promiseReject(res)
    });
  }

  patchUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(res => {
        this._promiseReject(res)
    });
  }
}