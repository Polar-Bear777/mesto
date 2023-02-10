// ИМПОРТЫ
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopopWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import "./index.css";

// ----------------------------------------------------------------
// ВЫБОРКА DOM-ЭЛЕМЕНТОВ

// 1 Форма
const profilePopup = document.querySelector(".profile-popup"); // profile-popup
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); // Для popup

const nameInput = profilePopup.querySelector(".popup__input_type_name"); // Находим поля формы в DOM
const jobInput = profilePopup.querySelector(".popup__input_type_info"); // Находим поля формы в DOM
const PopupFormElement = profilePopup.querySelector(".popup__form"); // Находим форму в DOM

// 2 Форма
const popupCardElement = document.querySelector(".popup-card"); // Для popup-card
const popupAddButtonElement = document.querySelector(".profile__add-button"); // Для popup-card

const formCardElement = popupCardElement.querySelector(".popup-card__form"); // Находим форму в DOM

// 3 Форма
const popupPhotoElement = document.querySelector(".popup-photo"); // Для popup-photo
const popupPhotoTitleElement = popupPhotoElement.querySelector(
  ".popup-photo__title"
); // Для popup-photo
const popupViewElement = popupPhotoElement.querySelector(".popup-photo__image"); // Для popup-photo

// ----------------------------------------------------------------
// ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ
// Регистрируем обработчики событий по клику для .profile__edit-button
popupOpenButtonElement.addEventListener("click", () => {
  modalEdit.openPopup();
  const information = user.getUserInfo();
  nameInput.value = information.name;
  jobInput.value = information.info;
});

// Регистрируем обработчики событий по клику для .profile__add-button
popupAddButtonElement.addEventListener("click", () => {
  modalAdd.openPopup();
  formValidatorForAdd.resetValidation();
});

// createCard
function createCard({ name, link }) {
  const card = new Card(
    { name, link },
    "#place-template",
    // openPhotoPopup,
    (title, link) => {
      modalView.openPopup();
      popupPhotoTitleElement.textContent = title;
      popupViewElement.src = link;
      popupViewElement.openPopup = title;
    }
  );

  const cardElement = card.generateCard();
  return cardElement;
}

// ----------------------------------------------------------------
// ВЫЗОВ ВАЛИДАЦИИ
// Для кнопки редактировать
const formValidatorForEdit = new FormValidator(validationConfig, PopupFormElement);
formValidatorForEdit.enableValidation();

// Для кнопки добавить
const formValidatorForAdd = new FormValidator(validationConfig, formCardElement);
formValidatorForAdd.enableValidation();

// ----------------------------------------------------------------
// ВОВЗРАЩАЕМ КАРТОЧКУ СО ВСЕМИ ДАННЫМИ
const cardList = new Section(
  {
    initialCards: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  ".elements"
);

cardList.renderItems();

// ----------------------------------------------------------------
const modalEdit = new PopupWithForm(".profile-popup", (data) => {
  user.setUserInfo(data);
  modalEdit.closePopup();
});
// Добавили слушатель клика иконке закрытия попапа
modalEdit.setEventListeners();

const modalAdd = new PopupWithForm(".popup-card", (data) => {
  cardList.addItem(createCard(data));
  modalAdd.closePopup();
});
// Добавили слушатель клика иконке закрытия попапа
modalAdd.setEventListeners();

const modalView = new PopupWithImage(
  ".popup-photo",
  popupPhotoTitleElement,
  popupViewElement
);
// Добавили слушатель клика иконке закрытия попапа
modalView.setEventListeners();

const user = new UserInfo({
  name: ".profile__title",
  info: ".profile__subtitle",
});
