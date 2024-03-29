import { Popup } from "./Popup.js";

// КОНСТРУКТОР ФОРМЫ
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitButton = document.querySelector('.popup__save');
  }

  // Cобираем данные всех полей формы
  getInputValues() {
    const inputValues = {}; // Создали пустой объект
    this._inputs.forEach((input) => {
      // Добавили в него значение каждого инпута
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Перезаписываем родительский метод setEventListeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this.getInputValues());
    });
  }

  // Перезаписываем родительский метод closePopup
  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  submitButton(text) {
		this._submitButton.value = text;
	}
}
