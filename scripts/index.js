// Проверка скрипта
console.log('Привет Мир!');



// Делаем выборку DOM-элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

// ОБЪЯВЛЯЕМ ВСЕ ПЕРЕМЕННЫЕ
// Находим поля формы в DOM
let nameInput = popupElement.querySelector('.popup__input_type_name');
let jobInput = popupElement.querySelector('.popup__input_type_info');

// Находим форму в DOM
let formElement = popupElement.querySelector('.popup__form');

// Находим поля в DOM для profile
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');



// ОБЪЯВЛЯЕМ ВСЕ ФУНКЦИИ
// Объявляем функцию для открытия попапа
const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  nameInput.value=nameProfile.textContent;
  jobInput.value=jobProfile.textContent;
}

// Объявляем функцию для закрытия попапа
const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent=nameInput.value;
  jobProfile.textContent=jobInput.value;
 closePopup();
}



// ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ
// Регистрируем обработчики событий по клику для .edit__button
popupOpenButtonElement.addEventListener('click', openPopup);

// Регистрируем обработчики событий по клику для .popup__close
popupCloseButtonElement.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);