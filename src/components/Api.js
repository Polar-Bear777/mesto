// Запросы к серверу
  export class Api {
    constructor(options) {
      this._options = options;
      this._baseUrl = this._options.baseUrl;
      this._headers = this._options.headers;
    }

    // Статус ответа
    _responseStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка 1: ${res} ${res.status}`)
    }

    // Загрузка информации о пользователе с сервера
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => this._responseStatus(res));
    }

    // Загрузка карточек с сервера
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => this._responseStatus(res));
    }

    // Редактирование профиля
    editUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: 'fe76754b-7973-440a-9fc3-fdd57a5c4607',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.info
        })
      })
      .then(res => this._responseStatus(res));
    }

    // Добавление новой карточки через попап
    addCard(inputValues) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: 'fe76754b-7973-440a-9fc3-fdd57a5c4607',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputValues.name,
          link: inputValues.link
        })
      })
      .then(res => this._responseStatus(res));
    }

    // Обновление аватара пользователя
    editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(res => this._responseStatus(res));
    }

    // Удаление карточки
    handleDeleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: 'fe76754b-7973-440a-9fc3-fdd57a5c4607',
          'Content-Type': 'application/json'
        },
      })
      .then(res => this._responseStatus(res));
    }

    // Постановка лайка
    setLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: 'fe76754b-7973-440a-9fc3-fdd57a5c4607',
          'Content-Type': 'application/json'
        },
      })
      .then(res => this._responseStatus(res));
    }

    // Снятие лайка
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: 'fe76754b-7973-440a-9fc3-fdd57a5c4607',
          'Content-Type': 'application/json'
        },
      })
      .then(res => this._responseStatus(res));
    }
  }
