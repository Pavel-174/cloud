import React from 'react';
import Form from '../Form/Form';

function Login({ onLogin }) {
  return ( 
    <Form 
      name='signin' 
      greeting='Рады видеть!' 
      buttonText='Войти' 
      onLogin={ onLogin }
    />
  )
}

export default Login;