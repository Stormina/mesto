import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardPopupImage = this._popup.querySelector('.popup__image');
    this._cardPopupImageCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this._cardPopupImage.alt = name;
    this._cardPopupImageCaption.textContent = name;
    this._cardPopupImage.src = link;
    super.open();
  }
}