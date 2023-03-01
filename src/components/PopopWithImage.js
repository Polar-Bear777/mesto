import { Popup } from "./Popup.js";

// ОТКРЫТИЕ КАРТИНКИ ПОПАПА
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoTitleElement = this._popup.querySelector(".popup-photo__title");
    this._popupViewElement = this._popup.querySelector(".popup-photo__image");
  }

  // Перезаписываем родительский метод openPopup
  openPopup(title, link) {
    this._popupViewElement.src = link;
    this._popupViewElement.alt = title;
    this._popupPhotoTitleElement.textContent = title;
    super.openPopup();
  }
}
