//Попапы

const popupProfile = document.querySelector('.popup_profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close_el_edit');
const containerEditElement = popupProfile.querySelector('.popup__container_el_edit');
const nameInput = containerEditElement.querySelector('.popup__input_profile_name');
const jobInput = containerEditElement.querySelector('.popup__input_profile_job');

const popupElement = document.querySelector('.popup_element');
const popupElementCloseButton = popupElement.querySelector('.popup__close_el_add');
const containerAddElement = popupElement.querySelector('.popup__container_el_add');
const cardInput = containerAddElement.querySelector('.popup__input_profile_card');
const linkImgInput = containerAddElement.querySelector('.popup__input_profile_link-img');

const profileElement = document.querySelector('.profile');
const nameProfile = profileElement.querySelector('.profile__title');
const jobProfile = profileElement.querySelector('.profile__subtitle');
const popupProfileOpenButton = profileElement.querySelector('.profile__edit-button');
const popupElementOpenButton = profileElement.querySelector('.profile__add-button');

const templateElements = document.querySelector('.template');
const container = document.querySelector('.elements');

function openPopupEditProfile () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  
  popupProfile.classList.add('popup_opened');
}

function closePopupProfile () {
  popupProfile.classList.remove('popup_opened');
}

function openPopupAddElement () {
  popupElement.classList.add('popup_opened');
}

function closePopupElement () {
  popupElement.classList.remove('popup_opened');
}

function closePopupOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  event.target.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
  event.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopupProfile();
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

//Кнопка удалить

function deleteHandler (event) {
  event.target.closest('.elements__element').remove();
}

//Активация лайка

function turnLikeButton (event) {
  event.target.classList.toggle('elements__icon_active');
}

//Вешаем слушатели

function setEventListener (element) {
  const deleteButton = element.querySelector('.elements__trash');
  deleteButton.addEventListener('click', deleteHandler);
  const like = element.querySelector('.elements__icon');
  like.addEventListener('click', turnLikeButton);
}

function getItemElement (item) {
  const element = templateElements.content.cloneNode(true).children[0];
  const textElement = element.querySelector('.elements__title');
  const imageElement = element.querySelector('.elements__image');
  textElement.textContent = item.name;
  imageElement.src = item.link;
  imageElement.alt = item.name;
  return element;
}

function renderItem (item) {
  const element = getItemElement(item);
  setEventListener(element);
  container.prepend(element);
}

initialCards.forEach(renderItem);

function formElementSubmitHandler (event) {
  event.preventDefault();

  const item = {name: cardInput.value, link: linkImgInput.value};
  
  renderItem(item);
  
  cardInput.value = "";
  linkImgInput.value = "";

  closePopupElement();
}

//Слушатели

popupProfileOpenButton.addEventListener('click', openPopupEditProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupProfile.addEventListener('click', closePopupOverlay);
containerEditElement.addEventListener('submit', formSubmitHandler);

popupElementOpenButton.addEventListener('click', openPopupAddElement);
popupElementCloseButton.addEventListener('click', closePopupElement);
popupElement.addEventListener('click', closePopupOverlay);
containerAddElement.addEventListener('submit', formElementSubmitHandler);