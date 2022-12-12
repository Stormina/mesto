export default class FormValidator {
  constructor(formElement, selectors) {
    this._sectionSelector = selectors.sectionSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._errorSelector = selectors.errorSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = formElement;
  }

  // Метод валидации формы
  _checkInputValidity = (inputElement) => {
    const formSection = inputElement.closest(this._sectionSelector);
    const errorElement = formSection.querySelector(this._errorSelector);
  
    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  // Скрыть текст ошибки валидности при открытии попапа редактирования профиля
  hideInputErrorEditProfile = () => {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(errorElement, inputElement);
      this._setButtonStateInactive();
    });
  }

  // Показать текст ошибки при невалидности
  _showInputError = (errorElement, inputElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрыть текст ошибки при валидности
  _hideInputError = (errorElement, inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
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
      this._setButtonStateInactive();
    } else {
      this._setButtonStateActive();
    }
  }

  // Возвращаем субмиту активое состояние
  _setButtonStateActive = () => {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  // Отключаем кнопку субмита
  _setButtonStateInactive = () => {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  // Слушатель инпутов
  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  // Вешаем слушатель форму
  enableValidation = () => {
    this._setEventListeners();
  }
}