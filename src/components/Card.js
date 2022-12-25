export default class Card {
  constructor(title, image, templateSelector, handleCardClick) {
      this._title = title;
      this._image = image;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
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

  // Лайк
  _turnLikeButton() {
    this._elementIcon.classList.toggle('element__icon_active');
  }

  // Удалить карточку
  _deleteHandler() {
    this._element.remove();
    this._element = null;
  }

  // Вешаем слушатели
  _setEventListeners() {
    this._elementIcon.addEventListener('click', () => this._turnLikeButton());
    this._elementTrash.addEventListener('click', () => this._deleteHandler());
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));
  }

  // Генерация карточки
  generateCard() {
    this._element = this._getTemplate();

    this._elementIcon = this._element.querySelector('.element__icon');
    this._elementTrash = this._element.querySelector('.element__trash');
    this._elementImage = this._element.querySelector('.element__image');
    
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    
    this._setEventListeners();

    return this._element;
  }
}