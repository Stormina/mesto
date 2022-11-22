// Функция валидации формы
const checkInputValidity = (inputElement, selectors) => {
  const formSection = inputElement.closest('.form__section');
	const errorElement = formSection.querySelector('.form__input-error');

  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(errorElement, inputElement, selectors);
  }
}

// Показать текст при невалидности
const showInputError = (errorElement, inputElement, errorMessage, selectors) => {
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

// Скрыть текст при невалидности
const hideInputError = (errorElement, inputElement, selectors) => {
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


// Определение состояния субмита
const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
}

// Дефолтное состояние субмита при открытии попапа
const setButtonStateInactive = (formElement, selectors) => {
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector)
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(selectors.inactiveButtonClass);
}

// Слушатель инпутов
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

// Вешаем слушатель на каждую форму
const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
}