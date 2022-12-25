import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/Userinfo.js";
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
  elementPopupAdd,
  elementPopupForm,
  cardTemplateContainer
} from "../scripts/constants.js";
import './index.css';

// Функция открытия режима просмотра картинки
function handleCardClick(title, image) {
  popupImage.open(title, image);
}

// Константы активации классов
const popupImage = new PopupWithImage(cardPopupContainerImage);

const userinfo = new UserInfo({
  nameElement: profileTitleName,
  descElement: profileSubtitleJob
});

const cardList = new Section ({
  items: initialCards, 
  renderer: renderItem
  }, cardTemplateContainer
);

const profilePopupEditSelector= new PopupWithForm(profilePopupEdit, (item) => {
  userinfo.setUserInfo(item);
  profilePopupEditSelector.close();
});

const newCardRender = new PopupWithForm(elementPopupAdd, (item) => {
  cardList.addItem(renderItem(item));
  newCardRender.close();
  formAddValidator.setButtonStateInactive();
});

// Открытие попапов
profilePopupEditOpenButton.addEventListener('click', () => {
  ({
    nameInput: profileInputName.value,
    jobInput: profileInputJob.value
  } = userinfo.getUserInfo());
  formEditValidator.hideInputErrorPopupForms();
  profilePopupEditSelector.open();
});

elementPopupAddOpenButton.addEventListener('click', () => {
  newCardRender.open();
});

// Валидация форм
const formAddValidator = new FormValidator(elementPopupForm, selectors);
const formEditValidator = new FormValidator(profilePopupForm, selectors);

formAddValidator.enableValidation();
formEditValidator.enableValidation();

// Вешаем слушатели
popupImage.setEventListeners();
newCardRender.setEventListeners();
profilePopupEditSelector.setEventListeners();

// Создание разметки карточки
function renderItem (item) {
  const card = new Card(item.name, item.link, '.template-element_type_default', handleCardClick);
  return card.generateCard();
}

// Генерация всех карточек из массива
cardList.renderItems();