import React, { useState }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import headerLogo from '../images/Logo.svg';
import * as auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function Register() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
        ...data,
       [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
      let { password, email } = data;
      auth.register(password, email)
        .then((res) => {
          if (res.statusCode !== 400) {
            setData({
              ...data,
            });
            setIsInfoPopupOpen(true);
            handleTooltipOpen();
            history.push('/sign-in')
          } else {
            setData({
              ...data,
            });
            setIsInfoPopupOpen(false);
            handleTooltipOpen();
          }
        });
  };

  function handleTooltipOpen() {
    setIsTooltipOpen(true);
  }

  function closePopup() {
    setIsTooltipOpen(false);
  }

    return (
      <div className="register">
        <header className="header__entry">
          <img className="header__logo" src={headerLogo} alt="Логотип"/>
          <Link to="/sign-in" className="header__information">Войти</Link>
        </header>
        <div className="register__container">
          <p className="register__welcome">Регистрация</p>
          <form onSubmit={handleSubmit} className="register__form">
            <label htmlFor="email" className="register__input">
              <input required id="email" name="email" className="register__input-text" type="email" autoComplete="email" placeholder="E-mail" value={data.email} onChange={handleChange} />
            </label>
            <label htmlFor="password" className="register__input">
              <input required id="password" name="password" className="register__input-text" type="password" autoComplete="new-password" placeholder="Пароль" value={data.password} onChange={handleChange} />
            </label>
              <button type="submit" onSubmit={handleSubmit} className="register__link register__button" onClick={handleTooltipOpen}>Зарегистрироваться</button>
          </form>
          <div className="register__signin">
            <Link to="/sign-in" className="register__login-link">Уже зарегистрированы? Войти</Link>
          </div>
        </div>
        <InfoTooltip isOpen={isTooltipOpen} isSuccessOpen={isInfoPopupOpen} onClose={closePopup}/>
      </div>
  );
  }

export default Register;