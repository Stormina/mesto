import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { 
  initialCards,
  selectors,
  profilePopupEdit,
  profilePopupForm,
  profileInputName,
  profileInputJob,
  profileTitleName,
  elementPopupAddOpenButton,
  profileSubtitleJob,
  profilePopupEditOpenButton,
  cardPopupContainerImage,
  cardPopupImage,
  cardPopupImageCaption,
  elementPopupAdd,
  elementPopupForm,
  elementInputCard,
  elementInputLinkImage,
  cardTemplateContainer
} from "./constants.js";

// Функция открытия модального окна
function openModalWindow (popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalWindowEsc);
}

// Функция закрытия модального окна
function closeModalWindow (popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalWindowEsc);
}

// Функция закрытия модального окна кнопкой Esc
function closeModalWindowEsc (event) {
  if ((event.key) === 'Escape' ) {
    const popupOpened = document.querySelector('.popup_opened');
      closeModalWindow(popupOpened);
  }
}

// Функция закрытия попапов
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (event) => { 
    if ((event.target) === event.currentTarget || 
    event.target.classList.contains('popup__close')) { 
      closeModalWindow (popup); 
    }; 
  }); 
}); 

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

// Функция submit редактора профиля
function handleSubmitFormProfile (event) {
  event.preventDefault();
  
  profileTitleName.textContent = profileInputName.value;
  profileSubtitleJob.textContent = profileInputJob.value;

  closeModalWindow(profilePopupEdit);
}

// Функция submit создания новой карточки
function handleSubmitFormElement (event) {
  event.preventDefault();

  renderItem({name: elementInputCard.value, link: elementInputLinkImage.value});
  
  elementInputCard.value = "";
  elementInputLinkImage.value = "";
  
  formAddValidator.hideInputErrorEditProfile(elementPopupAdd);
  closeModalWindow(elementPopupAdd);
}

// Слушатели редактора профиля
profilePopupEditOpenButton.addEventListener('click', () => {
  editProfilePopupInputInfo();
  formEditValidator.hideInputErrorEditProfile(profilePopupEdit);
  openModalWindow(profilePopupEdit);
});
profilePopupForm.addEventListener('submit', handleSubmitFormProfile);

// Слушатели создания новых карточек
elementPopupAddOpenButton.addEventListener('click', () => {
  openModalWindow(elementPopupAdd);
});
elementPopupForm.addEventListener('submit', handleSubmitFormElement);

// Валидация форм
const formAddValidator = new FormValidator(elementPopupForm, selectors);
const formEditValidator = new FormValidator(profilePopupForm, selectors);

formAddValidator.enableValidation();
formEditValidator.enableValidation();

// Создание разметки карточки
function renderItem (item) {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  cardTemplateContainer.prepend(cardElement);
}

// Генерация всех карточек из массива
initialCards.forEach(renderItem);