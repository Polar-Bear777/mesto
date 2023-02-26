// ОТРИСОВКА ЭЛЕМЕНТОВ НА СТРАНИЦЕ
export class Section {
  constructor({ renderer }, selector) {
    // Будет отвечать за создание и отрисовку данных на странице
    this._renderer = renderer;
    // В него будем добавлять созданные элементы
    this._container = document.querySelector(selector);
  }

  // Отрисовка всех элементов
  renderItems(initialCards) {
    initialCards.forEach((item) => {
      // Отрисовка каждого отдельного элемента
      this._renderer(item);
    });
  }

  // Принимает DOM-элемент и добавляет его в контейнер
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
