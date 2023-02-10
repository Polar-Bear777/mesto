// ОТРИСОВКА ЭЛЕМЕНТОВ НА СТРАНИЦЕ
export class Section {
	constructor( {initialCards, renderer}, selector ) {
    // Массив данных, которые нужно добавить на страницу при инициализации класса
		this._initialCards = initialCards;

    // Будет отвечать за создание и отрисовку данных на странице
		this._renderer = renderer;

    // В него будем добавлять созданные элементы
		this._container = document.querySelector(selector);
	}

  // Отрисовка всех элементов
	renderItems() {
		this._initialCards.forEach((item) => {

      // Отрисовка каждого отдельного элемента
			this._renderer(item);
		});
	}

	// Принимает DOM-элемент и добавляет его в контейнер
	addItem(cardElement) {
		this._container.prepend(cardElement);
	}
}
