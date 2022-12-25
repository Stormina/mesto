export default class Userinfo {
  constructor({nameElement, descElement}) {
    this._nameElement = nameElement;
    this._descElement = descElement;
  }

  getUserInfo() {
    return {
      nameInput: this._nameElement.textContent, 
      jobInput: this._descElement.textContent
    }
  }

  setUserInfo({nameInput, jobInput}) {
    this._nameElement.textContent = nameInput;
    this._descElement.textContent = jobInput;
  }
}