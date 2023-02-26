/* ------------------------ ИМПОРТЫ ------------------------ */
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopopWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js"
import { Api } from "../components/Api.js";

import "./index.css";



/* ------------------------ ВЫБОРКА DOM-ЭЛЕМЕНТОВ ------------------------ */
/* ------------------------ ПОПАП ПРОФИЛЯ (PROFILE-POPUP) ------------------------ */
// Находим попап профиля
const profilePopup = document.querySelector(".profile-popup");
// Находим кнопку для открытия
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
// Находим поля формы
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_info");
// Находим форму
const PopupFormElement = profilePopup.querySelector(".popup__form");

/* ------------------------ ПОПАП КАРТОЧКИ (POPUP-CARD) ------------------------ */
// Находим попап карточки
const popupCardElement = document.querySelector(".popup-card");
// Находим кнопку для открытия
const popupAddButtonElement = document.querySelector(".profile__add-button");
// Находим форму
const formCardElement = popupCardElement.querySelector(".popup-card__form");

/* ------------------------ ПОПАП КАРТИНКИ (POPUP-PHOTO) ------------------------ */
// Находим попап картинки
const popupPhotoElement = document.querySelector(".popup-photo");
// Находим текст
const popupPhotoTitleElement = popupPhotoElement.querySelector(".popup-photo__title");
// Находим изображение
const popupViewElement = popupPhotoElement.querySelector(".popup-photo__image"); // Для popup-photo

/* ------------------------ ПОПАП АВАТАРА (POPUP-AVATAR) ------------------------ */
// Находим попап аватара
const popupEditAvatar = document.querySelector('.popup-avatar');
// Находим форму
const formEditAvatar = popupEditAvatar.querySelector('.popup-avatar__form');
// Находим аватар
const avatar = document.querySelector('.profile__avatar');
// Находим кнопку для открытия
const buttonEditAvatar = document.querySelector('.profile__avatar-button');
// Находим инпут
// const avatarInput = document.querySelector('.popup-avatar__input_type_avatar');


const popupOpenChangeElement = document.querySelector(
  ".profile__avatar-button"
);
const avatarForm = document.forms["change"];
const avatarInput = document.querySelector(".popup__input_type_avatar-link");

popupOpenChangeElement.addEventListener("click", () => {
  avatarPopup.openPopup();
  formValidatorForChange.resetValidation();
});

const formValidatorForChange = new FormValidator(validationConfig, avatarForm);
formValidatorForChange.enableValidation();

function handleEditAvatar() {
  avatarPopup.submitButton("Сохранение...");
  api
    .editAvatar(avatarInput.value)
    .then((res) => userInfo.setAvatar(res.avatar))
    .then(() => avatarPopup.closePopup())
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.submitButton("Сохранить"));
}
const avatarPopup = new PopupWithForm(".popup-avatar", handleEditAvatar);
avatarPopup.setEventListeners();







/* ------------------------ API ------------------------ */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'fe76754b-7973-440a-9fc3-fdd57a5c4607',
    'Content-Type': 'application/json'
  }
});

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    // userInfo.setUserInfo(userData.name, userData.about);
    // user.setAvatar(userData.avatar);
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });



/* ------------------------ ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ ------------------------ */
// Отображение информации о пользователе
const userInfo = new UserInfo({
  name: '.profile__title',
  info: '.profile__subtitle',
  avatar: '.profile__avatar'}
);

// ===== Для попапа профиля ===== //
const modalEdit = new PopupWithForm(".profile-popup", (data) => {
  modalEdit.submitButton('Сохранение...');
  api.editUserInfo(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    modalEdit.closePopup();
    modalEdit.submitButton('Сохранить');
  })
  .catch((err) => console.log(err))
});
modalEdit.setEventListeners();


