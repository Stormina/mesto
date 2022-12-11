import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { 
  initialCards,
  selectors,
  profilePopupEdit,
  profilePopupEditCloseButton,
  profilePopupEditContainer,
  profileInputName,
  profileInputJob,
  profileTitleName,
  elementPopupAddOpenButton,
  profileSubtitleJob,
  profilePopupEditOpenButton,
  cardPopupContainerImage,
  cardPopupImage,
  cardPopupImageCaption,
  cardPopupImageCloseButton,
  elementPopupAdd,
  elementPopupAddContainer,
  elementPopupAddCloseButton,
  elementInputCard,
  elementInputLinkImage
} from "./constants.js";

// Сделать кнопку субмита неактивной при открытии попапа редактирования профиля
const setButtonStateInactiveEditProfile = (formElement, selectors) => {
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  formEditValidator.setButtonStateInactive(buttonElement);
} 

// Скрыть текст ошибки валидности при открытии попапа редактирования профиля
const hideInputErrorEditProfile = (profilePopupEdit, selectors) => {
  const formSectionProfileList = Array.from(profilePopupEdit.querySelectorAll(selectors.sectionSelector));
  formSectionProfileList.forEach((formElement) => {
    const inputError = formElement.querySelector(selectors.errorSelector);
    const inputProfile = formElement.querySelector(selectors.inputSelector);
    formEditValidator.hideInputError(inputError, inputProfile);
  });
}

// Функции открытия попапов

function openModalWindow (popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalWindowEsc);
}

// Заполняет инпуты попапа профиля при открытии
function editProfilePopupInputInfo () {
  profileInputName.value = profileTitleName.textContent;
  profileInputJob.value = profileSubtitleJob.textContent;
}

 // Открыть попап картинки
export function openModalWindowImage (element) {
  cardPopupImage.src = element.src;
  cardPopupImage.alt = element.alt;
  cardPopupImageCaption.textContent = element.alt;
  openModalWindow(cardPopupContainerImage);
} 

// Функция закрытия попапов

function closeModalWindow (popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalWindowEsc);
}

// Функция закрытия попапов кликом в пустое пространство
function closeModalWindowOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closeModalWindow(event.target);
}

// Функция закрытия попапов кнопкой Esc
function closeModalWindowEsc (event) {
  if ((event.key) === 'Escape' ) {
    const popupOpened = document.querySelector('.popup_opened');
      closeModalWindow(popupOpened);
  }
}

// Функция submit редактора профиля
function handlerSubmitFormProfile (event) {
  event.preventDefault();
  
  profileTitleName.textContent = profileInputName.value;
  profileSubtitleJob.textContent = profileInputJob.value;

  closeModalWindow(profilePopupEdit);
}

// Функция submit создания новой карточки
function handlerSubmitFormElement (event) {
  event.preventDefault();

  const card = new Card(elementInputCard.value, elementInputLinkImage.value);
  card.renderItem(elementInputCard.value, elementInputLinkImage.value);
  
  elementInputCard.value = "";
  elementInputLinkImage.value = "";
  
  setButtonStateInactiveEditProfile(elementPopupAdd, selectors);
  closeModalWindow(elementPopupAdd);
}

// Слушатели редактора профиля
profilePopupEditOpenButton.addEventListener('click', () => {
  editProfilePopupInputInfo();
  setButtonStateInactiveEditProfile(profilePopupEdit, selectors);
  hideInputErrorEditProfile(profilePopupEdit, selectors);
  openModalWindow(profilePopupEdit);
});
profilePopupEditCloseButton.addEventListener('click', () => {
  closeModalWindow(profilePopupEdit);
});
profilePopupEdit.addEventListener('mousedown', closeModalWindowOverlay);
profilePopupEditContainer.addEventListener('submit', handlerSubmitFormProfile);

// Слушатели создания новых карточек
elementPopupAddOpenButton.addEventListener('click', () => {
  openModalWindow(elementPopupAdd);
});
elementPopupAddCloseButton.addEventListener('click', () => {
  closeModalWindow(elementPopupAdd);
}); 
elementPopupAdd.addEventListener('mousedown', closeModalWindowOverlay);
elementPopupAddContainer.addEventListener('submit', handlerSubmitFormElement);

// Слушатели режима просмотра картинок
cardPopupImageCloseButton.addEventListener('click', () => {
  closeModalWindow(cardPopupContainerImage);
});
cardPopupContainerImage.addEventListener('mousedown', closeModalWindowOverlay);

// Валидация форм
const formAddValidator = new FormValidator(elementPopupAddContainer, selectors);
const formEditValidator = new FormValidator(profilePopupEditContainer, selectors);

formAddValidator.enableValidation();
formEditValidator.enableValidation();

// Генерация всех карточек из массива
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  card.renderItem(item.name, item.link);
});