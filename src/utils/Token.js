class Token {
    constructor() {
      this.key = 'token';
    }
  
    deleteToken() {
      localStorage.removeItem(this.key);
    }
  
    addToken(token) {
      localStorage.setItem(this.key, token);
    }
    
    getToken() {
      return localStorage.getItem(this.key);
    }
  }
    
  const token = new Token();
    
  export default token;