// ===== Для попапа карточки ===== //
const modalAdd = new PopupWithForm(".popup-card", (inputValues) => {
  modalAdd.submitButton('Сохранение...');
	api.addCard(inputValues)
  .then(res => {
    cardList.addItem(createCard(res));
  })
  modalAdd.closePopup();
  modalAdd.submitButton('Сохранить');
});
modalAdd.setEventListeners();


// ===== Для попапа просмотра картинки ===== //
const modalView = new PopupWithImage(".popup-photo");
modalView.setEventListeners();


// ===== Попап с подтверждением удаления карточки ===== //
const modalDelete = new PopupWithConfirmation('.popup-delete');
modalDelete.setEventListeners();


// ===== Попап аватара ===== //
// function handleEditAvatar (inputValues) {
//   console.log(inputValues)
//   modalChange.submitButton('Сохранение...');
//   api.editAvatar(inputValues)
//     .then((userData) => {
//       userInfo.setAvatar(userData);
//       modalChange.closePopup();
//       modalChange.submitButton('Сохранить');
//   })
//     .catch((err) => console.log(err))
// }

// const modalChange = new PopupWithForm('.popup-avatar', handleEditAvatar);
// modalChange.setEventListeners();



/* ------------------------ ДОБАВЛЯЕМ СЛУШАТЕЛЕЙ ------------------------ */
// КНОПКА ИЗМЕНИТЬ .profile__edit-button
popupOpenButtonElement.addEventListener("click", () => {
  modalEdit.openPopup();
  const information = userInfo.getUserInfo();
  nameInput.value = information.name;
  jobInput.value = information.info;
});

// КНОПКА ДОБАВИТЬ .profile__add-button
popupAddButtonElement.addEventListener("click", () => {
  modalAdd.openPopup();
  formValidatorForAdd.resetValidation();
});

// // КНОПКА АВТАРА .profile__avatar-button
// buttonEditAvatar.addEventListener("click", () => {
// 	modalChange.openPopup();
//   // formEditAvatarValidator
// 	formEditAvatarValidator.resetValidation();
// 	modalChange.getInputValues(userInfo.getUserInfo());
// })

/* ------------------------ CREATECARD ------------------------ */
function createCard(item) {
  const card = new Card(
    item,
    "#place-template",
    userId,

    // Добавление новой карточки
    {handleCardClick: (title, link) => {
			modalView.openPopup(title, link);
			popupViewElement.src = link;
			popupViewElement.alt = title;
			popupPhotoTitleElement.textContent = title;
			}},

    // Удаление карточки
    {handleDeleteIconClick: () => {
			modalDelete.openPopup();
			modalDelete.submitCallback(() => {
			api.handleDeleteCard(item._id)
				.then(() => {
					card.handleDeleteCard();
					modalDelete.closePopup();
					})
				.catch((err) => console.log(err))
			})
		}},

    // Лайк карточки
    {handleSetLike: (id) => {
			card.hasMyLike()
      // Удалим, если стоит наш
				? api
						.deleteLike(id)
						.then(res => {
							card.updateCounter(res.likes);
							})
						.catch((err) => console.log(err))
				: api
						.setLike(id) //добавим если нет нашего
						.then(res => {
							card.updateCounter(res.likes);
							})
						.catch((err) => console.log(err))
			}
		},
  );

  const cardElement = card.generateCard();
  return cardElement;
}



/* ------------------------ SECTION ------------------------ */
const cardList = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item)
		cardList.addItem(card);
  },
}, '.elements');


/* ------------------------ ВЫЗОВ ВАЛИДАЦИИ ------------------------ */
// Для кнопки редактировать
const formValidatorForEdit = new FormValidator(
  validationConfig,
  PopupFormElement
);
formValidatorForEdit.enableValidation();

// Для кнопки добавить
const formValidatorForAdd = new FormValidator(
  validationConfig,
  formCardElement
);
formValidatorForAdd.enableValidation();

// // Для кнопки редактирования аватара
// const formEditAvatarValidator = new FormValidator(
//   validationConfig,
//   formEditAvatar
// );
// formEditAvatarValidator.enableValidation();
