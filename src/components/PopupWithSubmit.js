import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
    
      this._handleFormSubmit();
    });
  }

  close() {
    super.close();
    this._popup.removeEventListener('submit', (event) => {
      event.preventDefault();
    
      this._handleFormSubmit();
    });
  }

  handleSubmitDelete(data) {
    this._handleFormSubmit = data;
  }
}