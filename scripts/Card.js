import { openModalWindowImage } from "./index.js"

export default class Card {
  constructor(title, image) {
      this._title = title;
      this._image = image;
      this._openModalWindowImage = openModalWindowImage;
  }

  // Клонируем блок карточки
  _getTemplate() {
      const cardElement = document
      .querySelector('.template-element')
      .content
      .cloneNode(true)
      .children[0];
      
      return cardElement;
  }

  // Лайк
  _turnLikeButton(elementIcon) {
    elementIcon.classList.toggle('element__icon_active');
  }

  // Удалить карточку
  _deleteHandler() {
    this._element.remove();
    this._element = null;
  }

  // Вешаем слушатели
  _setEventListeners(elementIcon, elementTrash, elementImage) {
    elementIcon.addEventListener('click', () => {this._turnLikeButton(elementIcon)});
    elementTrash.addEventListener('click', () => {this._deleteHandler(this._element)});
    elementImage.addEventListener('click', () => {this._openModalWindowImage(elementImage)});
  }

  // Генерация карточки
  _generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    
    const elementIcon = this._element.querySelector('.element__icon');
    const elementTrash = this._element.querySelector('.element__trash');
    const elementImage = this._element.querySelector('.element__image');
    this._setEventListeners(elementIcon, elementTrash, elementImage);

    return this._element;
  }

  // Вывод карточки на страницу
  renderItem() {
    const cardElement = this._generateCard();
    document.querySelector('.elements').prepend(cardElement);
  }
}