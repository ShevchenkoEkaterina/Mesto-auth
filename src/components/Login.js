import React, { useState}  from 'react';
import { Link, useHistory } from 'react-router-dom';
import headerLogo from '../images/Logo.svg';
import * as auth from '../utils/Auth';

function Login({ handleLogin }) {
  const [data, setData] = useState({
    password: '',
    email: '',
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.password || !data.email) {
      return;
    }
    auth.signin(data.password, data.email)
      .then((res) => {
        if (res.token) {
          setData({ password: '' , email: '' })
          localStorage.setItem('token', res.token)
          const userData = {
            password: res.password,
            email: res.email,
          }
          handleLogin(userData);
          history.push('/');
        }
      })
  }

    return(
      <div className="login">
        <header className="header__entry">
          <img className="header__logo" src={headerLogo} alt="Логотип"/>
          <Link to="/sign-up" className="header__information">Регистрация</Link>
        </header>
        <div className="login__container">
        <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label htmlFor="email" className="login__input">
            <input required id="email" name="email" className="login__input-text" type="email" placeholder="E-mail" value={data.email} onChange={handleChange} />
          </label>
          <label htmlFor="password" className="login__input">
            <input required id="password" name="password" className="login__input-text" type="password" placeholder="Пароль" value={data.password} onChange={handleChange} />
          </label>
            <button type="submit" onSubmit={handleSubmit} className="login__link login__button">Войти</button>
        </form>
        </div>
      </div>
    )
  }

export default Login;