// Карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Селекторы валидации
const selectors = {
  formSelector: '.form',
  sectionSelector: '.form__section',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  errorSelector: '.form__input-error',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Попап редактора профиля
const profileElement = document.querySelector('.profile');
const profileTitleName = profileElement.querySelector('.profile__title');
const elementPopupAddOpenButton = profileElement.querySelector('.profile__add-button');
const profileSubtitleJob = profileElement.querySelector('.profile__subtitle');
const profilePopupEditOpenButton = profileElement.querySelector('.profile__edit-button');

// Попап редактора профиля
const profilePopupEdit = '.popup_type_profile';
const profilePopupForm = document.querySelector('.form_type_profile');
const profileInputName = document.querySelector('.form__input_profile_name');
const profileInputJob = document.querySelector('.form__input_profile_job');

// Попап просмотра картинки
const cardPopupContainerImage = '.popup_type_image';

// Блок создания карточек
const cardTemplateContainer = document.querySelector('.elements');

// Попап добавления карточки
const elementPopupAdd = '.popup_type_element';
const elementPopupForm = document.querySelector('.form_type_element');
const templateCardDefault = '.template-element_type_default';

export {
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
  elementPopupAdd,
  elementPopupForm,
  cardTemplateContainer,
  templateCardDefault
};