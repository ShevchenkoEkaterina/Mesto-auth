import React from 'react';
import PopupWithForm from './PopupWithForm';
import cross from '../images/Cross.svg';
import check from '../images/Check.svg';

function InfoTooltip(props) {
    return(
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} children={
          <div>
            <img className="input__sign" src={props.isSuccessOpen ? check : cross} alt="Информация о регистрации"/>
            <p className="input__phrase">{props.isSuccessOpen ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
          </div>
          }
         />
    );
}

export default InfoTooltip;