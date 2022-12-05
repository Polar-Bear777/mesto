// Проверка скрипта
console.log('Привет Мир!');



// Создаем МАССИВ для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];





// 1 ФОРМА
// ДЕЛАЕМ ВЫБОРКУ DOM-ЭЛЕМЕНТОВ
const popupElement = document.querySelector('.popup'); // Для popup
const popupCloseButtonElement = popupElement.querySelector('.popup__close'); // Для popup
const popupOpenButtonElement = document.querySelector('.profile__edit-button'); // Для popup

// ОБЪЯВЛЯЕМ ПЕРЕМЕННЫЕ
let nameInput = popupElement.querySelector('.popup__input_type_name'); // Находим поля формы в DOM
let jobInput = popupElement.querySelector('.popup__input_type_info'); // Находим поля формы в DOM
let formElement = popupElement.querySelector('.popup__form'); // Находим форму в DOM
let nameProfile = document.querySelector('.profile__title'); // Находим поля в DOM для profile
let jobProfile = document.querySelector('.profile__subtitle'); // Находим поля в DOM для profile

// ОБЪЯВЛЯЕМ ФУНКЦИИ
const openPopup = function() { // Объявляем функцию для открытия попапа
  popupElement.classList.add('popup_is-opened');
  nameInput.value=nameProfile.textContent;
  jobInput.value=jobProfile.textContent;
}

const closePopup = function() { // Объявляем функцию для закрытия попапа
  popupElement.classList.remove('popup_is-opened');
}

// ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ
popupOpenButtonElement.addEventListener('click', openPopup); // Регистрируем обработчики событий по клику для .edit__button
popupCloseButtonElement.addEventListener('click', closePopup); // Регистрируем обработчики событий по клику для .popup__close

// ДОБАВЛЯЕМ ФОРМУ
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent=nameInput.value;
  jobProfile.textContent=jobInput.value;

  closePopup();
}

// ПРИКРЕПЛЯЕМ ОБРАБОТЧИК К ФОРМЕ
formElement.addEventListener('submit', formSubmitHandler);





// 2 ФОРМА
// ДЕЛАЕМ ВЫБОРКУ DOM-ЭЛЕМЕНТОВ
const popupcardElement = document.querySelector('.popup-card'); // Для popup-card
const popupcardCloseButtonElement = popupcardElement.querySelector('.popup-card__close'); // Для popup-card
const popupAddButtonElement = document.querySelector('.profile__add-button'); // Для popup-card

// ОБЪЯВЛЯЕМ ВСЕ ПЕРЕМЕННЫЕ
let namecardInput = popupcardElement.querySelector('.popup-card__input_type_title'); // Находим поля формы в DOM
let infocardInput = popupcardElement.querySelector('.popup-card__input_type_link'); // Находим поля формы в DOM
let formcardElement = popupcardElement.querySelector('.popup-card__form'); // Находим форму в DOM


// ОБЪЯВЛЯЕМ ВСЕ ФУНКЦИИ
const opencardPopup = function() { // Объявляем функцию для открытия попапа карточки
  popupcardElement.classList.add('popup-card_is-opened');
}

const closecardPopup = function() { // Объявляем функцию для закрытия попапа карточки
  popupcardElement.classList.remove('popup-card_is-opened');
}

// ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ
popupcardCloseButtonElement.addEventListener('click', closecardPopup); // Регистрируем обработчики событий по клику для .popup-card__close
popupAddButtonElement.addEventListener('click', opencardPopup); // Регистрируем обработчики событий по клику для .profile__add-button

// ДОБАВЛЯЕМ ФОРМУ
function formcardSubmitHandler (evt) {
  evt.preventDefault();
  renderCard({name: namecardInput.value, link: infocardInput.value});

  namecardInput.value = '';
  infocardInput.value = '';

  closecardPopup();
}

// ПРИКРЕПЛЯЕМ ОБРАБОТЧИК К ФОРМЕ
formcardElement.addEventListener('submit', formcardSubmitHandler);





// 3 ФОРМА
// ДЕЛАЕМ ВЫБОРКУ DOM-ЭЛЕМЕНТОВ
const popupPhotoElement = document.querySelector('.popup-photo'); // Для popup-photo
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector('.popup-photo__close'); // Для popup-photo
const popupPhotoTitleElement = popupPhotoElement.querySelector('.popup-photo__title'); // Для popup-photo
const popupViewElement = popupPhotoElement.querySelector('.popup-photo__image'); // Для popup-photo


// ОБЪЯВЛЯЕМ ВСЕ ФУНКЦИИ
function openPhotoPopup(title, link, alt){ // Функция открытия попапа
  popupPhotoElement.classList.add('popup-photo_is-opened');
  popupPhotoTitleElement.textContent = title;
  popupViewElement.src = link;
  popupViewElement.alt = alt;
}

function closePhotoPopup() { // Объявляем функцию для закрытия попапа карточки
  popupPhotoElement.classList.remove('popup-photo_is-opened');
}




// Дом узлы
const elementContainer = document.querySelector('.elements');

// Шаблоны
const cardTemplate = document.querySelector('#place-template').content.querySelector('.elements__item');

// Генерация карточки
const generateCard = (dataCard) => { // Генерируем
  const newCard = cardTemplate.cloneNode(true); // Клонируем
  const name = newCard.querySelector('.elements__title'); // Получаем title
  const image = newCard.querySelector('.elements__image'); // Получаем image
  const cardLike = newCard.querySelector('.elements__like'); // Получаем like
  const deleteButton = newCard.querySelector('.elements__delete'); // Получаем delete

  name.textContent = dataCard.name; // Получаем название для карточки
  image.src = dataCard.link; // Получаем ссылку для фото
  image.alt = dataCard.name; // Получаем подпись для фото

  cardLike.addEventListener('click', e => {e.target.classList.toggle('elements__like_active')}); // Лайк карточки
  deleteButton.addEventListener('click', e => {e.target.closest('.elements__item').remove()}); // Удаление карточки
  image.addEventListener('click', () => {
    openPhotoPopup(name.textContent, image.src, image.alt);
  }); // Увеличение картинки и передали значения ссылки, подписи, названия
  popupPhotoCloseButtonElement.addEventListener('click', closePhotoPopup); // Закрытие попапа (форма 3)

  return newCard;
};

// Добавление карточки из массива
const renderCard = (dataCard) => {
  elementContainer.prepend(generateCard(dataCard));
}

// Рендер всех карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})
