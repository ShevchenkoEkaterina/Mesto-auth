import React, { useContext } from 'react';
import CurrentUserContext  from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__delete_active' : ' '}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__like_active' : ' '}`
  );

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <div className="element__upp">
        <img className="element__image" alt={card.name} src={card.link} onClick={handleClick}/>
        <button type="button" className={`element__delete ${cardDeleteButtonClassName}`} onClick={handleDeleteClick}></button>
      </div>
      <div className="element__bottom">
          <h2 className="element__description">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className={`element__like ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
          <p className="element__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;