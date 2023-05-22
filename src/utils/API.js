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

    signUp({ email, password, name }) {
      return fetch(`${ this._URL }/api/register`, {
        credentials: this.credentials,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      }).then(this._handleRes);
    }

    signIn({ email, password }) {
      return fetch(`${ this._URL }/api/login`, {
        credentials: this.credentials,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then(this._handleRes);
    }

    getUserData() {
      return fetch(`${ this._URL }/api/media`, {
        credentials: this.credentials,
        method: 'GET',
        headers: this._headers,
      }).then(this._handleRes);
    }
  
    getToken(token) {
      return fetch(`${ this._URL }/api/media`, {
        credentials: this.credentials,
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