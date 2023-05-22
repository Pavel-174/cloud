import './App.css';
import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import API from '../../utils/API';
import Token from '../../utils/Token';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate ();

  function onLogin(data) {
    API.signIn(data)
      .then(({ token }) => {
        if (token) {
          Token.addToken(token);
          API.Token();
          setLoggedIn(true);
          getUserData();
          navigate('/cloud');
        }
      })
      .catch((error) => {
        console.log(`Что-то пошло не так! Ошибка авторизации. ${ error }`);
      });
  }
  
  function getUserData() {
    API.getUserData()
      .then((data) => {
        // setCurrentUser(data);
        setLoggedIn(true);
        console.log(data)
      })
      .catch((error) => {
        console.log(`Что-то пошло не так! Ошибка сервера ${ error }`);
      })
  }

  function onRegister(data) {
    API.signUp(data)
      .then((res) => {
        if (res._id) {
          console.log('Вы успешно зарегистрировались!');
          onLogin(data);
        }
      })
      .catch((error) => {
        console.log(`Что-то пошло не так! Ошибка регистрации. ${ error }`);
      });
  }
  return (
    <div>
    {/* <CurrentUserContext.Provider value={currentUser}> */}
      <Routes>
        <Route path='/' element = { !loggedIn ? <Register onRegister={ onRegister } /> : <Navigate to="/cloud" /> }/>
        <Route path='/signin' element = { !loggedIn ? <Login onLogin = { onLogin } /> : <Navigate to="/cloud" /> }/>
      </Routes>
    {/* </CurrentUserContext.Provider> */}
    </div>
  );
}

export default App;
