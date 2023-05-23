class MainAPI {
    constructor(options) {
      this._URL = options.URL;
      this._headers = options.headers;
      this._credentials = options.credentials;
    }
  
    _handleRes(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    signUp({ name, email, password }) {
      return fetch(`${ this._URL }/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      }).then(this._handleRes);
    }

    signIn({ email, password }) {
      return fetch(`${ this._URL }/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then(this._handleRes);
    }

    signOut() {
        return fetch(`${ this._URL }/api/logout`, {
          method: 'POST',
          headers: this._headers,
        }).then(this._handleRes);
      }

    getUserData() {
      return fetch(`${ this._URL }/api/media`, {
        method: 'GET',
        headers: this._headers,
      }).then(this._handleRes);
    }

    removeCard(id)  {
      return fetch(`${this._URL}/api/media/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      });
    }
  
    getToken(token) {
      return fetch(`${ this._URL }/api/media`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(this._handleRes);
    }
  
    Token() {
      this._headers.Authorization = `Bearer ${ localStorage.getItem('token') }`;
    }
  }
  
  const mainAPI = new MainAPI({
    URL: 'https://job.kitactive.ru',
    headers: {
      'Authorization': `Bearer ${ localStorage.getItem('token') }`,
      'Content-Type': 'application/json',
    },
  });
  
  export default mainAPI;