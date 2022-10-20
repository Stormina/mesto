// Кнопки открыть и закрыть попап

const popupProfile = document.querySelector('.popup');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');

const openPopup = function() {
  popupProfile.classList.add('popup_opened');
}

const closePopup = function() {
  popupProfile.classList.remove('popup_opened');
}

const closePopupOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopup();
}

popupProfileOpenButton.addEventListener('click', openPopup);
popupProfileCloseButton.addEventListener('click', closePopup);
popupProfile.addEventListener('click', closePopupOverlay);

// Кнопка редактировать профиль

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');

const profileElement = document.querySelector('.profile');
let nameProfile = profileElement.querySelector('.profile__title');
let jobProfile = profileElement.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
  evt.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);