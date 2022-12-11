import React from 'react';

function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_show ${card && 'popup_opened'}`}>
      <div className="popup__container-show">
        <button type="button" className="popup__close popup__show-close" onClick={onClose}></button> 
        <img src={card && card.link} alt={card && card.name} className="popup__image"/>
        <h2 className="popup__show-title">{card && card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;