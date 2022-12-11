import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import * as auth from '../utils/Auth';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([ ]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({password: '', email: ''});
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getUserData(token).then((res) => {
        if (res) {
          let userData = {
            password: res.password,
            email: res.email,
          };
          handleLogin(userData)
          history.push('/');
        }
      });
    }
  }, [])

  function handleLogin(userData) {
    setLoggedIn(true);
    setUserData(userData)
   }

  useEffect(() => {
    api.getUserInfo()
      .then((result) => {
        setCurrentUser(result)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data.name, data.about)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data.avatar)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    });
  }

    useEffect(() => {
      api.getInitialCards()
        .then((result) => {
          setCards(result)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    function handleCardLike(card) {
      if(card.likes.some(i => i._id === currentUser._id)) {
        api.removeLike(card._id)
          .then((newCard) => {
             setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        api.addLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  function handleCardDelete(card) {
    if(card.owner._id === currentUser._id) {
      api.removeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          cards.filter(item => item._id !== newCard)
        })
       .catch((error) => {
         console.log(error);
       });
    }
};

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data.title, data.url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
          <ProtectedRoute 
             exact path="/"
             loggedIn={loggedIn}
             component={() => (<div> <Header email={userData.email}/>
             <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} 
              onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} /></div>)}>
              </ProtectedRoute>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? (<Redirect to="/"/> ) : (<Redirect to="/sign-in"/>)}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;