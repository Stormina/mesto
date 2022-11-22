// Переменные

  // Блок редактора профиля
const profileElement = document.querySelector('.profile');
const profileTitleName = profileElement.querySelector('.profile__title');
const profileSubtitleJob = profileElement.querySelector('.profile__subtitle');
const profilePopupEditOpenButton = profileElement.querySelector('.profile__edit-button');
  
  // Блок создания карточек
const cardTemplateContainer = document.querySelector('.elements');
const cardTemplateElement = document.querySelector('.template-element');
const cardTemplateElementImage = cardTemplateElement.querySelector('.element__image');

  // Попап редактора профиля
const profilePopupEdit = document.querySelector('.popup_type_profile');
const profilePopupEditCloseButton = profilePopupEdit.querySelector('.popup__close_el_edit');
const profilePopupEditContainer = profilePopupEdit.querySelector('.popup__container_el_edit');
const profileInputName = profilePopupEdit.querySelector('.form__input_profile_name');
const profileInputJob = profilePopupEdit.querySelector('.form__input_profile_job');

  // Попап добавления карточки
const elementPopupAdd = document.querySelector('.popup_type_element');
const elementPopupAddCloseButton = elementPopupAdd.querySelector('.popup__close_el_add');
const elementPopupAddContainer = elementPopupAdd.querySelector('.popup__container_el_add');
const elementInputCard = elementPopupAdd.querySelector('.form__input_profile_card');
const elementInputLinkImage = elementPopupAdd.querySelector('.form__input_profile_link-img');
const elementPopupAddOpenButton = profileElement.querySelector('.profile__add-button');

  // Попап просмотра картинки
const cardPopupContainerImage = document.querySelector('.popup_type_image');
const cardPopupImageCloseButton = cardPopupContainerImage.querySelector('.popup__close_el_image');
const cardPopupImage = cardPopupContainerImage.querySelector('.popup__image');
const cardPopupImageCaption = cardPopupContainerImage.querySelector('.popup__caption');

// Функции открытия попапов

function openModalWindow (popupElement) {
  setButtonStateInactive(popupElement, selectors);
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalWindowEsc);
}

  // Заполняет инпуты попапа профиля при открытии
function editProfilePopupInputInfo () {
  profileInputName.value = profileTitleName.textContent;
  profileInputJob.value = profileSubtitleJob.textContent;
}

  // Заполняет данные попапа целевой карточки
function editCardPopupImageInfo (element) {
  cardPopupImage.src = element.target.src;
  cardPopupImage.alt = element.target.alt;
  cardPopupImageCaption.textContent = element.target.alt;
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
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popup) => {
      closeModalWindow(popup);
    });
  }
}

// Кнопка удалить

function deleteHandler (event) {
  event.target.closest('.element').remove();
}

// Активация лайка

function turnLikeButton (event) {
  event.target.classList.toggle('element__icon_active');
}

// Функции submit

function handlerSubmitFormProfile (event) {
  event.preventDefault();
  
  profileTitleName.textContent = profileInputName.value;
  profileSubtitleJob.textContent = profileInputJob.value;

  closeModalWindow(profilePopupEdit);
}

function handlerSubmitFormElement (event) {
  event.preventDefault();

  const item = {name: elementInputCard.value, link: elementInputLinkImage.value};
  
  renderItem(item);
  
  elementInputCard.value = "";
  elementInputLinkImage.value = "";

  closeModalWindow(elementPopupAdd);
}

// Создание карточек

function getItemElement (item) {
  const element = cardTemplateElement.content.cloneNode(true).children[0];
  const cardTemplateElementTitle = element.querySelector('.element__title');
  const cardTemplateElementImage = element.querySelector('.element__image');
  cardTemplateElementTitle.textContent = item.name;
  cardTemplateElementImage.src = item.link;
  cardTemplateElementImage.alt = item.name;
  setEventListener(element);

  return element;
}

function renderItem (item) {
  const element = getItemElement(item);
  cardTemplateContainer.prepend(element);
}

initialCards.forEach(renderItem);

// Вешаем слушатели

function setEventListener (element) {
  element.querySelector('.element__trash').addEventListener('click', deleteHandler);
  element.querySelector('.element__icon').addEventListener('click', turnLikeButton);
  element.querySelector('.element__image').addEventListener('click', (element) => {
    editCardPopupImageInfo(element);
    openModalWindow(cardPopupContainerImage);
  });
}

// Слушатели

  // Слушатели редактора профиля
profilePopupEditOpenButton.addEventListener('click', () => {
  editProfilePopupInputInfo();
  openModalWindow(profilePopupEdit);
});
profilePopupEditCloseButton.addEventListener('click', () => {
  closeModalWindow(profilePopupEdit);
});
profilePopupEdit.addEventListener('click', closeModalWindowOverlay);
profilePopupEditContainer.addEventListener('submit', handlerSubmitFormProfile);

  // Слушатели добавления карточек
elementPopupAddOpenButton.addEventListener('click', () => {
  openModalWindow(elementPopupAdd);
});
elementPopupAddCloseButton.addEventListener('click', () => {
  closeModalWindow(elementPopupAdd);
}); 
elementPopupAdd.addEventListener('click', closeModalWindowOverlay);
elementPopupAddContainer.addEventListener('submit', handlerSubmitFormElement);

 // Слушатели режима просмотра картинок
cardPopupImageCloseButton.addEventListener('click', () => {
  closeModalWindow(cardPopupContainerImage);
});
cardPopupContainerImage.addEventListener('click', closeModalWindowOverlay);

// Валидация форм

const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(selectors);