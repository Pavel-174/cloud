import './App.scss';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Account from '../Account/Account';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import API from '../../utils/API';
import Token from '../../utils/Token';
import Popup from '../Popup/Popup';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupHeader, setPopupHeader] = useState('');

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
          navigate('/account')
        }
      })
      .catch((error) => {
        setPopupHeader(`Что-то пошло не так! Ошибка авторизации. ${ error }`);
        setPopupOpen(true);
      });
  }

  function onRegister(data) {
    API.signUp(data)
      .then(() => {
        setPopupHeader('Вы успешно зарегистрировались!');
        setPopupOpen(true);
        onLogin(data);
      })
      .catch((error) => {
        setPopupHeader(`Что-то пошло не так! Ошибка регистрации. ${ error }`);
        setPopupOpen(true);
      });
  }
  
  function getUserData() {
    API.getUserData()
      .then((data) => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function onSignOut() {
    API.signOut();
    Token.deleteToken();
    setLoggedIn(false);
    navigate('/signin');
  }

  function popupClose() {
    setPopupOpen(false);
    setPopupHeader('');
  }

  return (
    <div>
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
      <Popup 
        header={ popupHeader } 
        isOpen={ popupOpen } 
        onClose={ popupClose } 
      />
    </div>
  );
}

export default App;
