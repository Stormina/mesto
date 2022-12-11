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
const profilePopupEdit = document.querySelector('.popup_type_profile');
const profilePopupEditCloseButton = profilePopupEdit.querySelector('.popup__close_el_edit');
const profilePopupEditContainer = profilePopupEdit.querySelector('.popup__container_el_edit');
const profileInputName = profilePopupEdit.querySelector('.form__input_profile_name');
const profileInputJob = profilePopupEdit.querySelector('.form__input_profile_job');

// Попап просмотра картинки
const cardPopupContainerImage = document.querySelector('.popup_type_image');
const cardPopupImage = cardPopupContainerImage.querySelector('.popup__image');
const cardPopupImageCaption = cardPopupContainerImage.querySelector('.popup__caption');
const cardPopupImageCloseButton = cardPopupContainerImage.querySelector('.popup__close_el_image');

// Попап добавления карточки
const elementPopupAdd = document.querySelector('.popup_type_element');
const elementPopupAddContainer = elementPopupAdd.querySelector('.popup__container_el_add');
const elementPopupAddCloseButton = elementPopupAdd.querySelector('.popup__close_el_add');
const elementInputCard = elementPopupAdd.querySelector('.form__input_profile_card');
const elementInputLinkImage = elementPopupAdd.querySelector('.form__input_profile_link-img');

export {
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
};