import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export function EditProfilePopup({ isOpened, onClose, onSetUser, loading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [job, setJob] = React.useState("");

  function handleSetName(evt) {
    setName(evt.target.value);
  }

  function handleSetJob(evt) {
    setJob(evt.target.value);
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();

    onSetUser({
      name: name,
      profession: job,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setJob(currentUser.about);
  }, [currentUser, isOpened]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText={loading ? "Сохранение..." : "Сохранить"}
      onPopupClose={onClose}
      isOpened={isOpened}
      onSubmit={handleSubmitForm}
    >
      <input
        id="username"
        type="text"
        className="popup__input"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleSetName}
        required
      />
      <span className="username-error popup__error" />
      <input
        id="profession"
        type="text"
        className="popup__input"
        name="profession"
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        value={job || ""}
        onChange={handleSetJob}
        required
      />
      <span className="profession-error popup__error" />
    </PopupWithForm>
  );
}
