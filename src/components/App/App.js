import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Account from '../Account/Account';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import API from '../../utils/API';
import Token from '../../utils/Token';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate ();

  useEffect(() => {
    getUserData();
  }, []);


  function onLogin(data) {
    API.signIn(data)
      .then(({ token }) => {
        if (token) {
          Token.addToken(token);
          API.Token();
          setLoggedIn(true);
          getUserData();
          navigate('/account');
        }
      })
      .catch((error) => {
        console.log(`Что-то пошло не так! Ошибка авторизации. ${ error }`);
      });
  }

  function onRegister(data) {
    API.signUp(data)
      .then(() => {
        console.log('Вы успешно зарегистрировались!');
        onLogin(data);
      })
      .catch((error) => {
        console.log(`Что-то пошло не так! Ошибка регистрации. ${ error }`);
      });
  }
  
  function getUserData() {
    API.getUserData()
      .then((data) => {
        // setCurrentUser(data);
        setLoggedIn(true);
        console.log(data); //удалить
      })
      .catch((error) => {
        console.log(`Что-то пошло не так! Ошибка сервера ${ error }`);
      })
  }

  function onSignOut() {
    API.signOut();
    Token.deleteToken();
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <div>
    {/* <CurrentUserContext.Provider value={currentUser}> */}
      <Routes>
        <Route path='/' element = { !loggedIn ? <Register onRegister={ onRegister } /> : <Navigate to="/account" /> }/>
        <Route path='/signin' element = { !loggedIn ? <Login onLogin = { onLogin } /> : <Navigate to="/account" /> }/>
        <Route path='/account' element={
              <ProtectedRoute 
                component={ Account }
                loggedIn={ loggedIn }
                onSignOut={ onSignOut }
              />
          } />
      </Routes>
    {/* </CurrentUserContext.Provider> */}
    </div>
  );
}

export default App;
