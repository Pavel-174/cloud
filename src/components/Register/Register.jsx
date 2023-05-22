import React from 'react';
import Form from '../Form/Form';

function Register({ onRegister }) {
  return ( 
    <Form 
      name='signup' 
      greeting='Добро пожаловать!' 
      buttonText='Зарегистрироваться' 
      onRegister={ onRegister }
    />
  )
}

export default Register;