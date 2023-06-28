import React from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup({ onAddCard, isOpened, onClose, loading }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  React.useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpened]);

  function handleSetCardName(evt) {
    setCardName(evt.target.value);
  }

  function handleSetCardLink(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddCard({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText={loading ? "Сохранение..." : "Сохранить"}
      onPopupClose={onClose}
      isOpened={isOpened}
      onSubmit={handleSubmit}
    >
      <input
        id="place"
        type="text"
        className="popup__input"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={cardName}
        onChange={handleSetCardName}
        required
      />
      <span className="place-error popup__error" />
      <input
        id="link"
        type="url"
        className="popup__input"
        name="link"
        placeholder="Ссылка на картинку"
        value={cardLink}
        onChange={handleSetCardLink}
        required
      />
      <span className="link-error popup__error" />
    </PopupWithForm>
  );
}
