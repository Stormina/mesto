import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";
import {
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
  elementPopupCardDelete,
  avatarFormEdit,
  profileAvatar,
  submitDeleteFormButton
} from "../scripts/constants.js";
import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: 'ad4ff191-271f-4027-99f8-62ce89a12b83',
    'Content-Type': 'application/json'
  },
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    userId = info._id;
    userInfo.setUserInfo(info);
    userInfo.setUserAvatar(info);

    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  })

  // Профиль пользователя
  const userInfo = new UserInfo({
    nameElement: profileTitleName, 
    descElement: profileSubtitleJob,
    avatarElement: profileAvatar
  });
  
  // Отрисовка контента
  const cardList = new Section ({
    items: [],
    renderer: (items) => {
      cardList.addItem(renderItem(items));
    }}, cardTemplateContainer
  );

// Попап редактирования профиля  
const profilePopupEditSelector = new PopupWithForm(profilePopupEdit, {
  handleFormSubmit: (data) => {
    profilePopupEditSelector.renderLoading(true);
    api.patchUserProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      profilePopupEditSelector.close();
    })
    .catch((err) => console.log(err))
    .finally(() => profilePopupEditSelector.renderLoading(false));
  }
});

// Попап редактирования аватара
const avatarPopupSelector = new PopupWithForm(avatarPopupEdit, {
  handleFormSubmit: (data) => {
    avatarPopupSelector.renderLoading(true);
    api.patchUserAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      avatarPopupSelector.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopupSelector.renderLoading(false));
  }
});

// Попап добавления новой карточки
const newCardRender = new PopupWithForm(elementPopupAdd, { 
  handleFormSubmit: (data) => {
    newCardRender.renderLoading(true);
    api.postNewCard(data)
    .then((data) => {
      cardList.addItem(renderItem(data));
      newCardRender.close();
    })
    .catch((err) => console.log(err))
    .finally(() => newCardRender.renderLoading(false));
  }
});

// Попап удаления карточки
const cardDeletePopup = new PopupWithSubmit(elementPopupCardDelete, {
  handleFormSubmit: (data) => {
    api.deleteUserCard(data)
    .then(() => {
      cardDeletePopup.close();
    })
    .catch((err) => console.log(err))
  }
});

// Попап режима просмотра картинки
const popupImage = new PopupWithImage(cardPopupContainerImage);

// Открытие попапов
profilePopupEditOpenButton.addEventListener('click', () => {
  ({
    name: profileInputName.value,
    about: profileInputJob.value
  } = userInfo.getUserInfo());
  formEditValidator.hideInputErrorPopupForms();
  formEditValidator.setButtonStateInactive();
  profilePopupEditSelector.open();
});

elementPopupAddOpenButton.addEventListener('click', () => {
  formAddValidator.hideInputErrorPopupForms();
  formAddValidator.setButtonStateInactive();
  newCardRender.open();
});

avatarPopupOpenButton.addEventListener('click', () => {
  formAvatarValidator.hideInputErrorPopupForms();
  formAvatarValidator.setButtonStateInactive();
  avatarPopupSelector.open();
});

// Вешаем слушатели
popupImage.setEventListeners();
newCardRender.setEventListeners();
profilePopupEditSelector.setEventListeners();
avatarPopupSelector.setEventListeners();
cardDeletePopup.setEventListeners();

// Создание карточки
function renderItem (itemData) {
  const card = new Card({itemData, userId,
    handleCardClick: () => {
      popupImage.open(itemData.name, itemData.link);
    },
    handleCardDelete: () => {
      cardDeletePopup.open();
      cardDeletePopup.handleSubmitDelete(() => {
        submitDeleteFormButton.textContent = 'Удаление..';
        api.deleteUserCard(card._id)
        .then(() => {
          card.deleteHandler();
          cardDeletePopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => submitDeleteFormButton.textContent = 'Да')
      })
    },
    handleCardLike: () => {
      if (card.isLiked()) {
        api.deleteLikesCard(card._id)
        .then((data) => {
          card.turnUnlikeButton()
          card.likeCounter(data.likes);
        })
        .catch((err) => console.log(err));
      } else {
        api.putLikesCard(card._id)
        .then((data) => {
          card.turnLikeButton();
          card.likeCounter(data.likes);
        })
        .catch((err) => console.log(err));
      }
    }
    },
    templateCardDefault
    );
  return card.generateCard();
}

// Валидация форм
const formAddValidator = new FormValidator(elementPopupForm, selectors);
const formEditValidator = new FormValidator(profilePopupForm, selectors);
const formAvatarValidator = new FormValidator(avatarFormEdit, selectors); 

formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();