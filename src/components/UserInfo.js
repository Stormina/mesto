export default class Userinfo {
  constructor({nameElement, descElement}) {
    this._nameElement = nameElement;
    this._descElement = descElement;
    this._avatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent, 
      about: this._descElement.textContent,
      avatar: this._avatar,
      id: this._userId
    }
  }

  setUserInfo({data}) {
    this._nameElement.textContent = data.name;
    this._descElement.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data.id;
  }

  getUserId() {
    return this._id;
  }

  getUserAvatar() {
    return this._avatar.src;
  }
}