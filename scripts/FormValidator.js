export default class FormValidator {
  constructor(formElement, selectors) {
    this._formSelector = selectors.formSelector;
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
      this.hideInputError(errorElement, inputElement);
    }
  }
  
  // Показать текст ошибки при невалидности
  _showInputError = (errorElement, inputElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрыть текст ошибки при валидности
  hideInputError = (errorElement, inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Определение состояния субмита
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this.setButtonStateInactive(buttonElement);
    } else {
      this._setButtonStateActive(buttonElement);
    }
  }

  // Возвращаем субмиту активое состояние
  _setButtonStateActive = (buttonElement) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  // Отключаем кнопку субмита
  setButtonStateInactive = (buttonElement) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  // Слушатель инпутов
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // Вешаем слушатель на каждую форму
  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}