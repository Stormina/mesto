//Попапы

const popupProfile = document.querySelector('.popup');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close_el_edit');
const popupElementCloseButton = popupProfile.querySelector('.popup__close_el_add');
const containerEditElement = popupProfile.querySelector('.popup__container_el_edit');
const containerAddElement = popupProfile.querySelector('.popup__container_el_add');
const popupFormElement = popupProfile.querySelector('.popup__profile_form_element');

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_profile_name');
const jobInput = formElement.querySelector('.popup__input_profile_job');
const cardInput = formElement.querySelector('.popup__input_profile_card');
const linkImgInput = formElement.querySelector('.popup__input_profile_linkImg');

const profileElement = document.querySelector('.profile');
const nameProfile = profileElement.querySelector('.profile__title');
const jobProfile = profileElement.querySelector('.profile__subtitle');
const popupProfileOpenButton = profileElement.querySelector('.profile__edit-button');
const popupElementOpenButton = profileElement.querySelector('.profile__add-button');

const openPopup = function(event) {
  if (event.target === popupProfileOpenButton) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    containerEditElement.classList.remove('popup__container_hidden');
  } 
  else if (event.target === popupElementOpenButton) {
    containerAddElement.classList.remove('popup__container_hidden');
  }
  popupProfile.classList.add('popup_opened');
}

const closePopup = function() {
  containerEditElement.classList.add('popup__container_hidden');
  containerAddElement.classList.add('popup__container_hidden');
  popupProfile.classList.remove('popup_opened');
}

const closePopupOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopup();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  
  closePopup();
}

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

const templateElements = document.querySelector('.template');
const container = document.querySelector('.elements');

const getItemElement = (item) => {
  const element = templateElements.content.cloneNode(true).children[0];
  const textElement = element.querySelector('.elements__title');
  const imageElement = element.querySelector('.elements__image');
  textElement.textContent = item.name;
  imageElement.src = item.link;
  imageElement.alt = item.name;
  return element;
}

const renderItem = (item) => {
  const element = getItemElement(item);
  container.prepend(element);
}

initialCards.forEach(renderItem);

popupFormElement.addEventListener('sumbit', (evt) => {
  evt.preventDefault();
  
  const item = cardInput.value;
  const image = linkImgInput.value;
  renderItem(item, image);
})

//Слушатели

popupProfileOpenButton.addEventListener('click', openPopup);
popupProfileCloseButton.addEventListener('click', closePopup);
popupElementOpenButton.addEventListener('click', openPopup);
popupElementCloseButton.addEventListener('click', closePopup);
popupProfile.addEventListener('click', closePopupOverlay);
formElement.addEventListener('submit', formSubmitHandler);