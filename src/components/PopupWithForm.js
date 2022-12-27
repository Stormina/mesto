import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
    this._formValues[input.name] = input.value;
  });

  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
