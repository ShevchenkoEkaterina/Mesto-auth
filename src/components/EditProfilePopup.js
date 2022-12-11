import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm name="edit" isOpen={props.isOpen} title="Редактировать профиль" onClose={props.onClose} onSubmit={handleSubmit} children={
      <div>
        <label className="input__field">
          <input type="text" value={name || ""} onChange={handleNameChange} required minLength="2" maxLength="40" placeholder="Имя" name="name" id="name-input" className="input__text input__text_name_edit"/>
          <span className="input__text-error" id ="name-input-error"></span>
        </label>
        <label className="input__field">
          <input type="text" value={description || ""} onChange={handleDescriptionChange} required minLength="2" maxLength="200" placeholder="О себе" name="description" id="description-input" className="input__text input__text_description_edit"/>
          <span className="input__text-error" id ="description-input-error"></span>
        </label>
        <button type="submit" className="input__save-button">Сохранить</button>
      </div>}
    />
  );
}

export default EditProfilePopup;