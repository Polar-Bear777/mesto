// КЛАСС ПО СОЗДАНИЮ КАРТОЧКИ
export class Card {
    constructor( // Добавляем динамические данные, чтобы класс умел создавать карточки
            dataCard,
            templateSelector,
            handleCardClick,
            // openPhotoPopup,
            ) {
        this._name = dataCard.name;
        this._link = dataCard.link;
        this._templateSelector = templateSelector; // записали селектор в приватное поле
        // this._openPhotoPopup = openPhotoPopup;
        this._handleCardClick = handleCardClick;
        }

    // Получаем готовую разметку перед размещением на страницу
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
        .querySelector(this._templateSelector) // находим template-элемент
        .content // извлекаем содержимое
        .querySelector('.elements__item') // в содержимом находим элемент
        .cloneNode(true); // клонируем его

        // вернём DOM-элемент карточки
        return cardElement;
    }

    // Подготовка карточки к публикации
    generateCard() {
        this._element = this._getTemplate(); // запишем разметку в приватное поле, чтобы у других элементов появился доступ к ней

        // добавим данные
        this._elementPhoto = this._element.querySelector('.elements__image');
        this._elementTitle = this._element.querySelector('.elements__title');
        this._like = this._element.querySelector('.elements__like');
        this._deleted = this._element.querySelector('.elements__delete');

        this._setEventListeners(); // добавим обработчики

		    this._elementPhoto.src = this._link;
		    this._elementPhoto.alt = this._name;
		    this._elementTitle.textContent = this._name;

        // Вернем новую карточку в DOM
		    return this._element;
    }

    // Добавляем слушатель события
    _setEventListeners() {
		this._elementPhoto.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link)
		});
		this._like.addEventListener('click', () => {
			this._handleLikeCard();
		});
		this._deleted.addEventListener('click', () => {
			this._handleDeleteCard();
		});
	}

	// Добавляем удаление карточки с помошью .elements__delete
    _handleDeleteCard() {
		this._element.remove();
    this._element = null;
	}

    // Добавляем выделение лайка карточки с помошью .elements__like
	_handleLikeCard() {
		this._like.classList.toggle('elements__like_active');
	}
}
