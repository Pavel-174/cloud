import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Form({ greeting, name, buttonText, onRegister, onLogin }) {

  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {

    const input = evt.target;
    const name = input.name;
    const value = input.value;

    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };


  const handleRegister = (evt) => {

    evt.preventDefault();

    onRegister(inputValues);
  };

  const handleLogin = (evt) => {

    evt.preventDefault();

    onLogin(inputValues);
  };
  
  return ( 
    <main className='form'>
      <Link to="/" className="form__link">
      </Link>
      <h2 className='form__header'>{ greeting }</h2>
      <form 
        className='form__form' 
        noValidate 
        name={ `form__form_type_${ name }` } 
        onSubmit={ name === 'signup' ? handleRegister : handleLogin  }
      >
        <div className="form__items">
            <label className={ name === 'signup' ?'form__item' : 'form__item_hide' } >
              <p className="form__item-text">Имя</p>
              <input 
                className="form__field" 
                name="name" 
                required={ name === 'signup' ? true : false } 
                onChange={ handleChange } 
              />
              <p className="form__error">Что-то пошло не так...</p>
            </label>
            <label className="form__item">
              <p className="form__item-text">E-mail</p>
              <input
                className="form__field"
                name="email"
                type="email"
                required
                onChange={ handleChange }
              />
              <p className={ `form__error ${ errors.email ? 'form__error-display' : ''}` }> { errors.email } </p>
            </label>
            <label className="form__item">
              <p className="form__item-text">Пароль</p>
              <input
                className='form__field'
                name="password"
                type="password"
                minLength="6"
                required
                onChange={ handleChange }
              />
              <p className={ `form__error ${errors.password ? 'form__error-display' : ''}` }> { errors.password } </p>
            </label>
          </div>
        <button 
          className={ `form__button ${ isValid ? "" : "form__button_disabled" }` } 
          disabled={ !isValid ? true : '' } 
          type='submit'
        >
          { buttonText }
        </button>
      </form>
      {name === 'signup'
        ? <p className='form__text'>Уже зарегистрированы?
          <Link to='/signin' className='form__link'>Войти</Link>
        </p>
        : <p className='form__text'>Ещё не зарегистрированы?
          <Link to='/' className='form__link'>Регистрация</Link>
        </p>
      }
    </main>
  )
}

export default Form;