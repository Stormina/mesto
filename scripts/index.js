// Переменные

const popupProfile = document.querySelector('.popup_type_profile');// Попап редактора профиля
const popupProfileCloseButton = popupProfile.querySelector('.popup__close_el_edit');
const containerEditElement = popupProfile.querySelector('.popup__container_el_edit');
const nameInput = popupProfile.querySelector('.popup__input_profile_name');
const jobInput = popupProfile.querySelector('.popup__input_profile_job');

const popupElement = document.querySelector('.popup_type_element');// Попап добавления карточки
const popupElementCloseButton = popupElement.querySelector('.popup__close_el_add');
const containerAddElement = popupElement.querySelector('.popup__container_el_add');
const cardInput = popupElement.querySelector('.popup__input_profile_card');
const linkImgInput = popupElement.querySelector('.popup__input_profile_link-img');

const profileElement = document.querySelector('.profile');// Блок редактора профиля
const nameProfile = profileElement.querySelector('.profile__title');
const jobProfile = profileElement.querySelector('.profile__subtitle');
const popupProfileOpenButton = profileElement.querySelector('.profile__edit-button');
const popupElementOpenButton = profileElement.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup_type_image');// Попап просмотра картинки
const popupImageCloseButton = popupImage.querySelector('.popup__close_el_image');
const elementContainerCardImage = popupImage.querySelector('.popup__image');
const elementContainerCardCaption = popupImage.querySelector('.popup__caption');

const container = document.querySelector('.elements');// Блок создания карточек
const templateElements = document.querySelector('.template-element');
const templateElementsImage = templateElements.querySelector('.element__image');

// Открыть попап

function openPopupEditProfile () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  
  popupProfile.classList.add('popup_opened');
}

function openPopupAddElement () {
  popupElement.classList.add('popup_opened');
}

function openPopupImage (event) {
  popupImageScreenSize(event);

  popupImage.classList.add('popup_opened');
}

// Закрыть попап

function closePopupProfile () {
  popupProfile.classList.remove('popup_opened');
}

function closePopupElement () {
  popupElement.classList.remove('popup_opened');
}

function closePopupImage () {
  popupImage.classList.remove('popup_opened');
}

function closePopupOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  event.target.classList.remove('popup_opened');
}

//Просмотр картинки

function popupImageScreenSize (event) {
  elementContainerCardImage.src = event.target.src;
  elementContainerCardImage.alt = event.target.alt;
  elementContainerCardCaption.textContent = event.target.alt;
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

function submitFormProfileHandler (event) {
  event.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopupProfile();
}

function submitFormElementHandler (event) {
  event.preventDefault();

  const item = {name: cardInput.value, link: linkImgInput.value};
  
  renderItem(item);
  
  cardInput.value = "";
  linkImgInput.value = "";

  closePopupElement();
}

// Создание карточек

function getItemElement (item) {
  const element = templateElements.content.cloneNode(true).children[0];
  const textElement = element.querySelector('.element__title');
  const imageElement = element.querySelector('.element__image');
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

//Вешаем слушатели

function setEventListener (element) {
  element.querySelector('.element__trash').addEventListener('click', deleteHandler);
  element.querySelector('.element__icon').addEventListener('click', turnLikeButton);
  element.querySelector('.element__image').addEventListener('click', openPopupImage);
}

//Слушатели

popupProfileOpenButton.addEventListener('click', openPopupEditProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupProfile.addEventListener('click', closePopupOverlay);
containerEditElement.addEventListener('submit', submitFormProfileHandler);

popupElementOpenButton.addEventListener('click', openPopupAddElement);
popupElementCloseButton.addEventListener('click', closePopupElement);
popupElement.addEventListener('click', closePopupOverlay);
containerAddElement.addEventListener('submit', submitFormElementHandler);

popupImageCloseButton.addEventListener('click', closePopupImage);
popupImage.addEventListener('click', closePopupOverlay);