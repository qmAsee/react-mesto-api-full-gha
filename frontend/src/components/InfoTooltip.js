import React from "react";

export function InfoTooltip({ name, isOpened, isSuccessful, onPopupClose }) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpened ? "popup_opened" : ""}`}
    >
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={onPopupClose} />
        <div
          className={`popup__successful
              ${
                isSuccessful
                  ? "popup__successful_type_true"
                  : "popup__successful_type_false"
              }`}
        ></div>
        <h3 className="popup__title">
          {isSuccessful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h3>
      </div>
    </div>
  );
}
