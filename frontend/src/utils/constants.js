// КОНСТАНТЫ ПРОФИЛЯ

// Кнопки редактирования профиля и добавления новой карточки

export const buttonOpenPopupAddCard = document.querySelector(".profile__add"); // добавить карточку

// Имя и профессия
export const profileName = document.querySelector(".profile__name"); // имя
export const profileJob = document.querySelector(".profile__description"); // работа
export const profileAvatar = document.querySelector(".profile__image"); // аватар
//--------------------------------------------------------------------------

// Кнопка сохранения

export const popupSaveButton = document.querySelector(".popup__button");

// Кнопка на аватарке

export const avatarOverlay = document.querySelector(".profile__overlay");

// Селекторы форм
export const popupFormEdit = document.querySelector(".popup__form_edit"); // форма редактирования профиля
export const popupFormAdd = document.querySelector(".popup__form_add"); // форма добавления карточк
export const popupFormAvatar = document.querySelector(".popup__form_avatar"); // форма смены аватара

// Инпуты
export const popupInputName = document.querySelector(".popup__input_type_name"); // инпут имя
export const popupInputJob = document.querySelector(
  ".popup__input_type_profession"
); // инпут работа

// ПРОЧЕЕ
export const cardsContainer = document.querySelector(".elements"); // селектор контейнера карточек
