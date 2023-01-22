import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      
    });
  }

  open() {
    super.open(element);
    this._element = element;
  }
}