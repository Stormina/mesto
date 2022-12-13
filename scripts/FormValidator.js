export default class FormValidator {
  constructor(formElement, selectors) {
    this._formElement = formElement;
    this._selectors = selectors;
  }

  // Метод валидации формы
  _checkInputValidity = (inputElement) => {
    const formSection = inputElement.closest(this._selectors.sectionSelector);
    const errorElement = formSection.querySelector(this._selectors.errorSelector);
  
    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  // Скрыть текст ошибки валидности при открытии попапа редактирования профиля
  hideInputErrorEditProfile = () => {
    const sectionList = Array.from(this._formElement.querySelectorAll(this._selectors.sectionSelector));
    sectionList.forEach((sectionElement) => {
      const errorElement = sectionElement.querySelector(this._selectors.errorSelector);
      const inputElement = sectionElement.querySelector(this._selectors.inputSelector);
      this._hideInputError(errorElement, inputElement);
      this.setButtonStateInactive();
    });
  }

  // Показать текст ошибки при невалидности
  _showInputError = (errorElement, inputElement, errorMessage) => {
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.errorClass);
  }

  // Скрыть текст ошибки при валидности
  _hideInputError = (errorElement, inputElement) => {
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  }

  // Определение состояния субмита
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.setButtonStateInactive();
    } else {
      this._setButtonStateActive();
    }
  }

  // Возвращаем субмиту активое состояние
  _setButtonStateActive = () => {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
  }

  // Отключаем кнопку субмита
  setButtonStateInactive = () => {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
  }

  // Слушатель инпутов
  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Вешаем слушатель форму
  enableValidation = () => {
    this._setEventListeners();
  }
}