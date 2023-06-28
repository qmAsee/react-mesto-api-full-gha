import React from "react";

function ImagePopup({ card, onPopupClose }) {
  return (
    <div className={`popup popup_type_pic ${card.link ? "popup_opened" : " "}`}>
      <figure className="popup__pic-box">
        <img src={card.link} alt={card.name} className="popup__image" />
        <figcaption className="popup__caption">{card.name}</figcaption>
        <button type="button" className="popup__close" onClick={onPopupClose} />
      </figure>
    </div>
  );
}

export default ImagePopup;
