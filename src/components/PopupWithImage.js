import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardPopupImage = this._popup.querySelector('.popup__image');
    this._cardPopupImageCaption = this._popup.querySelector('.popup__caption');
  }

  open(title, image) {
    this._cardPopupImage.alt = title;
    this._cardPopupImageCaption.textContent = title;
    this._cardPopupImage.src = image;
    super.open();
  }
}