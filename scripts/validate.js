// ВАЛИДАЦИЯ НА INPUT ЧЕРЕЗ БРАУЗЕРНЫЕ СВОЙСТВА
const checkInputValidity = (input, config) => {
    const error = document.querySelector(`#${input.id}-error`) // Находим ошибку

    if(input.validity.valid) {
      // убрать ошибку
      error.textContent = ''
      error.classList.remove(config.errorClass)
      input.classList.remove(config.inputErrorClass)
    } else {
      error.textContent = input.validationMessage
      error.classList.add(config.errorClass)
      input.classList.add(config.inputErrorClass)
    }
  }

  const toggleButton = (inputs, button, config) => {
    const isFormValid = inputs.every(input => input.validity.valid)

    if(isFormValid) {
      // раздизейблить
      button.classList.remove(config.inactiveButtonClass)
      button.disabled = ''
    } else {
      // задизейблить
      button.classList.add(config.inactiveButtonClass)
      button.disabled = 'disabled'
    }
  }






  // включение валидации вызовом enableValidation
  // все настройки передаются при вызове
  const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, ...restConfig }) => {
    const forms = [...document.querySelectorAll(formSelector)] // нашли все формы

    forms.forEach(form => { // Нашли все формы
      const inputs = [...form.querySelectorAll(inputSelector)] // Нашли все инпуты внутри формы
      const button = form.querySelector(submitButtonSelector) // Нашли кнопку для валидации

      form.addEventListener('submit', (e) => {
        e.preventDefault() // Убрали дефолтное поведение
      })

      inputs.forEach(input => { // Перебераем все инпуты
        input.addEventListener('input', () => { // Подписываемся на каждый инпут
          // 1. Показать ошибку
          checkInputValidity(input, restConfig)
          // 2. Задизейблить кнопку
          toggleButton(inputs, button, restConfig)
        })
      })
    })
  }


  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'error',
    errorClass: 'popup__error_visible'
  });
