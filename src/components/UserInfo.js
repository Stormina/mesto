export default class UserInfo {
  constructor({nameElement, descElement, avatarElement}) {
    this._nameElement = nameElement;
    this._descElement = descElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent, 
      about: this._descElement.textContent,
    }
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descElement.textContent = data.about;
    this.setUserAvatar(data);
    this._avatarElement.alt = `аватар профиля ${data.name}`;
  }

  setUserAvatar(data) {
   this._avatarElement.src = data.avatar;
  }
}