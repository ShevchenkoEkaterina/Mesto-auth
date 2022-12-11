import React from 'react';
import headerLogo from '../images/Logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <div className="header__top">
        <img className="header__logo" src={headerLogo} alt="Логотип"/>
      </div>
      <div className="header__user">
        <div className="header__user_information">{props.email}</div>
        <Link to="/sign-in" className="header__user_link">Выйти</Link>
      </div>
    </header>
  );
}

export default Header;