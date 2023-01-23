// КЛАСС ПО НАСТРОЙКЕ ВАЛИДАЦИИ ПОЛЕЙ
export class FormValidator {
  constructor(config, formsElement) {
      this._form = formsElement;
      this._inputSelector = config.inputSelector;
		  this._submitButtonSelector = config.submitButtonSelector;
		  this._inactiveButtonClass = config.inactiveButtonClass;
		  this._inputErrorClass = config.inputErrorClass;
      this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
		  this._button = this._form.querySelector(this._submitButtonSelector);
  }

  // ПОКАЗАТЬ ОШИБКУ
  _checkInputError(input, validationMessage) {
    const error = this._form.querySelector(`#${input.id}-error`) // Находим ошибку
    input.classList.add(this._inputErrorClass);
    error.textContent=validationMessage;
  }

  // УБРАТЬ ОШИБКУ
  _removeInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`) // Находим ошибку
    input.classList.remove(this._inputErrorClass);
    error.textContent='';
  }

  // ПРОВЕРЯЕМ ВАЛИДНОСТЬ ПОЛЕЙ
  // Если валиден
  _isValid(input) {
		if (!input.validity.valid) {
			//если введено некорректное значение покажем ошибку
			this._checkInputError(input, input.validationMessage);
		} else {
			this._removeInputError(input);
		}
	}

  // Если не валиден
  _invalid() {
    return this._inputs.some((input) => {
			return !input.validity.valid;
		});
  }

  // СОСТОЯНИЕ КНОПКИ САМБИТА
  _toggleButton(inputs) {
    if(this._invalid(inputs)) {
      // задизейблить
      this._button.classList.add(this._inactiveButtonClass)
      this._button.disabled = true;
    } else {
      // раздизейблить
      this._button.classList.remove(this._inactiveButtonClass)
      this._button.disabled = false;
    }
  }

  // ДОБАВЛЯЕМ ВСЕ ОБРАБОТЧКИ В ОДНОМ МЕСТЕ
  _setEventListeners = () => {
		this._toggleButton();

		this._inputs.forEach((input) => { // Перебераем все инпуты
			input.addEventListener('input', () => { // Подписываемся на каждый инпут
				// 1. Показать ошибку
        this._isValid(input);
        // 2. Задизейблить кнопку
				this._toggleButton();
			});
		});
	}

  // АВТО-СБРОС ОШИБКИ В ФОРМЕ
  resetValidation() {
    // Управляем кнопкой
    this._toggleButton();

    this._inputs.forEach((input) => {
      // Очищаем ошибки
      this._removeInputError(input)
    });
  }

  // ВАЛИДАЦИЯ ФОРМЫ
  enableValidation() {
		this._setEventListeners();
	}
}
