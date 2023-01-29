export default class Card {
  constructor({
    itemData,
    userId,
    handleCardClick,
    handleCardDelete,
    handleCardLike
  }, templateSelector
  ) {
      this._name = itemData.name;
      this._link = itemData.link;
      this._likes = itemData.likes;
      this._id = itemData._id;
      this._ownerId = itemData.owner._id;
      this._userId = userId;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this.handleCardDelete = handleCardDelete;
      this._handleCardLike = handleCardLike;
      
      this._element = this._getTemplate();
      this._elementIcon = this._element.querySelector('.element__icon');
      this._elementTrash = this._element.querySelector('.element__trash');
      this._elementImage = this._element.querySelector('.element__image');
      this._likeCount = this._element.querySelector('.element__icon-caption');
    }

  // Клонируем блок карточки
  _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;
  }

  // Поставить лайк
  turnLikeButton() {
    this._elementIcon.classList.add('element__icon_active');
  }

  // Убрать лайк
  turnUnlikeButton() {
    this._elementIcon.classList.remove('element__icon_active');
  }

  _checkUserId() {
    if (this._ownerId === this._userId) {
      this._elementTrash.classList.remove('element__trash_unvisible');
    }
  }

  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  checkLikeOwner() {
    if (this.isLiked()) {
      this.turnLikeButton();
    } else {
      this.turnUnlikeButton();
    }
  }

  likeCounter(like) {
    this._likes = like;
    this._likeCount.textContent = this._likes.length;
  }

  // Удалить карточку
  deleteHandler() {
    this._element.remove();
    this._element = null;
  }

  // Вешаем слушатели
  _setEventListeners() {
    this._elementIcon.addEventListener('click', () => this._handleCardLike());
    this._elementTrash.addEventListener('click', () => this.handleCardDelete());
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  // Генерация карточки
  generateCard() {
    this._setEventListeners();
    this._checkUserId();
    this.checkLikeOwner();
    this.likeCounter(this._likes)

    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;

    return this._element;
  }
}