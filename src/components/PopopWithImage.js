import { Popup } from "./Popup.js";

// ОТКРЫТИЕ КАРТИНКИ ПОПАПА
export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupPhotoTitleElement = this._popup.querySelector('.popup-photo__title');
		this._popupViewElement = this._popup.querySelector('.popup-photo__image');;
	}

	// Перезаписываем родительский метод openPopup
	openPopup(popupPhotoTitleElement, popupViewElement) {
		super.openPopup();
		this._popupPhotoTitleElement.src = popupPhotoTitleElement;
		this._popupPhotoTitleElement.alt = popupViewElement;
		this._popupViewElement.textContent = popupViewElement;
	}
}
