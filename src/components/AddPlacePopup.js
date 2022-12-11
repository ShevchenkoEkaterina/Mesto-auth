import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  };

  function handleLinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title,
      url: link,
    });
  } 

  return (
    <PopupWithForm isOpen={props.isOpen} name="add" title="Новое место" onClose={props.onClose} onSubmit={handleSubmit} children={
      <div>
        <label className="input__field">
          <input type="text" value={title || ""} onChange={handleTitleChange} required minLength="2" maxLength="30" placeholder="Название" name="title" id="title-input" className="input__text input__text_name_add"/>
          <span className="input__text-error" id ="title-input-error"></span>
        </label>
        <label className="input__field">
          <input type="url" value={link || ""} onChange={handleLinkChange} required placeholder="Ссылка на картинку" id="url-input" name="url" className="input__text input__text_description_add"/>
          <span className="input__text-error" id ="url-input-error"></span>
        </label>
        <button type="submit" className="input__save-button">Сохранить</button>
      </div>
    }/>
  );
}

export default AddPlacePopup;