

// КЛАСС ПО СОЗДАНИЮ КАРТОЧКИ
export class Card {
  constructor(
    dataCard,
    templateSelector,
    userId,
    {handleCardClick},
    {handleDeleteIconClick},
    {handleSetLike},
  ) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._templateSelector = templateSelector;
    this._likes = dataCard.likes;
    this._userId = userId;
    this._cardId = dataCard._id;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._ownerId = dataCard.owner._id;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  // Получаем готовую разметку перед размещением на страницу
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector) // находим template-элемент
      .content // извлекаем содержимое
      .querySelector(".elements__item") // в содержимом находим элемент
      .cloneNode(true); // клонируем его

    // вернём DOM-элемент карточки
    return cardElement;
  }

  // Подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate(); // запишем разметку в приватное поле, чтобы у других элементов появился доступ к ней

    // добавим данные
    this._elementPhoto = this._element.querySelector(".elements__image");
    this._elementTitle = this._element.querySelector(".elements__title");
    this._like = this._element.querySelector(".elements__like");
    this._deleted = this._element.querySelector(".elements__delete");
    this._likesNumber = this._element.querySelector(".elements__like-number");

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._likesNumber.textContent = this._likes.length;

    this._hasDeleteBtn();
    this._setEventListeners();

    // Вернем новую карточку в DOM
    return this._element;
  }

  // Добавляем слушателей события
  _setEventListeners() {
    // При клике на изображение
    this._elementPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    // Для кнопки лайк
    this._like.addEventListener("click", () => {
      this._handleSetLike(this._cardId);
    });
    // Для кнопки удалить
    this._deleted.addEventListener("click", () => {
      this._handleDeleteIconClick();
    });
  }

  // Добавляем удаление карточки
  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }



  // Проверяем пользователя карточки и убираем кнопку удалить карточку
  _hasDeleteBtn() {
    if (this._userId != this._ownerId) {
      this._deleted.remove();
    }
  }


  // Лайк
  hasMyLike() {
		return this._likes.some((like) => like._id === this._userId);
	}

  // Добавить / Удалить
  toggleLike() {
		if (this.hasMyLike()) {
			this._like.classList.add('elements__like_active');
		} else {
			this._like.classList.remove('elements__like_active');
		}
	}

	// Поставить количество лайков
	updateCounter(likesList) {
		this._likes = likesList;
		this._likesNumber.textContent = this._likes.length;
		this.toggleLike();
	}
}
