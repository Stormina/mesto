import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/Userinfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
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
  avatarPopupEdit,
  avatarPopupOpenButton,
  cardPopupContainerImage,
  elementPopupAdd,
  elementPopupForm,
  cardTemplateContainer,
  templateCardDefault,
  elementPopupCardDelete
} from "../scripts/constants.js";
import './index.css';

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

const profilePopupEditSelector= new PopupWithForm(profilePopupEdit, 
  function submitProfileEditPopup(data) {
    api.patchUserProfile(data)
    .then((res) => {
      userinfo.setUserInfo({
        name: res.name,
        about: res.about,
        id: res._id,
        avatar: res.avatar
      });
    })
    .then(() => profilePopupEditSelector.close())
    .catch((err) => `${err.status}`)
});

const newCardRender = new PopupWithForm(elementPopupAdd, (item) => {
  cardList.addItem(renderItem(item));
  newCardRender.close();
  formAddValidator.setButtonStateInactive();
});

api.getUserInfo()
  .then((res) => {
    userinfo.setUserInfo({
      name: res.name,
      about: res.about,
      id: res._id,
      avatar: res.avatar
    });
  })
  .then(() => getCardFromServer())
  .catch((err) => `${err.status}`);


const avatarPopupSelector = new PopupWithForm(avatarPopupEdit,
  function submitAvatarPopup(data) {
    api.patchUserAvatar(data)
    .then((res) => {
      userinfo.setUserInfo({
        name: res.name,
        about: res.about,
        id: res._id,
        avatar: res.avatar
      });
    })
    .then(() => avatarPopupSelector.close())
    .catch((err) => `${err.status}`)
});

const cardDeletePopup = new PopupWithSubmit(elementPopupCardDelete,
  function submitCardDeletePopup (card) {
    api.deleteUserCard(card.id)
    .then(() => card.deleteHandler())
    .then(() => cardDeletePopup.close())
    .catch((err) => `${err.status}`)
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

avatarPopupOpenButton.addEventListener('click', () => {
  avatarPopupSelector.open();
});

// Валидация форм
const formAddValidator = new FormValidator(elementPopupForm, selectors);
const formEditValidator = new FormValidator(profilePopupForm, selectors);
/* const formAvatarValidator = new FormValidator(avatarPopupEdit, selectors); */

formAddValidator.enableValidation();
formEditValidator.enableValidation();
/* formAvatarValidator.enableValidation(); */

// Вешаем слушатели
popupImage.setEventListeners();
newCardRender.setEventListeners();
profilePopupEditSelector.setEventListeners();
avatarPopupSelector.setEventListeners();

// Создание разметки карточки
function renderItem (item) {
  const card = new Card(item.name, item.link, templateCardDefault,
    function handleCardClick(title, image) {
      popupImage.open(title, image);
    },
    function handleCardDelete(card) {
      cardDeletePopup.open(card)
    },
    function handleCardLike(likes) {
      putLikesCard(likes);
    },
    userinfo.getUserInfo()
    );
  return card.generateCard();
}

// Генерация всех карточек из массива
cardList.renderItems();

// Загрузка карточек с сервера
const getCardFromServer = () => {
  api.getInitialCards()
  .then((data) => {
    const cardData = data.map((item) => {
      return {
        name: item.name,
        link: item.link,
        likes: item.likes,
        _id: item._id,
        owner: item.owner._id,
      }
    });
    cardList.renderItems(cardData);
  })
  .catch((err) => `${err.status}`);

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: 'ad4ff191-271f-4027-99f8-62ce89a12b83',
    'Content-Type': 'application/json'
  }
});