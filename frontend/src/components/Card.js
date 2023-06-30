import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((id) => id === currentUser._id);
  const isOwn = card.owner === currentUser._id;
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;
  const cardDeleteButtonClassName = `card__trash ${
    isOwn ? "card__trash_visible" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__wrapper">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__calc">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
