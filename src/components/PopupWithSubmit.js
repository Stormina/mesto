import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setEvent = this._setEvent.bind(this);
  }

  _setEvent(event) {
    event.preventDefault();

    this._handleFormSubmit();
  }

  open() {
    this._popup.addEventListener('submit', this._setEvent);
    super.open();
  }

  close() {
    this._popup.removeEventListener('submit', this._setEvent);
    super.close();
  }

  handleSubmitDelete(data) {
    this._handleFormSubmit = data;
  }
}