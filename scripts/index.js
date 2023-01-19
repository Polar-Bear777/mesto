// ИМПОРТЫ
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, config } from './constants.js';



// ----------------------------------------------------------------
// ВЫБОРКА DOM-ЭЛЕМЕНТОВ
const elementContainer = document.querySelector(".elements"); // Находим контейнер для карточек куда они будут генерироваться
const closeButtons = document.querySelectorAll(".popup__close"); // Находим все крестики проекта по универсальному селектору

// 1 Форма
const popups = document.querySelectorAll(".popup"); // Общий popup
const profilePopup = document.querySelector(".profile-popup"); // profile-popup
const popupCloseButtonElement = document.querySelector(".popup__close"); // Для popup
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); // Для popup

const nameInput = profilePopup.querySelector(".popup__input_type_name"); // Находим поля формы в DOM
const jobInput = profilePopup.querySelector(".popup__input_type_info"); // Находим поля формы в DOM
const formElement = profilePopup.querySelector(".popup__form"); // Находим форму в DOM
const nameProfile = document.querySelector(".profile__title"); // Находим поля в DOM для profile
const jobProfile = document.querySelector(".profile__subtitle"); // Находим поля в DOM для profile

// 2 Форма
const popupCardElement = document.querySelector(".popup-card"); // Для popup-card
const popupcardCloseButtonElement = popupCardElement.querySelector(".popup-card__close"); // Для popup-card
const popupAddButtonElement = document.querySelector(".profile__add-button"); // Для popup-card

const namecardInput = popupCardElement.querySelector(".popup-card__input_type_title"); // Находим поля формы в DOM
const infocardInput = popupCardElement.querySelector(".popup-card__input_type_link"); // Находим поля формы в DOM
const formcardElement = popupCardElement.querySelector(".popup-card__form"); // Находим форму в DOM

// 3 Форма
const popupPhotoElement = document.querySelector(".popup-photo"); // Для popup-photo
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector(".popup-photo__close"); // Для popup-photo
const popupPhotoTitleElement = popupPhotoElement.querySelector(".popup-photo__title"); // Для popup-photo
const popupViewElement = popupPhotoElement.querySelector(".popup-photo__image"); // Для popup-photo



// ----------------------------------------------------------------
// ОБЪЯВЛЯЕМ ВСЕ ФУНКЦИИ
// Закрытие всех попапов на оверлей
function closePopupByOverlay(e) {
  if (e.target.classList.contains('popup_is-opened'))
  closePopup(e.target);
}

// Закрытие всех попапов через ESC
function closePopupByEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'));
  }}

// Универсальная функция открытия
const openPopup = function (popups) {
  popups.classList.add("popup_is-opened");
  popups.addEventListener('click', closePopupByOverlay)
  document.addEventListener('keydown', closePopupByEsc)
};

// Универсальная функция закрытия
function closePopup(popups) {
  popups.classList.remove("popup_is-opened");
  popups.removeEventListener('click', closePopupByOverlay) // Снимаем закртыие по ESC
  document.removeEventListener('keydown', closePopupByEsc)
}

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// Функция открытия PopUp Photo
function openPhotoPopup(title, link, alt) {
  openPopup(popupPhotoElement);
  popupPhotoTitleElement.textContent = title;
  popupViewElement.src = link;
  popupViewElement.alt = alt;
}



// ----------------------------------------------------------------
// ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ
// Регистрируем обработчики событий по клику для .profile__edit-button
popupOpenButtonElement.addEventListener("click", () =>{
  openPopup(profilePopup)
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

// Регистрируем обработчики событий по клику для .profile__add-button
popupAddButtonElement.addEventListener("click", () =>
  openPopup(popupCardElement)
);



// ----------------------------------------------------------------
// ДОБАВЛЯЕМ ФОРМУ ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ЗНАЧЕНИЙ
// Для .profile__edit-button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Для .profile__add-button
function handleCardFormSubmit(evt) { 
  evt.preventDefault();
  renderCard({ name: namecardInput.value, 
               link: infocardInput.value });
  namecardInput.value = "";
  infocardInput.value = "";
  closePopup(popupCardElement);
}



// ----------------------------------------------------------------
// ПРИКРЕПЛЯЕМ ОБРАБОТЧИК К ФОРМЕ
formElement.addEventListener("submit", handleProfileFormSubmit); // Для .profile__edit-button
formcardElement.addEventListener("submit", handleCardFormSubmit); // Для .profile__add-button



// ----------------------------------------------------------------
// ШАБЛОНЫ
const cardTemplate = document
  .querySelector("#place-template")
  .content.querySelector(".elements__item");

// ГЕНЕРАЦИЯ КАРТОЧКИ
const generateCard = (dataCard) => {
  // Генерируем
  const newCard = cardTemplate.cloneNode(true); // Клонируем
  const name = newCard.querySelector(".elements__title"); // Получаем title
  const image = newCard.querySelector(".elements__image"); // Получаем image
  const cardLike = newCard.querySelector(".elements__like"); // Получаем like
  const deleteButton = newCard.querySelector(".elements__delete"); // Получаем delete

  name.textContent = dataCard.name; // Получаем название для карточки
  image.src = dataCard.link; // Получаем ссылку для фото
  image.alt = dataCard.name; // Получаем подпись для фото

  cardLike.addEventListener("click", (e) => {
    e.target.classList.toggle("elements__like_active"); // Лайк карточки
  });
  deleteButton.addEventListener("click", (e) => {
    e.target.closest(".elements__item").remove();
  });
  image.addEventListener("click", () => {
    openPhotoPopup(name.textContent, image.src, image.alt); // Увеличение картинки и передали значения ссылки, подписи, названия
  });

  return newCard;
};

// ДОБАВЛЕНИЕ КАРТОЧКИ ИЗ МАССИВА (ОТРИСОВКА)
const renderCard = (dataCard) => {
  elementContainer.prepend(generateCard(dataCard));
};

// РЕНДЕР ВСЕХ КАРТОЧЕК
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});



// ----------------------------------------------------------------
// ВОВЗРАЩАЕМ КАРТОЧКУ СО ВСЕМИ ДАННЫМИ
// Обойдем массив для каждого элемента карточки
initialCards.forEach((dataCard) => {
	const card = new Card(dataCard, '#place-template', openPopup, popupPhotoElement, popupViewElement, popupPhotoTitleElement);
  const cardElement = card.generateCard();

  // Возвращаем карточку в DOM
  return cardElement;
});



// ----------------------------------------------------------------
// ВЫЗОВ ВАЛИДАЦИИ
// Для кнопки редактировать
const formValidatorForEdit = new FormValidator(config, formElement);
formValidatorForEdit.enableValidation();

// Для кнопки добавить
const formValidatorForAdd = new FormValidator(config, formcardElement);
formValidatorForAdd.enableValidation();