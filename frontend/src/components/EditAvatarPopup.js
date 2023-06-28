import React from "react";
import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup({ onSetAvatar, isOpened, onClose, loading }) {
  const avaRef = React.useRef(null);

  React.useEffect(() => {
    avaRef.current.value = "";
  }, [isOpened]);

  function handleSetAvatar() {
    return avaRef.current.value;
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSetAvatar({
      avatar: avaRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={loading ? "Сохранение..." : "Сохранить"}
      isOpened={isOpened}
      onPopupClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarLink"
        name="name"
        type="url"
        placeholder="Вставьте ссылку"
        className="popup__input"
        onChange={handleSetAvatar}
        ref={avaRef}
        required
      />
      <span className="avatarLink-error popup__error" />
    </PopupWithForm>
  );
}
