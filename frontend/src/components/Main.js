import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__box">
          <img
            src={currentUser.avatar}
            alt="аватар"
            className="profile__image"
          />
          <button
            type="button"
            className="profile__overlay"
            onClick={() => {
              props.onEditAvatar(true);
            }}
          />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit"
              onClick={() => {
                props.onEditProfile(true);
              }}
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add"
          onClick={() => {
            props.onAddCard(true);
          }}
        />
      </section>
      <section className="photos">
        <ul className="elements">
          {props.cards.map((cardElement) => (
            <Card
              card={cardElement}
              key={cardElement.cardId}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
