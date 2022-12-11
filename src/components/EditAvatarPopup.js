import React, { useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose }) {
    const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm isOpen={isOpen} name="avatar" onSubmit={handleSubmit} title="Обновить аватар" onClose={onClose} children={
      <div>
        <label className="input__field">
          <input type="url" ref={avatarRef} required placeholder="Ссылка на фото аватара" id="url-input-avatar" name="avatar" className="input__text input__text_avatar"/>
          <span className="input__text-error" id ="url-input-avatar-error"></span>
        </label>
        <button type="submit" className="input__save-button">Сохранить</button>
      </div>
    }/>
  );
}

export default EditAvatarPopup;