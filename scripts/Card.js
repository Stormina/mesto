export default class Card {
  constructor(title, image) {
      this._title = title;
      this._image = image;
  }

  _getTemplate() {
      const cardElement = document
      .querySelector('.template-element')
      .content
      .cloneNode(true)
      .children[0];
      
      return cardElement;
  }

  _turnLikeButton(elementIcon) {
    elementIcon.classList.toggle('element__icon_active');
  }

  _deleteHandler() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(elementIcon, elementTrash) {
    elementIcon.addEventListener('click', () => {this._turnLikeButton(elementIcon)});
    elementTrash.addEventListener('click', () => {this._deleteHandler(this._element)});
    
    //this._element.querySelector('.element__image').addEventListener('click', () => {
     // this._editCardPopupImageInfo();
    //openModalWindow(cardPopupContainerImage);
 // });
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    const elementIcon = this._element.querySelector('.element__icon');
    const elementTrash = this._element.querySelector('.element__trash');
    this._setEventListeners(elementIcon, elementTrash);

    return this._element;
  }
}