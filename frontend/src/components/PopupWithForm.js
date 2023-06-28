import React from "react";

function PopupWithForm({
  children,
  type,
  title,
  buttonText,
  isOpened,
  onPopupClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_type_${type} ${isOpened ? "popup_opened" : ""}`}
      id="add-popup"
    >
      <div className="popup__content">
        <h3 className="popup__title">{title}</h3>
        <button type="button" className="popup__close" onClick={onPopupClose} />
        <form className="popup__form" name={type} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
