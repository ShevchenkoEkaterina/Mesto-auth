import React, { useContext } from 'react';
import CurrentUserContext  from '../contexts/CurrentUserContext';
import Pen from '../images/Pen.svg';
import Card from './Card';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__all-information">
          <div className="profile__photo">
            <img onClick={props.onEditAvatar} className="profile__avatar" alt="Аватар профиля" src={currentUser.avatar} />
            <img className="profile__button-change-avatar" src={Pen} alt="Кнопка при наведении"/>
          </div>
          <div className="profile__info">
            <div className="profile__edit-name">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" onClick={props.onEditProfile} className="profile__edit-button profile__button"></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button profile__button" onClick={props.onAddPlace}></button>
      </section>
      <section>
        <ul className="elements">
        {props.cards.map((card) => <Card key={card._id} card={card} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick}/>)}
        </ul>
      </section>
    </main>
  );

}

export default Main;