// Проверка скрипта
console.log("Привет Мир!");

// Создаем МАССИВ для карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];





// 1 ФОРМА
// ДЕЛАЕМ ВЫБОРКУ DOM-ЭЛЕМЕНТОВ
const popups = document.querySelectorAll(".popup"); // Общий popup
const profilePopup = document.querySelector(".profile-popup"); // profile-popup
const popupCloseButtonElement = document.querySelector(".popup__close"); // Для popup
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); // Для popup

// ОБЪЯВЛЯЕМ ПЕРЕМЕННЫЕ
const nameInput = profilePopup.querySelector(".popup__input_type_name"); // Находим поля формы в DOM
const jobInput = profilePopup.querySelector(".popup__input_type_info"); // Находим поля формы в DOM
const formElement = profilePopup.querySelector(".popup__form"); // Находим форму в DOM
const nameProfile = document.querySelector(".profile__title"); // Находим поля в DOM для profile
const jobProfile = document.querySelector(".profile__subtitle"); // Находим поля в DOM для profile


// Закрытие всех попапов на оверлей
function closePopupByOverlay(e) {
  if (e.target.classList.contains('popup_is-opened'))
  closePopup(e.target);
}

// Закрытие всех попапов через ESC
function closePopupByEsc(e) { // Функция закрытия попапов через ESC
if (e.key === "Escape") {
  closePopup(document.querySelector('.popup_is-opened'))
}
}

// ОБЪЯВЛЯЕМ ФУНКЦИИ
const openPopup = function (popups) {
  // Объявляем функцию для открытия попапа
  popups.classList.add("popup_is-opened");
  document.addEventListener('click', closePopupByOverlay)
  document.addEventListener('keydown', closePopupByEsc)
};

function closePopup(popups) {
  // Универсальная функция закрытия
  popups.classList.remove("popup_is-opened");
  document.addEventListener('keydown', closePopupByEsc)
}

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popups = button.closest(".popup");
  console.log("");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popups));
});

// ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ
popupOpenButtonElement.addEventListener("click", () =>{
  openPopup(profilePopup)
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}); // Регистрируем обработчики событий по клику для .edit__button

// ДОБАВЛЯЕМ ФОРМУ
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(profilePopup);
}

// ПРИКРЕПЛЯЕМ ОБРАБОТЧИК К ФОРМЕ
formElement.addEventListener("submit", handleProfileFormSubmit);





// 2 ФОРМА
// ДЕЛАЕМ ВЫБОРКУ DOM-ЭЛЕМЕНТОВ
const popupCardElement = document.querySelector(".popup-card"); // Для popup-card
const popupcardCloseButtonElement =
  popupCardElement.querySelector(".popup-card__close"); // Для popup-card
const popupAddButtonElement = document.querySelector(".profile__add-button"); // Для popup-card

// ОБЪЯВЛЯЕМ ВСЕ ПЕРЕМЕННЫЕ
const namecardInput = popupCardElement.querySelector(
  ".popup-card__input_type_title"
); // Находим поля формы в DOM
const infocardInput = popupCardElement.querySelector(
  ".popup-card__input_type_link"
); // Находим поля формы в DOM
const formcardElement = popupCardElement.querySelector(".popup-card__form"); // Находим форму в DOM

// ОБЪЯВЛЯЕМ ВСЕ ФУНКЦИИ

// ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ
popupAddButtonElement.addEventListener("click", () =>
  openPopup(popupCardElement)
); // Регистрируем обработчики событий по клику для .profile__add-button

// ДОБАВЛЯЕМ ФОРМУ
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: namecardInput.value, link: infocardInput.value });

  namecardInput.value = "";
  infocardInput.value = "";

  closePopup(popupCardElement);
}

// ПРИКРЕПЛЯЕМ ОБРАБОТЧИК К ФОРМЕ
formcardElement.addEventListener("submit", handleCardFormSubmit);





// 3 ФОРМА
// ДЕЛАЕМ ВЫБОРКУ DOM-ЭЛЕМЕНТОВ
const popupPhotoElement = document.querySelector(".popup-photo"); // Для popup-photo
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector(".popup-photo__close"); // Для popup-photo
const popupPhotoTitleElement = popupPhotoElement.querySelector(".popup-photo__title"); // Для popup-photo
const popupViewElement = popupPhotoElement.querySelector(".popup-photo__image"); // Для popup-photo

// ОБЪЯВЛЯЕМ ВСЕ ФУНКЦИИ
function openPhotoPopup(title, link, alt) {
  // Функция открытия попапа
  openPopup(popupPhotoElement);
  popupPhotoTitleElement.textContent = title;
  popupViewElement.src = link;
  popupViewElement.alt = alt;
}

// Дом узлы
const elementContainer = document.querySelector(".elements");

// Шаблоны
const cardTemplate = document
  .querySelector("#place-template")
  .content.querySelector(".elements__item");

// Генерация карточки
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

// Добавление карточки из массива
const renderCard = (dataCard) => {
  elementContainer.prepend(generateCard(dataCard));
};

// Рендер всех карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});
